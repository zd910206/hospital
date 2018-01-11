package com.SHILAB.web.base.util;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * 
 */
public class CollectionUtils {
	/**获取hashmap*/
	public static <K, V> HashMap<K, V> newHashMap() {
		return new HashMap<K, V>();
	}
	
	/**获取arraylist*/
	public static <E> ArrayList<E> newArrayList(){
		return new ArrayList<E>();
	}
}
