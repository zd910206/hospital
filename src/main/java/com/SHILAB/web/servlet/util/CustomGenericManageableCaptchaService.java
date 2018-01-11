package com.SHILAB.web.servlet.util;

import com.octo.captcha.Captcha;
import com.octo.captcha.engine.CaptchaEngine;
import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.captchastore.CaptchaStore;
import com.octo.captcha.service.multitype.GenericManageableCaptchaService;

public class CustomGenericManageableCaptchaService extends  GenericManageableCaptchaService  {

	public CustomGenericManageableCaptchaService(CaptchaEngine captchaEngine,
			int minGuarantedStorageDelayInSeconds, int maxCaptchaStoreSize,
			int captchaStoreLoadBeforeGarbageCollection) {
		super(captchaEngine, minGuarantedStorageDelayInSeconds, maxCaptchaStoreSize,
				captchaStoreLoadBeforeGarbageCollection);
	}
	 public CustomGenericManageableCaptchaService(CaptchaStore captchaStore,  
	            CaptchaEngine captchaEngine, int minGuarantedStorageDelayInSeconds,  
	            int maxCaptchaStoreSize, int captchaStoreLoadBeforeGarbageCollection) {  
	        super(captchaStore, captchaEngine, minGuarantedStorageDelayInSeconds,  
	                maxCaptchaStoreSize, captchaStoreLoadBeforeGarbageCollection);  
	 }  
	@Override
	public Boolean validateResponseForID(String ID, Object response)
			throws CaptchaServiceException {
		if (!this.store.hasCaptcha(ID)) {  
            throw new CaptchaServiceException(  
                    "Invalid ID, could not validate unexisting or already validated captcha");  
        }  
		
		Captcha captcha = this.store.getCaptcha(ID);
		Class temp = captcha.getClass();
		java.lang.reflect.Field f;
		Object res = null;
		try {
		        f = temp.getDeclaredField("response");
		        f.setAccessible(true);  
		        res = f.get(captcha);
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
        Boolean valid = (null != res) && ((res instanceof String)) && (response != null) ? Boolean.valueOf(response.toString().toLowerCase().equals(res.toString().toLowerCase())) : Boolean.FALSE;
        
        return valid;
	}
	
	public void removeCaptcha(String sessionId){  
        if(sessionId!=null && this.store.hasCaptcha(sessionId)){  
            this.store.removeCaptcha(sessionId);  
        }  
    }  
}