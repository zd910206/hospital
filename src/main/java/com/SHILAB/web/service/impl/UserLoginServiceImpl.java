package com.SHILAB.web.service.impl;

import com.SHILAB.web.mapper.UserMapper;
import com.SHILAB.web.model.User;
import com.SHILAB.web.model.UserStatus;
import com.SHILAB.web.security.PwdEncoder;
import com.SHILAB.web.security.exception.BadCredentialsException;
import com.SHILAB.web.security.exception.UserLockedException;
import com.SHILAB.web.security.exception.UsernameNotFoundException;
import com.SHILAB.web.service.IUserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户登录服务接口实现
 *
 */
@Transactional
@Service
public class UserLoginServiceImpl implements IUserLoginService {

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PwdEncoder pwdEncoder;

	/**
	 *  登陆
	 * @param userName 用户名
	 * @param rawPass  输入的密码
	 * @param useMd5Encode  是否MD5加密
	 * @return
	 * @throws UsernameNotFoundException
	 * @throws BadCredentialsException  密码不正确异常
	 * @throws UserLockedException  账户锁定异常
	 */
	@Override
	public User login(String userName, String rawPass, boolean useMd5Encode)
			throws UsernameNotFoundException, BadCredentialsException, UserLockedException {
		User u = findByUserName(userName);
		// 用户名找不到
		if (u == null) {
			throw new UsernameNotFoundException("用户名不存在！");
		}
		
		if(u.getStatus() != null && u.getStatus().equals(UserStatus.LOCKED.toString())){
			throw new UserLockedException("用户已经被锁定");
		}
		
		//用户名存在，则校验密码
		String encPass = u.getPassword();
		if(useMd5Encode){         //  如果加密
			if(!pwdEncoder.isPasswordValid(encPass, rawPass)){
				throw new BadCredentialsException("密码不正确！");
			}
		}else{
			if(!rawPass.equals(encPass)){
				throw new BadCredentialsException("密码不正确！");
			}
		}
		
		return u;
	}

	@Override
	public User findByUserName(String userName) {
		return userMapper.queryByUserName(userName);
	}

	@Override
	public int setUserStatus(String userName, String status) {
		return userMapper.setUserStatus(userName, status);
	}

}
