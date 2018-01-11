package com.SHILAB.web.controller;

import com.SHILAB.web.servlet.util.SampleImageCaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Controller
public class CaptchaController {

	@Autowired
    SampleImageCaptchaService sampleImageCaptchaService;
	
	@RequestMapping("captcha")
	@ResponseBody
	public void captcha(HttpServletResponse response, HttpServletRequest request, HttpSession session) throws IOException{
//		SampleImageCaptchaService sampleCaptchaService = (SampleImageCaptchaService)SpringContextHolder.getBean("sampleCaptchaService");
		
		//设置浏览器不要缓存
        response.setHeader("expires", "-1");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        response.setContentType("image/jpeg");
        
		BufferedImage bi = sampleImageCaptchaService.getImageService().getImageChallengeForID(session.getId(), request.getLocale());
		
		ImageIO.write(bi, "jpg", response.getOutputStream());
	}
}
