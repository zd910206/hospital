package com.SHILAB.web.mapper;

import com.SHILAB.web.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 用户登录数据访问映射接口
 * @author ZD
 *
 */
public interface UserMapper {
	User queryByUserName(String userName);
	
	List<User> queryUserList(Map<String, Object> params);
	
	int queryUserRows();
	
	void saveUser(User u);
	
	void deleteUser(List<Object> ids);
	
	void updateUser(User u);
	
	void saveLoginTime(User u);
	
	List<User> queryByField(Map<String, Object> params);

	User queryByUserId(@Param("userId") Integer userId);

	List<User> queryUserNotAdmin(Map<String, Object> params);

	int setUserStatus(@Param("userName") String userName, @Param("status") String status);
}
