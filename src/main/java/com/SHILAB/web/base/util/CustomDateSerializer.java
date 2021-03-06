package com.SHILAB.web.base.util;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/** 
 *  java日期对象经过Jackson库转换成JSON日期格式化自定义类
 *  需要在get方法上增加注解
 *  @JsonSerialize(using = CustomDateSerializer.class)
 */  
public class CustomDateSerializer extends JsonSerializer<Date> {  
  
        @Override  
        public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {  
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
                String formattedDate = formatter.format(value);  
                jgen.writeString(formattedDate);  
        }  
} 