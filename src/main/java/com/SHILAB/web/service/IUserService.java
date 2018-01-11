package com.SHILAB.web.service;


import com.SHILAB.web.model.User;
import com.SHILAB.web.security.exception.BadCredentialsException;
import com.SHILAB.web.security.exception.ModifyException;

import java.util.List;
import java.util.Map;

/**
 * 用户操作管理服务接口
 * @author ZD
 *
 */
public interface IUserService extends BaseMngService<User> {

	List<User> getUserList();

	void updataLoginTime(User user);

	void modifyPwd(String userId, String oldPwd, String newPwd)
			throws ModifyException, BadCredentialsException;

	User getUserByUserId(Integer userId);

	List<User> getUserByField(Map<String, Object> params);

	List<User> getUserNotAdmin(Map<String, Object> params);

	List<User> getUserList(Integer offset, Integer limit,
								String userName, Integer userType);
}
