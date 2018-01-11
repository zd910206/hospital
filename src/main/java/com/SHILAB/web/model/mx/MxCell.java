package com.SHILAB.web.model.mx;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>Project:  etlproject</p>
 *
 * <p>Description:</p>
 *
 * <p>Copyright: Copyright (c) 2013 modified at 2013-12-3</p>
 *
 * <p>Company: TW_DEV</p>
 * @version 1.0
 */
public class MxCell {
	private Integer id;
	private String style;
	private boolean vertex;
	private List<MxCell> parentCells = new ArrayList<MxCell>();
	private List<MxCell> childCells = new ArrayList<MxCell>();
	private Integer funmodId;
	private Integer stepId;
	private Integer source;
	private Integer tagert;
	private String stepCode;
	private MxCellObject object;

	private Boolean isGroup;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public boolean isVertex() {
		return vertex;
	}
	public void setVertex(boolean vertex) {
		this.vertex = vertex;
	}
	public MxCellObject getObject() {
		return object;
	}
	public void setObject(MxCellObject object) {
		this.object = object;
	}
	public Integer getFunmodId() {
		return funmodId;
	}
	public void setFunmodId(Integer funmodId) {
		this.funmodId = funmodId;
	}
	public Integer getStepId() {
		return stepId;
	}
	public void setStepId(Integer stepId) {
		this.stepId = stepId;
	}
	public Integer getSource() {
		return source;
	}
	public void setSource(Integer source) {
		this.source = source;
	}
	public Integer getTagert() {
		return tagert;
	}
	public void setTagert(Integer tagert) {
		this.tagert = tagert;
	}
	public List<MxCell> getParentCells() {
		return parentCells;
	}
	public void setParentCells(List<MxCell> parentCells) {
		this.parentCells = parentCells;
	}
	public List<MxCell> getChildCells() {
		return childCells;
	}
	public void setChildCells(List<MxCell> childCells) {
		this.childCells = childCells;
	}
	public String getStepCode() {
		return stepCode;
	}
	public void setStepCode(String stepCode) {
		this.stepCode = stepCode;
	}
	public Boolean getGroup() {
		return isGroup;
	}

	public void setGroup(Boolean group) {
		isGroup = group;
	}

}
