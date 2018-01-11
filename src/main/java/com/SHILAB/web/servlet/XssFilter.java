package com.SHILAB.web.servlet;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * <p>Project:  etl</p>
 * <p>
 * <p>Description:XssFilter</p>
 * <p>
 * <p>Copyright: Copyright (c) 2016 create at 2016年11月30日</p>
 * <p>
 * <p>Company: TW_DEV</p>
 * @version 1.0
 */
public class XssFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        XssHttpRequestWrapper wrapper=new XssHttpRequestWrapper((HttpServletRequest) servletRequest);
        filterChain.doFilter(wrapper,servletResponse);
    }

    @Override
    public void destroy() {

    }
}
