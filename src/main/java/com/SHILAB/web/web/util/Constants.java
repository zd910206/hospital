package com.SHILAB.web.web.util;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 
 */
public abstract class Constants {
	/**
	 * 路径分隔符
	 */
	public static final String SPT = File.separator;
	/**
	 * 首页
	 */
	public static final String INDEX = "index";
	/**
	 * 默认模板
	 */
	public static final String DEFAULT = "default";
	/**
	 * UTF-8编码
	 */
	public static final String UTF8 = "UTF-8";
	/**
	 * 提示信息
	 */
	public static final String MESSAGE = "message";
	/**
	 * 提示信息
	 */
	public static final String MSG = "msg";
	/**
	 * cookie中的JSESSIONID名称
	 */
	public static final String JSESSION_COOKIE = "JSESSIONID";
	/**
	 * url中的jsessionid名称
	 */
	public static final String JSESSION_URL = "jsessionid";
	/**
	 * HTTP POST请求
	 */
	public static final String POST = "POST";
	/**
	 * HTTP GET请求
	 */
	public static final String GET = "GET";
	
	/**
	 * 用户登录成功后，使用该属性作为key值存储到session
	 */
	public static final String USER_KEY = "user";
	
	/**
	 * 返回结果
	 */
	public static final String RESULT = "result";
	
	/**登录相关**/
	public static final String LOGIN_RUL = "/user/login";
	public static final String LOGOUT_RUL = "/user/logout";
	public static final String INDEX_RUL = "/index";
	public static final String FORWARD_RUL = "forwardUrl";
	public static final String LOGIN_PAGE_PREFIX = "login";
	public static final String HTTP_HEAD_REFERER = "referer";
	
	
	/**
	 * 当前页
	 */
	public static final String PAGE = "page";
	/**
	 * 每页条数
	 */
	public static final String ROWS = "rows";
	
	/**
	 * 默认每页显示条数
	 */
	public static final Integer PAGESIZE = 20;
	
	/**
	 * 总记录数
	 */
	public static final String TOTAL = "total";
	/**
	 * 分页查询开始行
	 */
	public static final String START_ROW = "start";

	public static final String DATA = "data";

	/**
	 * 参数属性
	 */
	public static final String CONFIG_ADD_SUCCEED = "新增CONFIG属性参数成功！";

	/**用户管理操作**/
	public static final String USER_ADD_SUCCEED = "新增用户成功！";
	public static final String USER_ADD_FAILED = "新增用户失败！";
	public static final String USER_MODIFY_SUCCEED = "修改用户成功！";
	public static final String USER_MODIFY_FAILED = "修改用户失败！";
	public static final String USER_DELETE_SUCCEED = "删除用户成功！";
	public static final String USER_DELETE_FAILED = "删除用户失败！";

	/**顶部菜单分组**/
	public final static String MENU_INDEX = "首页";
	public final static String MENU_SYSTEM = "系统设置";
	public final static String MENU_HELP = "帮助";
	
	
	public static final Integer R = 1;
	public static final Integer W = 2;
	public static final Integer X = 4;
	
	public static final String ADMIN = "1";
	
	/**
	 * 保存流程
	 * */
	public final static String IS_SAVE ="1";
	
	/**
	 * 没保存流程
	 * */
	public final static String NOT_SAVE ="0";
	
	/**
	 * 转义字符
	 * */
	public final static List<String> ESCAPE_CHARACTERS = new ArrayList<String>(
			Arrays.asList(new String[] { "$", "(", ")", "*", "+", ".", "[",
					"?", "\\", "^", "{", "|" }));
	
	/**
	 * 默认地址
	 */
	public static String HOST_NAME = "";
	
}
