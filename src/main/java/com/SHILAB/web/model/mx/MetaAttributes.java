package com.SHILAB.web.model.mx;
/**
 * <p>Project:  cloudetl</p>
 *
 * <p>Description:</p>
 * @version 1.0
 */
public class MetaAttributes {
	private Long id;
	private String name;
	private String code;
	private String dataType;
	private Integer dataLength;
	private boolean isPk;
	private boolean isNull;
	private String codeSetNo;
	private String dataFormat;
	private String measure;
	private Double maxValue;
	private Double minValue;
	private String norminalVal;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public Integer getDataLength() {
		return dataLength;
	}
	public void setDataLength(Integer dataLength) {
		this.dataLength = dataLength;
	}
	public boolean isPk() {
		return isPk;
	}
	public void setPk(boolean isPk) {
		this.isPk = isPk;
	}
	public boolean isNull() {
		return isNull;
	}
	public void setNull(boolean isNull) {
		this.isNull = isNull;
	}
	public String getCodeSetNo() {
		return codeSetNo;
	}
	public void setCodeSetNo(String codeSetNo) {
		this.codeSetNo = codeSetNo;
	}
	public String getDataFormat() {
		return dataFormat;
	}
	public void setDataFormat(String dataFormat) {
		this.dataFormat = dataFormat;
	}
	public String getMeasure() {
		return measure;
	}
	public void setMeasure(String measure) {
		this.measure = measure;
	}

	public Double getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(Double maxValue) {
		this.maxValue = maxValue;
	}
	public Double getMinValue() {
		return minValue;
	}
	public void setMinValue(Double minValue) {
		this.minValue = minValue;
	}
	public String getNorminalVal() {
		return norminalVal;
	}
	public void setNorminalVal(String norminalVal) {
		this.norminalVal = norminalVal;
	}
	

}
