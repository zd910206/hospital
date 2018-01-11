package com.SHILAB.web.base.util;

import com.alibaba.fastjson.JSON;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * AJAX返回消息
 */

public class JSONnotify implements Map<String,Object> {
    
    private Map<String,Object> map;
    
    public JSONnotify(){
        this.init();
    }
    
    public JSONnotify(boolean res) {
        this.init();
        this.setResult(res);
    }

    private void init(){
        map = new HashMap<String,Object>();
    }
    
    private void setResult(boolean res){
        map.put("result", res);
    }
    
    private void setMsg(Object object){
        map.put("msg", object);
    }
    
    public static JSONnotify success(String msg) {
    	return success(null,msg);
    }
    
    /**
	 * 带返回值的保存成功
	 * @param data
	 * @param msg
	 * @return
	 */
	public static JSONnotify success(Map<String, Object> data, String msg) {
        JSONnotify notify = new JSONnotify();
        if(data!=null)
        	notify.map = data;
        notify.setResult(true);
        notify.setMsg(msg);
        return notify;
    }

    public static JSONnotify failed(Object object) {
        JSONnotify notify = new JSONnotify(false);
        notify.setMsg(object);
        return notify;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(map);
    }
    
    public Map<String,Object> toMap(){
        return map;
    }

    public static JSONnotify undefined() {
        JSONnotify notify = new JSONnotify(false);
        notify.setMsg("未定义任何信息");
        return notify;
    }

    public int size() {
        return map.size();
    }

    public boolean isEmpty() {
        return map==null?true:false;
    }

    public boolean containsKey(Object key) {
        return map.containsKey(key);
    }

    public boolean containsValue(Object value) {
        return map.containsValue(value);
    }

    public Object get(Object key) {
        return map.get(key);
    }

    public Object put(String key, Object value) {
        return map.put(key, value);
    }

    public Object remove(Object key) {
        return map.remove(key);
    }

    public void putAll(Map<? extends String, ? extends Object> m) {
        map.putAll(m);
    }

    public void clear() {
        map.clear();
    }

    public Set<String> keySet() {
        return map.keySet();
    }

    public Collection<Object> values() {
        return map.values();
    }

    public Set<Entry<String, Object>> entrySet() {
        return map.entrySet();
    }
}