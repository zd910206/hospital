package com.SHILAB.web.servlet.util;

import com.octo.captcha.CaptchaFactory;
import com.octo.captcha.component.image.backgroundgenerator.GradientBackgroundGenerator;
import com.octo.captcha.component.image.fontgenerator.RandomFontGenerator;
import com.octo.captcha.component.image.textpaster.NonLinearTextPaster;
import com.octo.captcha.component.image.wordtoimage.ComposedWordToImage;
import com.octo.captcha.component.word.wordgenerator.RandomWordGenerator;
import com.octo.captcha.engine.GenericCaptchaEngine;
import com.octo.captcha.image.gimpy.GimpyFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.awt.*;

@Component(value="sampleCaptchaService")
public class SampleImageCaptchaService implements InitializingBean{
	private  CustomGenericManageableCaptchaService instance;
	public static final int minAcceptedWordLength = 4;

	public static final int maxAcceptedWordLength = 5;
	public static final int imgWidth = 100;

	public static final int imgHeight = 27;

	public static final int minFontSize = 20;

	public static final int maxFontSize = 25;

	public static final Font font = new Font("@YaHei Consolas Hybrid",Font.PLAIN, (minFontSize + maxFontSize) / 2);

	public static final String captchaContent = "123456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
	private static NonLinearTextPaster testPaster = new NonLinearTextPaster(minAcceptedWordLength, maxAcceptedWordLength, new Color(60, 60, 60));
	private static GradientBackgroundGenerator backgroundGen = new GradientBackgroundGenerator(imgWidth, imgHeight, new Color(239, 246, 236), new Color(239, 246,236));

	private static RandomFontGenerator fontGen = new RandomFontGenerator(minFontSize, maxFontSize, new Font[] { font });

	private static RandomWordGenerator wordGen = new RandomWordGenerator(captchaContent);

	private static ComposedWordToImage wordToImage = new ComposedWordToImage(fontGen, backgroundGen, testPaster);

	private static GimpyFactory captchaFacotry = new GimpyFactory(wordGen,wordToImage);

	private static CaptchaFactory[] factories = new GimpyFactory[] { captchaFacotry };

	private  GenericCaptchaEngine imageEngine = new GenericCaptchaEngine(factories);
	@Override
	public void afterPropertiesSet() throws Exception {
		instance = new CustomGenericManageableCaptchaService(imageEngine, 300, 20000, 20000);
	}
	public CustomGenericManageableCaptchaService getImageService() {
		return instance;
	}
}