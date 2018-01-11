package com.SHILAB.web.base.util;


import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.SHILAB.web.web.util.Constants.ROWS;
import static com.SHILAB.web.web.util.Constants.START_ROW;


/**
 * 数据库工具类
 */
public class DBUtils {
	/**
	 * 
	 * 根据当前页和每页条数计算mysql<br>中分页查询limit关键字所需要的参数
	 * @param page 当前页
	 * @param rows 每页条数
	 * @param isNeeded 是否需要装换
	 * @return
	 */
	public static Map<String, Object> getPaginationParams(Integer page, Integer rows, boolean isNeeded){
		Map<String,Object> params = CollectionUtils.newHashMap();
		if(page != null && rows != null){
			if(isNeeded){
				//起始行
				params.put(START_ROW, (page-1)*rows);
				//从起始行后取多少条记录
				params.put(ROWS, rows);
			}else{
				//起始行
				params.put(START_ROW, page);
				//从起始行后取多少条记录
				params.put(ROWS, rows);
			}
		}
		return params;
	}
	
	public static <T> List<T> getListByPage(List<T> list,Integer page, Integer rows){
		List<T> l = new ArrayList<T>();
		int totalCount = list.size();
		int startRow = (page - 1) * rows;//开始
		int endRow = page * rows;//结束
		//判断最后一页的记录数是否超过总记录数
		if(endRow > totalCount){
			endRow = totalCount;
		}
		//显示从startRow到endRow
		for (int i = startRow; i < endRow; i++) {
			l.add(list.get(i));
		}
		return l;
	}
	
	public static <T> List<T> getBootstrapListByPage(List<T> list,Integer limit, Integer offset){
		List<T> l = new ArrayList<T>();
		int totalCount = list.size();
		//判断最后一页的记录数是否超过总记录数
		if(limit > totalCount){
			limit = totalCount;
		}
		//显示从startRow到endRow
		for (int i = offset; i < limit; i++) {
			l.add(list.get(i));
		}
		return l;
	}


	/**
	 * 读取表信息
	 * @param conn
	 * @param tableName
	 * @param if_cls 
	 * @return
	 */
	public static List<Map<String, String>> getColumnMeta(Connection conn,
			String tableName, boolean if_cls) {
		ResultSet rst;
		try {
			rst = conn.createStatement().executeQuery("select * from "+tableName+" where 1=2");
			ResultSetMetaData rsm = rst.getMetaData();
			 int colCount = rsm.getColumnCount();
			 List<Map<String, String>> list = new ArrayList<Map<String,String>>();
			 for(int i=0;i<colCount;i++){
				 Map<String,String> map = new HashMap<String, String>();
				 map.put("columnName", rsm.getColumnName(i+1));
				 map.put("columnTypeName", rsm.getColumnTypeName(i+1));
				 map.put("columnType", String.valueOf(rsm.getColumnType(i+1)));
				 
				 list.add(map);
			 }
			if(if_cls){
				conn.close();
			}
			return list;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		finally{
			try{
				if  (conn != null){
					if(if_cls)
						conn.close();
				}
			}catch(Exception ex){
				
			}
		}
		return null;
	}

}
