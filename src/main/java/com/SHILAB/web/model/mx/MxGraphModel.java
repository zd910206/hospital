package com.SHILAB.web.model.mx;

import java.util.ArrayList;
import java.util.List;

public class MxGraphModel {
	private List<MxCell> list=new ArrayList<MxCell>();
	public void addMxCell(MxCell cell){
		list.add(cell);
	}

}
