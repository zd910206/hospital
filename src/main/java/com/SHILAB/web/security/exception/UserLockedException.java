package com.SHILAB.web.security.exception;

/**
 *    <p>Project:  etl-web</p>
 *
 *    <p>Description:用户已经被锁定异常</p>
 *
 *    <p>Copyright: Copyright (c) 2016 create at 2016年12月8日</p>
 *
 *    <p>Company: TALKWEB.TALKDATA</p>
 *
 *    @author ZD
 *    @version 1.0
 */

public class UserLockedException extends AuthenticationException {

	public UserLockedException(String msg) {
		super(msg);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
