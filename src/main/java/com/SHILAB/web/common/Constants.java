package com.SHILAB.web.common;

import java.io.File;

import org.springframework.context.ApplicationContext;

public interface Constants {
    /**
     * 操作名称
     */
    String OP_NAME = "op";
    /**
     * 错误key
     */
    String ERROR = "error";

    /**
     * 上个页面地址
     */
    String BACK_URL = "BackURL";

    String IGNORE_BACK_URL = "ignoreBackURL";

    /**
     * 当前请求的地址 带参数
     */
    String CURRENT_URL = "currentURL";

    /**
     * 当前请求的地址 不带参数
     */
    String NO_QUERYSTRING_CURRENT_URL = "noQueryStringCurrentURL";

    String CONTEXT_PATH = "ctx";

    /**
     * 当前登录的用户
     */
    String CURRENT_USER = "user";
    String CURRENT_USERNAME = "username";

    String ENCODING = "UTF-8";
    public static final String SESSION_SECURITY_CODE = "sessionSecCode";
	public static final String SESSION_USER = "sessionUser";
	public static final String SESSION_USER_RIGHTS = "sessionUserRights";
	public static final String SESSION_ROLE_RIGHTS = "sessionRoleRights";
	public static final String MENU_LIST = "menuList";
	public static final String NO_INTERCEPTOR_PATH = ".*/((login)|(logout)).*";	//不对匹配该值的访问路径拦截（正则）
	public static ApplicationContext WEB_APP_CONTEXT = null; //该值会在web容器启动时由WebAppContextListener初始化
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
	
	public static final String OPC_REST_URL_KEY="OPC_CLIENT_RESTFUL_URL";

	public static final Integer R = 1;
	public static final Integer W = 2;
	public static final Integer X = 4;

	public static final String ADMIN = "1";
	
}
