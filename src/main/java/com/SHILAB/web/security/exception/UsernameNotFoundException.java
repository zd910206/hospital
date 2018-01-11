package com.SHILAB.web.security.exception;

/**
 * 用户名没有找到异常
 * 
 * @author ZD
 * 
 */
@SuppressWarnings("serial")
public class UsernameNotFoundException extends AuthenticationException {
	public UsernameNotFoundException() {
	}

	public UsernameNotFoundException(String msg) {
		super(msg);
	}
}