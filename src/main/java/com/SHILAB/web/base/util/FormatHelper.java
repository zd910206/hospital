package com.SHILAB.web.base.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 *    <p>Project:  etl-web</p>
 *
 *    <p>Description:格式转换器</p>
 */

public class FormatHelper {
    
    /**
     * 去掉字符串头部字符串
     * @param str
     * @return
     */
    public static String trimHead(String str){
        if(str.indexOf("_")>-1){
            return str.substring(str.indexOf("_")+1);
        }
        else
            return str;
    }

    /**
     * 行转列
     * @param list
     * @param key
     * @param val
     * @return
     */
    public static Map<String, Object> listToMap(List<Map<String,Object>> list, String key, String val) {
        if(list!=null){
            Map<String, Object> result = new HashMap<String, Object>();
            for(int i=0;i<list.size();i++){
                if(list.get(i).get(key)!=null)
                    result.put(list.get(i).get(key).toString(), list.get(i).get(val));
            }
            return result;
        }else{
            return null;
        }
    }
    
    /**
     * 保留2位有效位
     * @param f
     * @return
     */
    public static String m2(Object f) {
        if(f!=null && f.toString().matches("^[\\d\\.]+$")){
            DecimalFormat df = new DecimalFormat("#.00");
            return df.format(Double.parseDouble(f.toString()));
        }
        else
            return "";
    }

    /**
     * 数组连接
     * @param fields
     * @param flg
     * @return
     */
    public static String join(String[] fields, String flg) {
        String ret = "";
        for(int i=0;i<fields.length;i++){
            ret += fields[i];
            if(i<fields.length-1){
                ret += flg;
            }
        }
        return ret;
    }

    public static String join(List<Long> index, String string) {
        return index.size()>0 ? index.toString().replaceAll("^\\[|\\]$", ""):"";
    }

    /**
     * 第1行
     * @param list
     * @return
     */
    public static Map<String, Object> listToMap(
            List<Map<String, Object>> list) {
        if(list.size()>0)
            return list.get(0);
        else
            return null;
    }

    /**
     * 将List结构转换为Map结构
     * @param list
     * @param key
     * @return
     */
	public static Map<String, List<Map<String, Object>>> listToObjMapByKey(
			List<Map<String, Object>> list, String key) {
		 if(list!=null){
			 Map<String, List<Map<String, Object>>> result = new LinkedHashMap<String,List<Map<String, Object>>>();
	            for(int i=0;i<list.size();i++){
	            	String kname = list.get(i).get(key).toString();
	                if(result.containsKey(kname) && result.get(kname).size() > 0){
	                	result.get(kname).add(list.get(i));
	                }else{
	                	List<Map<String, Object>> newlist = new  ArrayList<Map<String,Object>>();
	                	newlist.add(list.get(i));
	                	result.put(kname, newlist);
	                }
	            }
	            return result;
	        }else{
	            return null;
	        }
	}
	
	/**
	 * 提取单个值到list
	 * @param list
	 * @param fieldColumnid
	 * @return
	 */
	public static List<String> listToStringListByKey(
			List<Map<String, Object>> list, String fieldColumnid) {
		List<String> colIds = new ArrayList<String>();
		if(list != null){
			 for(int i=0;i<list.size();i++){
				 if(list.get(i).containsKey(fieldColumnid)){
					 colIds.add(list.get(i).get(fieldColumnid).toString());
				 }
			 }
		}
		return colIds;
	}

	public static <T> Map<String,T> listToMapAndVo(List<T> list, String key) {
		
		Map<String, T> map = new HashMap<String,T>();
		
		for(T t : list){
			Field[] field = t.getClass().getDeclaredFields();
			for(int i=0;i<field.length;i++){
				if(key.equals(field[i].getName())){
					String name = field[i].getName(); // 获取属性的名字
	                name = name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
	                try {
		                String type = field[i].getGenericType().toString(); // 获取属性的类型
		                if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
		                    Method m = t.getClass().getMethod("get" + name);
		                    String value = (String) m.invoke(t); // 调用getter方法获取属性值
		                    if (value == null) {
		                        m = t.getClass().getMethod("set"+name,String.class);
		                        m.invoke(t, "");
		                    }else{
		                    	map.put(value, t);
		                    }
		                }
	                } catch (NoSuchMethodException e) {
	                    e.printStackTrace();
	                } catch (SecurityException e) {
	                    e.printStackTrace();
	                } catch (IllegalAccessException e) {
	                    e.printStackTrace();
	                } catch (IllegalArgumentException e) {
	                    e.printStackTrace();
	                } catch (InvocationTargetException e) {
	                    e.printStackTrace();
	                }
				}
			}
		}
		
