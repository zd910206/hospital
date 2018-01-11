package com.SHILAB.web.web.util;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class StringUtil {
	
	/**
	 * 截取最后一个元素
	 * @param text
	 * @param reg
	 * @return
	 */
	public static String obtainLastStr(String text, String reg){
		 if(StringUtils.isEmpty(text)) return null;
		 String[] texts = text.split(";");
		 String result = texts[texts.length-1];
		 return result;
	}
	
	/**
	 * 把json串转换成List<Map<String,String>>
	 */
	public static List<Map<String, String>> returnAvailableColumnListWithTrim(String columnListStr){
		List<Map<String, String>> retList=new ArrayList<Map<String,String>>();
		try{
			ObjectMapper mapper=new ObjectMapper();
			List<Map<String, String>> columnTypeList=mapper.readValue(columnListStr, new TypeReference<List<Map<String,String>>>(){});
			for (int i=0;i<columnTypeList.size();i++) {
				Map<String, String> tmpMap=columnTypeList.get(i);
				retList.add(tmpMap);	
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return retList;
	}

}
