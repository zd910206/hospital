package com.SHILAB.web.base.util;


import com.SHILAB.web.model.User;

import static com.SHILAB.web.web.util.Constants.*;

/**
 * 权限管理
 *
 */
public class PrivilegeUtils {
	/**
	 * 判断登录用户是否为管理员
	 * @param u 用户对象
	 * @return 是管理员返回true,否则返回false
	 */
	public static boolean isAdmin(User u){
		return ADMIN.equals(u.getUserType().toString());
	}
	
	public static Integer getDigitalRights(String opType){
		Integer digitalRights = Integer.valueOf(opType);
		//流程的权限，X>W>R，如果拥有X权限，
		//那么自动拥有W、R权限，如果拥有W权限
		//自动拥有R权限，依次类推
		if(digitalRights <= 0 ){
			digitalRights = 0;
		}else if(digitalRights == 1){
			digitalRights = R;
		}else if(digitalRights >= 2 && digitalRights < 4){
			digitalRights = R + W;
		}else if(digitalRights >= 4){
			digitalRights = R + W + X;
		}
		return digitalRights;
	}

	
}
