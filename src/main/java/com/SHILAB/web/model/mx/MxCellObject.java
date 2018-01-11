package com.SHILAB.web.model.mx;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>Project:  etlproject</p>
 *
 * <p>Description:</p>
 *
 */
public class MxCellObject {
	private String name;
	private Map<String, String> paramMap=new HashMap<String, String>();
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Map<String, String> getParamMap() {
		return paramMap;
	}
	public void setParamMap(Map<String, String> paramMap) {
		this.paramMap = paramMap;
	}
	

}
