package com.SHILAB.web.base.util;


import com.SHILAB.web.model.chart.Page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *    <p>Project:  etl-web</p>
 *
 *
 */
public class EasyUI {

	public static <E> Object datagrid(List<E> list, Page page) {
		Map<String,Object> result = new HashMap<String, Object>();
		result.put("rows",list);
		result.put("total",page.getTotalResult());
		return result;
	}

}
