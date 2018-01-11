package com.SHILAB.web.model.chart;


public class EvaluateAttr {
	
	private String divIdStr;
	//CHART属性
	private String chartType;
	private String chartRenderTo;
	private int chartWidth;
	private int chartHeight;
	//TITLE属性
	private String titleText;
    //credits属性
	private String creditsText;
	//tooltip属性
	private String tooltipText1;
	private String tooltipText2;
	//XAXIS属性
	private String xaxisTitleText;
	private double xaxiStickInterval;
	private double xaxisMax;
	private double xaxisMin;
	//YAXIS属性
	private String yaxisTitleText;
	private double yaxisTickInterval;
	private double yaxisMax;
	private double yaxisMin;
	//SERIES属性
	private LineAttr[] series;
	
	
	public double getXaxiStickInterval() {
		return xaxiStickInterval;
	}
	public void setXaxiStickInterval(double xaxiStickInterval) {
		this.xaxiStickInterval = xaxiStickInterval;
	}
	public String getDivIdStr() {
		return divIdStr;
	}
	public void setDivIdStr(String divIdStr) {
		this.divIdStr = divIdStr;
	}
	public String getChartType() {
		return chartType;
	}
	public void setChartType(String chartType) {
		this.chartType = chartType;
	}
	
	public String getChartRenderTo() {
		return chartRenderTo;
	}
	public void setChartRenderTo(String chartRenderTo) {
		this.chartRenderTo = chartRenderTo;
	}
	public int getChartWidth() {
		return chartWidth;
	}
	public void setChartWidth(int chartWidth) {
		this.chartWidth = chartWidth;
	}
	public int getChartHeight() {
		return chartHeight;
	}
	public void setChartHeight(int chartHeight) {
		this.chartHeight = chartHeight;
	}
	public String getTitleText() {
		return titleText;
	}
	public void setTitleText(String titleText) {
		this.titleText = titleText;
	}
	public String getCreditsText() {
		return creditsText;
	}
	public void setCreditsText(String creditsText) {
		this.creditsText = creditsText;
	}
	public String getTooltipText1() {
		return tooltipText1;
	}
	public void setTooltipText1(String tooltipText1) {
		this.tooltipText1 = tooltipText1;
	}
	public String getTooltipText2() {
		return tooltipText2;
	}
	public void setTooltipText2(String tooltipText2) {
		this.tooltipText2 = tooltipText2;
	}
	public String getXaxisTitleText() {
		return xaxisTitleText;
	}
	public void setXaxisTitleText(String xaxisTitleText) {
		this.xaxisTitleText = xaxisTitleText;
	}
	
	public double getXaxisMax() {
		return xaxisMax;
	}
	public void setXaxisMax(double xaxisMax) {
		this.xaxisMax = xaxisMax;
	}
	public double getXaxisMin() {
		return xaxisMin;
	}
	public void setXaxisMin(double xaxisMin) {
		this.xaxisMin = xaxisMin;
	}
	public String getYaxisTitleText() {
		return yaxisTitleText;
	}
	public void setYaxisTitleText(String yaxisTitleText) {
		this.yaxisTitleText = yaxisTitleText;
	}
	
	public double getYaxisTickInterval() {
		return yaxisTickInterval;
	}
	public void setYaxisTickInterval(double yaxisTickInterval) {
		this.yaxisTickInterval = yaxisTickInterval;
	}
	public double getYaxisMax() {
		return yaxisMax;
	}
	public void setYaxisMax(double yaxisMax) {
		this.yaxisMax = yaxisMax;
	}
	public double getYaxisMin() {
		return yaxisMin;
	}
	public void setYaxisMin(double yaxisMin) {
		this.yaxisMin = yaxisMin;
	}
	public LineAttr[] getSeries() {
		return series;
	}
	public void setSeries(LineAttr[] series) {
		this.series = series;
	} 
	
	
}
