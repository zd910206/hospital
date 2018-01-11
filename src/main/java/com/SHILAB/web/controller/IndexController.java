package com.SHILAB.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 首页控制器
 * @author ZD
 *
 */
@Controller
public class IndexController {

	@RequestMapping("/index")
	public String home(HttpServletRequest request, HttpServletResponse response){
		return "index";
	}


}
