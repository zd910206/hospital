package com.SHILAB.web.model.mx;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


/**
* <p>Project: etl<／p>
*
* <p>Description: <／p>
*
* <p>Copyright: Copyright (c) 2014<／p>
* @version 1.0
*/
public class CellInfo implements Serializable{
    
	private static final long serialVersionUID = 2041659285226546420L;
	//Cell ID
    private Integer id;
    //step名词
    private String stepName;
    //是否是顶点
    private boolean vertex;
    //方法ID
    private Integer funmodId;
    //绑定方法
    private String bondFunction;
    //step ID
    private Integer stepId;
    // stepCode
    private String stepCode;
    //父Cell
    private Integer parent;
    //x坐标
    private Double positionX;
    //y坐标
    private Double positionY;
    //宽度
    private Integer width;
    //高度
    private Integer height;
    //是否是边
    private boolean edge;
    //起点ID
    private Integer source;
    //终点ID
    private Integer target;
    //父节点
    private List<CellInfo> parentCells = new ArrayList<CellInfo>();
    //子节点
	private List<CellInfo> childCells = new ArrayList<CellInfo>();
    // 默认样式
    private String style;
    // 自定义样式
    private String customStyle;
    private String connectable;

    private String rectangle;

    public String getRectangle() {
        return rectangle;
    }

    public void setRectangle(String rectangle) {
        this.rectangle = rectangle;
    }

    private Integer rectangleW;
    private Integer rectangleH;
    private Double rectangleX;
    private Double rectangleY;

    private String metaId;//元数据ID
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    private String value;
    private String points;

    private boolean group;

    public boolean isGroup() {
        return group;
    }

    public void setGroup(boolean group) {
        this.group = group;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }

    public Integer getRectangleW() {
        return rectangleW;
    }

    public void setRectangleW(Integer rectangleW) {
        this.rectangleW = rectangleW;
    }

    public Integer getRectangleH() {
        return rectangleH;
    }

    public void setRectangleH(Integer rectangleH) {
        this.rectangleH = rectangleH;
    }

    public Double getRectangleX() {
        return rectangleX;
    }

    public void setRectangleX(Double rectangleX) {
        this.rectangleX = rectangleX;
    }

    public Double getRectangleY() {
        return rectangleY;
    }

    public void setRectangleY(Double rectangleY) {
        this.rectangleY = rectangleY;
    }

    public String getConnectable() {
        return connectable;
    }

    public void setConnectable(String connectable) {
        this.connectable = connectable;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getCustomStyle() {
        return customStyle;
    }

    public void setCustomStyle(String customStyle) {
        this.customStyle = customStyle;
    }

    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getStepName() {
		return stepName;
	}
	public void setStepName(String stepName) {
		this.stepName = stepName;
	}
	public boolean isVertex() {
		return vertex;
	}
	public void setVertex(boolean vertex) {
		this.vertex = vertex;
	}
	public Integer getFunmodId() {
		return funmodId;
	}
	public void setFunmodId(Integer funmodId) {
		this.funmodId = funmodId;
	}
	public String getBondFunction() {
		return bondFunction;
	}
	public void setBondFunction(String bondFunction) {
		this.bondFunction = bondFunction;
	}
	public Integer getStepId() {
		return stepId;
	}
	public void setStepId(Integer stepId) {
		this.stepId = stepId;
	}
	public Integer getParent() {
		return parent;
	}
	public void setParent(Integer parent) {
		this.parent = parent;
	}
	public Double getPositionX() {
		return positionX;
	}
	public void setPositionX(Double positionX) {
		this.positionX = positionX;
	}
	public Double getPositionY() {
		return positionY;
	}
	public void setPositionY(Double positionY) {
		this.positionY = positionY;
	}
	public Integer getWidth() {
		return width;
	}
	public void setWidth(Integer width) {
		this.width = width;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public boolean isEdge() {
		return edge;
	}
	public void setEdge(boolean edge) {
		this.edge = edge;
	}
	public Integer getSource() {
		return source;
	}
	public void setSource(Integer source) {
		this.source = source;
	}
	public Integer getTarget() {
		return target;
	}
	public void setTarget(Integer target) {
		this.target = target;
	}
	public List<CellInfo> getParentCells() {
		return parentCells;
	}
	public void setParentCells(List<CellInfo> parentCells) {
		this.parentCells = parentCells;
	}
	public List<CellInfo> getChildCells() {
		return childCells;
	}
	public void setChildCells(List<CellInfo> childCells) {
		this.childCells = childCells;
	}

    public String getMetaId() {
        return metaId;
    }

    public void setMetaId(String metaId) {
        this.metaId = metaId;
    }


    public String getStepCode() {
        return stepCode;
    }

    public void setStepCode(String stepCode) {
        this.stepCode = stepCode;
    }
}
