package com.SHILAB.web.common;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

/*import com.talkweb.tbp.dhm.console.web.DatePropertyEditor;
import com.talkweb.tbp.dhm.console.web.IntPropertyEditor;
*/

public  abstract class BaseController {
    protected String redirect(String uri) {
        return String.format("redirect:%s", uri);
    }
    protected String dispatcher(String uri) {
        return String.format("dispatcher:%s", uri);
    }
   /* @InitBinder
    protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
        //对于需要转换为Date类型的属性，使用DateEditor进行处理
        binder.registerCustomEditor(Date.class, new DatePropertyEditor());
        binder.registerCustomEditor(int.class, new IntPropertyEditor());
    }*/
}
