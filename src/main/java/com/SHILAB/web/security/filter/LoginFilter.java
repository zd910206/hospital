package com.SHILAB.web.security.filter;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.SHILAB.web.web.util.Constants;
import com.SHILAB.web.web.util.RequestUtils;
import com.SHILAB.web.model.User;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 登录过滤器<br>
 * <ul>
 * <li>1.请求为登录，切换用户，资源文件则不过滤</li>
 * <li>2.session已经失效，重新登录跳转到相应页面</li>
 * <li>3.没有登录，则跳转到登录页面</li>
 * </ul>
 * 
 * @author ZD
 * 
 */
public class LoginFilter implements Filter {
	private Logger LOG = LoggerFactory.getLogger(LoginFilter.class);
	private static String[] TYPES = null;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		String param = filterConfig.getInitParameter("ignoreTypes");
		TYPES = param.split(",");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String uri = req.getRequestURI();
		String ctxPath = req.getContextPath();
		//登录请求不过滤
		if (uri.endsWith(Constants.LOGIN_RUL) || uri.indexOf("/error/") != -1) {
			chain.doFilter(req, res);
		} else {
			// 资源文件不过滤
			for (String type : TYPES) {
				if (uri.endsWith(type)) {
					chain.doFilter(req, res);
					return;
				}
			}
			//获取session
			HttpSession session = req.getSession();
			User user = (User) session.getAttribute(Constants.USER_KEY);
			//session未过期
			if (user != null) {
				if (uri.equals(ctxPath + "/")) {
					res.sendRedirect(RequestUtils.getContextPath(req)
							+ Constants.INDEX_RUL);
					return;
				}
				chain.doFilter(req, res);
			} else {
				String queryString = req.getQueryString();
//				LOG.info("请先登录，URL为{}，queryString为{}", new Object[]{uri, queryString});
				// 否则,要求先登录
				
//				if (uri.equals(ctxPath + "/")) {
//					uri = INDEX_RUL;
//				}
//				//是否带有参数
//				uri += (queryString != null ? "?"
//						+ queryString : "");
//				uri = uri.replace(ctxPath, "");
//				//登录并通过forwardUrl参数将请求链接传递
//				res.sendRedirect(RequestUtils.getContextPath(req)
//						+ LOGIN_RUL + "?forwardUrl="
//						+ URLEncoder.encode(uri, "UTF-8"));
				
				/** 
				 * 当HTTP请求来自AJAX并且用户的Session已经超时时, 这时页面会没有任何反应, 因为向AJAX请求 
				 * 重定向或者输出一段JS实现跳转都是无法完成的. 因此这里实现当上述情况发生时, 向AJAX请求返 
				 * 回特定的标识(添加到响应对象中), 可以在定义AJAX请求完成回调方法时得到这个标识, 进而提示 
				 * 用户并完成JS跳转. 
				 */  
				String requestType = req.getHeader("X-Requested-With");//是否为ajax请求
				if (!StringUtils.isEmpty(requestType) && requestType.equalsIgnoreCase("XMLHttpRequest")) {  
				    res.setHeader("sessionstatus", "timeout");  
				    res.sendError(518, "session timeout.");//518为自定义状态码
				    return;  
				}  
//				      httpResponse.sendRedirect(httpRequest.getContextPath() + "/index.html");  
				/** 
				 * 由于Web端使用iframe嵌套, 因此直接重定向到登录页面并不能总是完成地很完美, 比如HTTP请求来自 
				 * iframe对象的时候, 只能让iframe加载到index.html, 体验不够好; 所以在这里将直接重定向改为向 
				 * 页面输出一段JS代码来实现使顶部window跳转到默认的登录页面. 
				 */  
				String jsCode = "<script type='text/javascript'>" +  
				        "var p=window;while(p!=p.parent){p=p.parent; } p.location.href='" +  
				        RequestUtils.getContextPath(req) +   Constants.LOGIN_RUL +
				        "'</script>";  
				PrintWriter writer = res.getWriter();  
				writer.print(jsCode);  
				writer.flush();  
				writer.close(); 
			}
		}
	}

	@Override
	public void destroy() {}

}
