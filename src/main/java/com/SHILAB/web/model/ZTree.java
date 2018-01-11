/** 
 * Project Name:etl-web 
 * File Name:ZTree.java 
 * Package Name:cn.com.talkweb.etl.model 
 * Date:2014年12月12日 上午11:21:40 
 * Copyright (c) 2014, TalkWeb All Rights Reserved. 
 * 
 */  
package com.SHILAB.web.model;

import java.io.Serializable;

/** 
 * @author ZD
 * @version  
 * @since JDK 1.6 
 */
public class ZTree implements Serializable {
	private String id;
	private String pId;
	private String name;
	private String open;
	private String isParent;
	private String type;
	private String isFirst;

	@Override
	public String toString() {
		return "ZTree{" +
				"id='" + id + '\'' +
				", pId='" + pId + '\'' +
				", name='" + name + '\'' +
				", open='" + open + '\'' +
				", isParent='" + isParent + '\'' +
				", type='" + type + '\'' +
				", isFirst='" + isFirst + '\'' +
				'}';
	}
	/**
	 * @return the open
	 */
	public String getOpen() {
		return open;
	}
	/**
	 * @param open the open to set
	 */
	public void setOpen(String open) {
		this.open = open;
	}
	/**
	 * @return the isParent
	 */
	public String getIsParent() {
		return isParent;
	}
	/**
	 * @param isParent the isParent to set
	 */
	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the pId
	 */
	public String getpId() {
		return pId;
	}
	/**
	 * @param pId the pId to set
	 */
	public void setpId(String pId) {
		this.pId = pId;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public String getIsFirst() {
		return isFirst;
	}

	public void setIsFirst(String isFirst) {
		this.isFirst = isFirst;
	}

}
