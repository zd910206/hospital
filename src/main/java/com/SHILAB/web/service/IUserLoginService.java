package com.SHILAB.web.service;


import com.SHILAB.web.security.exception.UsernameNotFoundException;
import com.SHILAB.web.model.User;
import com.SHILAB.web.security.exception.BadCredentialsException;
import com.SHILAB.web.security.exception.UserLockedException;

/**
 * 用户登录服务接口
 * 
 * @author ZD
 * 
 */
public interface IUserLoginService {
	/**
	 * 用户登录验证
	 * @param userName 用户名
	 * @param password 密码
	 * @throws UsernameNotFoundException 用户名找不到异常
	 * @throws BadCredentialsException 认证异常
	 */
	User login(String userName, String password, boolean useMd5Encode)
			throws UsernameNotFoundException, BadCredentialsException, UserLockedException;
	
	User findByUserName(String userName);

	int setUserStatus(String userName, String status);
}
