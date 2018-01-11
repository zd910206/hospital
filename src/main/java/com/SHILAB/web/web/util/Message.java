package com.SHILAB.web.web.util;

/**
 * 前台响应信息常量
 *
 */
public interface Message {
	static final String USER_NAME_NOT_FOUND = "Username does not exist";
	static final String PASSWORD_INVALIDATE = "Wrong username or password";
	static final String CAPTCHA_INVALIDATE = "Verification code error";
	static final String USER_LOCKED = "User has been locked";
}
