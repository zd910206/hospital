package com.SHILAB.web.controller;

import com.SHILAB.web.base.util.CollectionUtils;
import com.SHILAB.web.model.User;
import com.SHILAB.web.model.UserStatus;
import com.SHILAB.web.security.exception.BadCredentialsException;
import com.SHILAB.web.security.exception.UserLockedException;
import com.SHILAB.web.security.exception.UsernameNotFoundException;
import com.SHILAB.web.service.IUserLoginService;
import com.SHILAB.web.service.IUserService;
import com.SHILAB.web.servlet.util.SampleImageCaptchaService;
import com.SHILAB.web.web.util.*;
import com.SHILAB.web.web.util.DateUtils;
import com.SHILAB.web.web.util.HttpSessionProvider;
import com.SHILAB.web.web.util.Message;
import com.SHILAB.web.web.util.RequestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

import static com.SHILAB.web.common.Constants.RESULT;
import static com.SHILAB.web.web.util.Constants.MESSAGE;


/**
 * 用户登录控制器
 * @author ZD
 *
 */
@Controller
@RequestMapping("/user")
public class UserLoginController {
	private Logger LOG = LoggerFactory.getLogger(UserLoginController.class);
	@Autowired
	private IUserLoginService userLoginService;
	@Autowired
	private IUserService userService;
	@Autowired
	private HttpSessionProvider session;
	@Autowired
	private SampleImageCaptchaService sampleImageCaptchaService;
	
	/**
	 * GET方式请求登录<br>
	 * <ul>
	 * 	<li>1.如果用户未登录，则跳转到登录页面</li>
	 * 	<li>2.如果用户已登录，则直接跳转到请求页面</li>
	 * </ul>
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(HttpServletRequest request, HttpServletResponse response){
		User user= (User) session.getAttribute(request, Constants.USER_KEY);
		String forwardUrl = getForwarUrl(request);
		if(user != null){
			try {
				response.sendRedirect(forwardUrl);
				
//				return "redirect:" + forwardUrl;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return Constants.LOGIN_PAGE_PREFIX;
	}
	
	@RequestMapping(value = "/reLogin")
	public @ResponseBody Map<String,Object> reLogin(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> resultMap = CollectionUtils.newHashMap();
		session.invalidate(request, response);
		resultMap.put(Constants.RESULT, true);
		return resultMap;
	}
	
	/**
	 * POST方式请求登录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody Map<String,Object> submit(
			HttpServletRequest request, HttpServletResponse response, HttpSession sess) {
		
		String userName = RequestUtils.getForm(request, "userName");
		String password = RequestUtils.getForm(request, "password");
		String captcha = RequestUtils.getForm(request, "captcha");
		
		Map<String,Object> resultMap = CollectionUtils.newHashMap();
				User user = null;
		String passwordErrorKey = "password_error";
		int leftCnt = request.getSession().getAttribute(passwordErrorKey) != null ? Integer.valueOf(request.getSession().getAttribute(passwordErrorKey).toString()) : 5;
		try {
			if(StringUtils.isEmpty(captcha)){
				resultMap.put(RESULT, false);
				resultMap.put(MESSAGE, "Verification code must be completed!");
				return resultMap;
			}

			if(!sampleImageCaptchaService.getImageService().validateResponseForID(sess.getId(), captcha.toLowerCase())){
				resultMap.put(RESULT, false);
				resultMap.put("captchaError", true);
				resultMap.put(MESSAGE, Message.CAPTCHA_INVALIDATE);
				return resultMap;
			}
			
			String loginTime = DateUtils.format(System.currentTimeMillis());
			user = userLoginService.login(userName, new String(password), false);
			user.setUserTypeName("1".equals(user.getUserType()) ? "administrator" : "general_user");
			user.setLastLoginTime(loginTime);
			userService.updataLoginTime(user);
			//如果没有抛出异常，则登录成功
			LOG.info(
					"user{}login success，login time is{}，IP is{}",
					new Object[] { userName, loginTime, RequestUtils.getIpAddr(request) });
			//保存到session
			session.setAttribute(request, response, Constants.USER_KEY, user);
			
			resultMap.put(Constants.RESULT, true);
			resultMap.put(Constants.FORWARD_RUL, getForwarUrl(request));
			
			request.getSession().removeAttribute(passwordErrorKey);
		} catch (UsernameNotFoundException e) {
			resultMap.put(Constants.RESULT, false);
			resultMap.put(MESSAGE, Message.USER_NAME_NOT_FOUND);
		} catch (BadCredentialsException e) {
			if(leftCnt <= 1){
				userLoginService.setUserStatus(userName, UserStatus.LOCKED.toString());
			}
			request.getSession().setAttribute(passwordErrorKey, leftCnt-1);
			resultMap.put(Constants.RESULT, false);
			resultMap.put(MESSAGE, Message.PASSWORD_INVALIDATE+" 还有"+leftCnt+"次机会");
		} catch (UserLockedException e) {
			resultMap.put(Constants.RESULT, false);
			resultMap.put(MESSAGE, Message.USER_LOCKED);
		}
		//移除captcha
		sampleImageCaptchaService.getImageService().removeCaptcha(sess.getId());
		return resultMap;
	}
	
	/**
	 * 切换用户登录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/switch")
	public @ResponseBody Map<String, Object> switchUser(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> resultMap = CollectionUtils.newHashMap();
		String forwardUrl = getForwarUrl(request);
		try {
			session.invalidate(request, response);
			resultMap.put(Constants.RESULT, true);
			resultMap.put(Constants.FORWARD_RUL, forwardUrl);
		} catch (Exception e) {
			resultMap.put(Constants.RESULT, false);
			resultMap.put(MESSAGE, "切换用户失败！");
		}
		return resultMap;
	}
	
	/**
	 * 退出
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/logout")
	public @ResponseBody Map<String, Object> logout(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> resultMap = CollectionUtils.newHashMap();
		try {
			session.invalidate(request, response);
			resultMap.put(Constants.RESULT, true);
		} catch (Exception e) {
			resultMap.put(Constants.RESULT, false);
			resultMap.put(MESSAGE, "退出成功！");
		}
		return resultMap;
	}
	
	/**
	 * 获取跳转url
	 * @param request
	 * @return
	 */
	private String getForwarUrl(HttpServletRequest request){
		/**如果浏览器停留在某个页面，这时如果session过期，则登录后跳转到原来的页面**/
		String forwardUrl = request.getParameter(Constants.FORWARD_RUL);
		if(forwardUrl == null || "".equals(forwardUrl)){
			//如果没有返回的url,则登录后跳转到首页
			forwardUrl = Constants.INDEX_RUL;
		}
		return forwardUrl;
	}
	
}