		return map;
	}
	
	public static <T> List<String> listToListStringByKey(List<T> list, String key) {
		
		List<String> retList = new ArrayList<String>();
		
		for(T t : list){
			Field[] field = t.getClass().getDeclaredFields();
			for(int i=0;i<field.length;i++){
				if(key.equals(field[i].getName())){
					String name = field[i].getName(); // 获取属性的名字
	                name = name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
	                try {
		                String type = field[i].getGenericType().toString(); // 获取属性的类型
		                if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
		                    Method m = t.getClass().getMethod("get" + name);
		                    String value = (String) m.invoke(t); // 调用getter方法获取属性值
		                    if (value == null) {
		                        m = t.getClass().getMethod("set"+name,String.class);
		                        m.invoke(t, "");
		                    }else{
		                    	retList.add(value);
		                    }
		                }else if(type.equals("class java.lang.Integer") || "int".equals(type)){
		                	Method m = t.getClass().getMethod("get" + name);
		                	Integer value = (Integer) m.invoke(t); // 调用getter方法获取属性值
		                    if (value != null) {
		                    	retList.add(value.toString());
		                    }
		                }
	                } catch (NoSuchMethodException e) {
	                    e.printStackTrace();
	                } catch (SecurityException e) {
	                    e.printStackTrace();
	                } catch (IllegalAccessException e) {
	                    e.printStackTrace();
	                } catch (IllegalArgumentException e) {
	                    e.printStackTrace();
	                } catch (InvocationTargetException e) {
	                    e.printStackTrace();
	                }
				}
			}
		}
		
		return retList;
	}

	/**
	 * 提取map值到list
	 * @param map
	 * @param key
	 * @return
	 */
	public static List<String> mapToListStringByKey(
			Map<String, Map<String, String>> map, String key) {
		List<String> colIds = new ArrayList<String>();
		if(map != null){
			 for(Entry<String, Map<String, String>> m : map.entrySet()){
				 if(m.getValue().containsKey(key)){
					 colIds.add(m.getValue().get(key));
				 }
			 }
		}
		return colIds;
	}
	
	/**
	 * 合并数组
	 * @param json
	 * @param originalJson
	 * @return json
	 */
	public static String mergeArrayList(String json, String originalJson) {
		Gson gson = new Gson();
		List<Integer> originalList = gson.fromJson(originalJson, new TypeToken<List<Integer>>(){}.getType());
		List<Integer> newList = gson.fromJson(json, new TypeToken<List<Integer>>(){}.getType());
		for(int i = 0; i< newList.size(); i++){
			if(!originalList.contains(newList.get(i))){
				originalList.add(newList.get(i));
			}
		}
		return "["+StringUtils.join(originalList, ",")+"]";
	}

	/**
	 * 批量移除list中的数字
	 * @param originalJson
	 * @param removeList
	 * @return
	 */
	public static String removeArrayList(String originalJson,
			List<Integer> removeList) {
		Gson gson = new Gson();
		List<Integer> originalList = gson.fromJson(originalJson, new TypeToken<List<Integer>>(){}.getType());
		List<Integer> tmpList = new ArrayList<Integer>();
		for(int i = 0; i< removeList.size(); i++){
			if(originalList.contains(removeList.get(i))){
				tmpList.add(removeList.get(i));
			}
		}
		for(int i = 0; i< tmpList.size(); i++){
			originalList.remove((Integer)tmpList.get(i));
		}
		return "["+StringUtils.join(originalList, ",")+"]";
	}
	
	public static <T> List<String> listVoTolistString(
			List<T> list, String key) {
		List<String> result = new ArrayList<String>();
		for(T t : list){
			Field[] field = t.getClass().getDeclaredFields();
			for(int i=0;i<field.length;i++){
				if(key.equals(field[i].getName())){
					String name = field[i].getName(); // 获取属性的名字
	                name = name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
	                try {
		                String type = field[i].getGenericType().toString(); // 获取属性的类型
		                if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
		                    Method m = t.getClass().getMethod("get" + name);
		                    String value = (String) m.invoke(t); // 调用getter方法获取属性值
		                    if (value == null) {
		                        m = t.getClass().getMethod("set"+name,String.class);
		                        m.invoke(t, "");
		                    }else{
		                    	result.add(value);
		                    }
		                }else if(type.equals("int")){
		                	Method m = t.getClass().getMethod("get" + name);
		                	Integer value = (Integer) m.invoke(t); // 调用getter方法获取属性值
		                    if (value == null) {
		                        m = t.getClass().getMethod("set"+name,String.class);
		                        m.invoke(t, "");
		                    }else{
		                    	result.add(String.valueOf(value));
		                    }
		                }
	                } catch (NoSuchMethodException e) {
	                    e.printStackTrace();
	                } catch (SecurityException e) {
	                    e.printStackTrace();
	                } catch (IllegalAccessException e) {
	                    e.printStackTrace();
	                } catch (IllegalArgumentException e) {
	                    e.printStackTrace();
	                } catch (InvocationTargetException e) {
	                    e.printStackTrace();
	                }
				}
			}
		}
		return result;
	}
}

