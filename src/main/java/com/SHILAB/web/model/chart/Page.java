package com.SHILAB.web.model.chart;

public class Page {
	
	private int pageSize;        //每页条数
//	private int totalPage;      //总页数
	private int totalResult;    //总记录数
	private int currentPage;    //当前页
//	private int currentResult;  //当前条数
	private boolean entityOrField;	//true:需要分页的地方，传入的参数就是Page实体；false:需要分页的地方，传入的参数所代表的实体拥有Page属性
	
	//获取每页条数
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	//获取总条数
	public int getTotalResult() {
		return totalResult;
	}
	public void setTotalResult(int totalResult) {
		this.totalResult = totalResult;
	}
	//获取总页数
	public int getTotalPage() {
		int m=totalResult/pageSize;
		int n=totalResult%pageSize;
		if(n==0){
			return m;
		}else{
		    return m+1;
		}
	}
	//获取当前页
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	//获取当前条数
	public int getCurrentResult() {
		return (currentPage-1)*pageSize;
	}
	public boolean isEntityOrField() {
		return entityOrField;
	}
	public void setEntityOrField(boolean entityOrField) {
		this.entityOrField = entityOrField;
	}

}
