package com.SHILAB.web.model.easyui;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * 文件名称: ToolMenu.java
 * 包路径: cn.com.talkweb.cdm.view
 * 描述:
 * 内容摘要 
 *    作者: 杨文松
 *    版本: 1.0
 *    时间: 2014年1月9日
 *    邮箱: yangwensong@talkweb.com.cn
 * 修改历史:  
 * 修改日期           修改人员        版本	       修改内容  		说明
 * ---------------------------------------------- 
 * 
 * </pre>
 */
public class ToolMenu {
	
	private Object id;
	private String imgPath;
	private String name;
//	private String bindFunction;     //绑定的函数
	private Map<String,Object> otherData = new HashMap<String, Object>();
	private List<ToolMenu> toolMenus;
	
	
	
	

	public Object getId() {
		return id;
	}
	public void setId(Object id) {
		this.id = id;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<ToolMenu> getMenus() {
		return toolMenus;
	}
	public void setMenus(List<ToolMenu> toolMenus) {
		this.toolMenus = toolMenus;
	}
	public Map<String, Object> getOtherData() {
		return otherData;
	}
	public void setOtherData(Map<String, Object> otherData) {
		this.otherData = otherData;
	}
	
}
