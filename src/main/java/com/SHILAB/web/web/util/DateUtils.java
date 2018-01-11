package com.SHILAB.web.web.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 
 */
public class DateUtils {
	private static Logger LOG = LoggerFactory.getLogger(DateUtils.class);
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static long parse(String source) {
		try {
			Date d = sdf.parse(source);
			return d.getTime();
		} catch (ParseException e) {
			LOG.error("解释时间失败，" + e.getMessage());
		}
		return 0;
	}

	public static String format(long millis) {
		return sdf.format(new Date(millis));
	}
	
	public static String l10N(long millsecs){
		String retTime = "";
		long s = 1000;
		long m = s * 60;
		long h = m * 60;
		long d = h * 24;
		if(millsecs == 0){
			return 0 + "秒";
		}
		if(millsecs < m){//小于1分钟
			retTime = (millsecs / s) + "秒";
		}else if(millsecs > m && millsecs < h){////大约1分钟小于1小时
			long mins = millsecs / m;
			long sec = (millsecs - mins * m) / s;
			retTime = mins + "分" + sec + "秒";
		}else if(millsecs > m && millsecs < d){//大于1小时小与1天
			long hour = millsecs / h;
			long mins = (millsecs - hour * h) / m;
			long sec = (millsecs - hour * h - mins * m) / s;
			retTime = hour + "时"  +  mins + "分"  + sec + "秒";
		}else{//大于1天
			long day = millsecs / d;
			long hour = (millsecs - day * d) / h;
			long mins = (millsecs - day * d - hour * h) / m;
			long sec = (millsecs - day * d - hour * h - mins * m) / s;
			retTime = day + "天" +  hour + "时" +  mins + "分"  + sec + "秒";
		}
		return retTime;
	}
}
