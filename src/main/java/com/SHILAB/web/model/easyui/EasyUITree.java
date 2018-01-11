package com.SHILAB.web.model.easyui;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author ZD
 *
 */
public class EasyUITree implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String text;
	private List<EasyUITree> children;
	private String state ="close";	//默认关闭
	private String iconCls;
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	private List<Map<String,Object>> attributes = new ArrayList<Map<String,Object>>();;

	
	public final static String OPEN_STATE ="open";
	public final static String CLOSE_STATE ="closed";

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public List<EasyUITree> getChildren() {
		return children;
	}
	public void setChildren(List<EasyUITree> children) {
		this.children = children;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<Map<String, Object>> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<Map<String, Object>> attributes) {
		this.attributes = attributes;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
	
}
