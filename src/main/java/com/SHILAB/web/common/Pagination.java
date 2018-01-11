package com.SHILAB.web.common;

/**
 * <p>Description:#TODO</p>
 * <p>
 * <p>Copyright: Copyright (c) 17-4-6</p>
 * <p>
 * <p>Company: TW_DEV</p>
 * @version 1.0
 */
public class Pagination {
    private int pageNumber;
    private int pagesize;
    private int total;
    public Pagination(int pageNumber, int pagesize) {
        this.pageNumber = pageNumber;
        this.pagesize = pagesize;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPagesize() {
        return pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    public int getPageNumber() {
        return pageNumber;
    }
}
