package com.SHILAB.web.model.chart;

public class LineAttr {
	
	private double[][] seriesDatas;   //数据
	private String seriesColor;       //线条颜色
	private String seriesName;        //线条名称 
	private String seriesType;        //线条类型 曲线或者折线
	
	public double[][] getSeriesDatas() {
		return seriesDatas;
	}
	public void setSeriesDatas(double[][] seriesDatas) {
		this.seriesDatas = seriesDatas;
	}
	
	public String getSeriesColor() {
		return seriesColor;
	}
	public void setSeriesColor(String seriesColor) {
		this.seriesColor = seriesColor;
	}
	
	public String getSeriesName() {
		return seriesName;
	}
	public void setSeriesName(String seriesName) {
		this.seriesName = seriesName;
	}
	
	public String getSeriesType() {
		return seriesType;
	}
	public void setSeriesType(String seriesType) {
		this.seriesType = seriesType;
	}
	
	

}
