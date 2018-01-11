package com.SHILAB.web.service;


import com.SHILAB.web.security.exception.ModifyException;
import com.SHILAB.web.security.exception.NameExistException;
import com.SHILAB.web.security.exception.AddException;
import com.SHILAB.web.security.exception.DeleteException;

import java.util.List;

/**
 * 基础服务接口
 * @author ZD
 *
 * @param <T>
 */
public interface BaseMngService<T> {
	/** 获取列表**/
	List<T> list(Integer page, Integer rows);
	
	/** 获取记录条数**/
	int getTotalRows();
	
	/**增加**/
	void add(T t) throws AddException,NameExistException;
	
	/**修改**/
	void modify(T t) throws ModifyException;
	
	/**删除**/
	void delete(List<Object> objs) throws DeleteException;
}
