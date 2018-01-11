package com.SHILAB.web.base.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 */
public class DataBaseUtil {
	private static Logger LOG = LoggerFactory.getLogger(DataBaseUtil.class);
	public static boolean getConnection(String driver,String url,String username,String password){
		Connection conn = null;
		try {
			Class.forName(driver);
		} catch (Exception e) {
			System.out.println("驱动加载错误");
			return false;
		}
				try {
					conn = DriverManager.getConnection(url, username, password);
					System.out.println("url:"+url+",username:"+username+",password:"+password);
				} catch (Exception e) {
					LOG.error("",e);
					System.out.println("url:"+url+",username:"+username+",password:"+password);
					System.out.println("连接信息有误");
					return false;
				}
				return true;
	}
	/**
	 * 关闭连接
	 */
public static void close(Connection conn){
	if(conn!=null){
		try {
			conn.close();
		} catch (SQLException e) {
			System.out.println("无法关闭连接");
		}
	}
}	
}
