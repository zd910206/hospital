package com.SHILAB.web.security.filter;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.SHILAB.web.web.util.RequestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.SHILAB.web.web.util.Constants.HTTP_HEAD_REFERER;


/**
 * 验证HTTP Referer字段，请求地址中添加token并验证，防止CSRF(跨站点请求伪造)
 * 
 * @author ZD
 * 
 */
public class CSRFFilter implements Filter {
	protected final Logger LOG = LoggerFactory
			.getLogger(CSRFFilter.class);
	private static final String CSRF_ERROR_PAGE = "/error/csrf";
	public static final String CSRF_TOKEN = "csrftoken";

	public void init(FilterConfig filterConfig) throws ServletException {}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		/**请求地址中添加token并验证,但是html页面无法直接获取session,需要向服务器发送请求获取
		 于是在页面加载时向服务器发送ajax请求获取session,但是正是由于一些页面存在ajax请求或是
		 动态生成的a标签，于是在地址中添加token,导致很多的异步请求误认为是伪造的请求，因此会被
		 拦截**/
//		HttpSession session = req.getSession();
//		// 从 session 中得到 csrftoken 属性
//		String csrftoken = (String) session.getAttribute(CSRF_TOKEN);
//		//第一次访问
//		if (csrftoken == null) {
//			// 产生新的 token 放入 session 中
//			csrftoken = generateToken();
//			session.setAttribute(CSRF_TOKEN, csrftoken);
//		} else {
//			// 从 HTTP 头中取得 csrftoken
//			String xhrToken = req.getHeader(CSRF_TOKEN);
//			// 从请求参数中取得 csrftoken
//			String pToken = req.getParameter(CSRF_TOKEN);
//			if (csrftoken != null && xhrToken != null && csrftoken.equals(xhrToken)) {
//				chain.doFilter(request, response);
//			} else if (csrftoken != null && pToken != null
//					&& csrftoken.equals(pToken)) {
//				chain.doFilter(request, response);
//			} else {
////				request.getRequestDispatcher(CSRF_ERROR_PAGE).forward(request,
////						response);
//				res.sendRedirect(location);
//			}
//		}
		
		//head中的referer部分告诉服务器是从哪个页面链接过来
		String referer = req.getHeader(HTTP_HEAD_REFERER);
		//跳转的url
//		String forwardUrl = req.getParameter(FORWARD_RUL);
		// LOG.info("The referer of http === {}", new Object[] { referer });
		if (referer != null) {
			if (referer.trim().indexOf(RequestUtils.getContextPath(req)) != -1) {
				chain.doFilter(req, res);
			} else {
//				req.getRequestDispatcher(CSRF_ERROR_PAGE).forward(request,
//						response);
				res.sendRedirect(CSRF_ERROR_PAGE);
			}
		} else {
			chain.doFilter(req, res);
		}
	}

//	private String generateToken() {
//		return UUID.randomUUID().toString().replaceAll("-", "");
//	}

	public void destroy() {}

}
