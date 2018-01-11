package com.SHILAB.web.web.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;

/**
 * Session提供者
 * 
 */
public interface SessionProvider {
	/**
	 * 根据名称获取属性值
	 * @param request
	 * @param name 属性名称
	 * @return 对应的值
	 */
	public Serializable getAttribute(HttpServletRequest request, String name);

	/**
	 * 设置属性的值
	 * @param request
	 * @param response
	 * @param name 属性名称
	 * @param value 属性值
	 */
	public void setAttribute(HttpServletRequest request,
                             HttpServletResponse response, String name, Serializable value);

	/**
	 * 获取session id
	 * @param request
	 * @param response
	 * @return
	 */
	public String getSessionId(HttpServletRequest request,
                               HttpServletResponse response);

	/**
	 * 使session失效
	 * @param request
	 * @param response
	 */
	public void invalidate(HttpServletRequest request, HttpServletResponse response);
}
