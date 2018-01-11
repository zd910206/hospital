package com.SHILAB.web.security.exception;

/**
 * 用户名已存在异常
 * 
 * @author ZD
 * 
 */
@SuppressWarnings("serial")
public class NameExistException extends AuthenticationException {
	public NameExistException() {
	}

	public NameExistException(String msg) {
		super(msg);
	}
}