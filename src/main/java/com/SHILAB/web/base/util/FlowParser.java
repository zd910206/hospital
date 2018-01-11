package com.SHILAB.web.base.util;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.SHILAB.web.model.mx.MxCell;
import com.SHILAB.web.model.mx.CellInfo;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>
 * Project: etlproject
 * </p>
 * 
 * <p>
 * Description:解析MxGraph生成的xml文件，还原成流程
 * </p>
 * 
 * <p>
 * Copyright: Copyright (c) 2013 modified at 2013-12-4
 * </p>
 * 
 * <p>
 * Company: TW_DEV
 * </p>
 * @version 1.0
 */
public class FlowParser {

    private static final Logger LOG = LoggerFactory.getLogger(FlowParser.class);

	@SuppressWarnings("unchecked")
	public static Map<Integer, MxCell> ParserFlow(String xmlContent,
                                                  List<Integer> verticeStepIds) {
		Map<Integer, MxCell> stepMap = new HashMap<Integer, MxCell>();
		// Map<Integer, List<Integer>> parentMap =new HashMap<Integer,
		// List<Integer>>();
		// Map<Integer, List<MxCell>> stepParentMap = new HashMap<Integer,
		// List<MxCell>>();
		Map<Integer, MxCell> relationMap = new HashMap<Integer, MxCell>();

		SAXReader reader = new SAXReader();
		try {
			Document doc = reader.read(new ByteArrayInputStream(xmlContent
					.getBytes()));
			Element root = doc.getRootElement();
			Node node = root.selectSingleNode("root");

			List<Node> list1 = node.selectNodes("mxCell");
			for (Node tmpnode : list1) {
				Element ele = (Element) tmpnode;
				int id = Integer.parseInt(ele.attributeValue("id"));
				MxCell cell = new MxCell();
				cell.setId(id);
				if (ele.attribute("vertex") != null) {
					cell.setVertex(true);
					if(ele.attribute("vertex").equals("3")) {    // 判断是否为分组节点
						cell.setGroup(true);
					} else {
						cell.setGroup(false);
					}
					stepMap.put(Integer.valueOf(id), cell);
				} else if (ele.attribute("edge") != null) {
					Integer source = Integer.valueOf(ele
							.attributeValue("source"));
					Integer tagert = Integer.valueOf(ele
							.attributeValue("target"));
					cell.setSource(source);
					cell.setTagert(tagert);
					// if(!parentMap.containsKey(source)){
					// List<Integer> list=new ArrayList<Integer>();
					// list.add(tagert);
					// parentMap.put(source, list);
					// }else{
					// parentMap.get(source).add(tagert);
					// }
					// cell.setVertex(false);
					relationMap.put(id, cell);
				}
				if (ele.attribute("funmodId") != null) {
					cell.setFunmodId(Integer.valueOf(ele
							.attributeValue("funmodId")));
				}
				if (ele.attribute("stepId") != null) {
					Integer stepIdParam = Integer.valueOf(ele
							.attributeValue("stepId"));
					verticeStepIds.add(stepIdParam);
					cell.setStepId(stepIdParam);
				}
			}
			if (relationMap != null) {
				Iterator<Integer> it = relationMap.keySet().iterator();
				while (it.hasNext()) {
					Integer cellId = it.next();
					MxCell xmCell = relationMap.get(cellId);
					Integer sourceId = xmCell.getSource();
					Integer tagertId = xmCell.getTagert();
					MxCell sourceCell = stepMap.get(sourceId);
					MxCell targerCell = stepMap.get(tagertId);
					sourceCell.getChildCells().add(targerCell);
					targerCell.getParentCells().add(sourceCell);
				}
			}

			// Iterator<Integer> it=parentMap.keySet().iterator();
			// while(it.hasNext()){
			// Integer source=it.next();
			// List<Integer> tlist1=parentMap.get(source);
			// if(stepMap.containsKey(source)){
			// for (Integer target:tlist1) {
			// if(stepMap.containsKey(target)){
			// if(!stepParentMap.containsKey(source)){
			// List<MxCell> tlist=new ArrayList<MxCell>();
			// tlist.add(stepMap.get(target));
			// stepParentMap.put(source, tlist);
			// }else{
			// stepParentMap.get(source).add(stepMap.get(target));
			// }
			// }
			// }
			// }
			// }

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return stepMap;
	}
    /**
     * 解析流程Xml文件
     * @param xmlContent
     * @param verticeStepIds
     * @return 
     */
	public static Map<Integer, CellInfo> ParserFlowXml(String xmlContent, List<Integer> verticeStepIds) {
		//节点信息
		Map<Integer, CellInfo> stepMap = new HashMap<Integer, CellInfo>();
		//边的关系信息
		Map<Integer, CellInfo> relationMap = new HashMap<Integer, CellInfo>();
		//xml文件读取对象
		SAXReader reader = new SAXReader();
		try {
			Document doc = reader.read(new ByteArrayInputStream(xmlContent.getBytes("UTF-8")));
			Element root = doc.getRootElement();

            // 获取root标签信息
			Node node = root.selectSingleNode("root");

            // 获取mxCell标签信息
			List<Node> nodeList = node.selectNodes("mxCell");
			for (Node cellNode : nodeList) {
				Element ele = (Element) cellNode;
				CellInfo cell = new CellInfo();
                // 边和顶点共用的属性
                int id = Integer.parseInt(ele.attributeValue("id"));
                cell.setId(id);
                if(ele.attribute("value")!=null){
//                    cell.setStepName(ele.attributeValue("value"));
                    cell.setValue(ele.attributeValue("value"));
                }
                if(ele.attribute("parent")!=null){
                    cell.setParent(Integer.valueOf(ele.attributeValue("parent")));
                }
                if (ele.attribute("style") != null) {
//                    String style = ele.attributeValue("style");
//                    if (ele.attribute("vertex") != null) {
//                        String[] styles = style.split(";");
//                        if (styles.length > 1) {
//                            cell.setStyle(styles[0]);
//                            cell.setCustomStyle(style.substring(style.indexOf(";"), style.length()));
//                        } else {
//                            cell.setStyle(style);
//                        }
//                    } else {
//                        cell.setStyle(style);
//                    }
                    cell.setStyle(ele.attributeValue("style"));
                }

                // 顶点
				if (ele.attribute("vertex") != null) {
					cell.setVertex(true);
					if(ele.attribute("vertex").equals("3")) {
						cell.setGroup(true);
					} else {
						cell.setGroup(false);
					}
					if (ele.attribute("funmodId") != null) {
						cell.setFunmodId(Integer.valueOf(ele.attributeValue("funmodId")));
					}
                    if(ele.attribute("bondFunction")!=null){
						cell.setBondFunction(ele.attributeValue("bondFunction"));
					}
					if (ele.attribute("stepId") != null) {
						Integer stepIdParam = Integer.valueOf(ele.attributeValue("stepId"));
						verticeStepIds.add(stepIdParam);
						cell.setStepId(stepIdParam);
					}
                    if(ele.attribute("connectable")!=null){
                        cell.setGroup(true); // 分组才有这个属性
                        if (StringUtils.isEmpty(cell.getStyle()))
                            cell.setStyle("-2");
                        cell.setConnectable(ele.attributeValue("connectable"));
                    }

					// 获取mxGeometry标签信息
					Element geometryEle=(Element)cellNode.selectSingleNode("mxGeometry");
                    if(geometryEle.attribute("x")!=null){
						cell.setPositionX(Double.valueOf(geometryEle.attributeValue("x")));
					}
                    if(geometryEle.attribute("y")!=null){
						cell.setPositionY(Double.valueOf(geometryEle.attributeValue("y")));
					}
                    if(geometryEle.attribute("width")!=null){
						cell.setWidth(Integer.valueOf(geometryEle.attributeValue("width")));
					}
                    if(geometryEle.attribute("height")!=null){
						cell.setHeight(Integer.valueOf(geometryEle.attributeValue("height")));
					}

                    // 如果分组的话，那么需要获取mxRectangle标签信息
                    Element rectangleEle = (Element) geometryEle.selectSingleNode("mxRectangle");
                    if (rectangleEle != null) {
//                        if (rectangleEle.attribute("x") != null) {
//                            cell.setRectangleX(Double.valueOf(rectangleEle.attributeValue("x")));
//                        }
//                        if (rectangleEle.attribute("y") != null) {
//                            cell.setRectangleY(Double.valueOf(rectangleEle.attributeValue("y")));
//                        }
//                        if (rectangleEle.attribute("width") != null) {
//                            cell.setRectangleW(Integer.valueOf(rectangleEle.attributeValue("width")));
//                        }
//                        if (rectangleEle.attribute("height") != null) {
//                            cell.setRectangleH(Integer.valueOf(rectangleEle.attributeValue("height")));
//                        }
                        // 为了简单，直接将xml存入t_sch_step_cfg的rectangle字段
                        cell.setRectangle(rectangleEle.asXML());
                    }
                    
					stepMap.put(Integer.valueOf(id), cell);
				} else if (ele.attribute("edge") != null) { // 边
					cell.setEdge(true);
					Integer source = Integer.valueOf(ele.attributeValue("source"));
					Integer target = Integer.valueOf(ele.attributeValue("target"));
					cell.setSource(source);
					cell.setTarget(target);

//                    LOG.info("line:" + ele.asXML());
//                    if (ele.attribute("style") != null) {
//                        cell.setStyle(ele.asXML());
//                    }

                    // 获取mxGeometry标签信息
                    Element geometryEle = (Element)cellNode.selectSingleNode("mxGeometry");
                    if (geometryEle != null) {
                        // 连线为折线时，需要记录转折点的位置
                        Element arrayEle = (Element)geometryEle.selectSingleNode("Array");
                        if (arrayEle != null) {
                            cell.setPoints(arrayEle.asXML());
                        }
                    }

					relationMap.put(id, cell);

                    // 为了样式，新增的代码
                    stepMap.put(id, cell);
				}				
			}
			//添加父子节点的对应关系
			if (relationMap != null) {
				Iterator<Integer> it = relationMap.keySet().iterator();
				while (it.hasNext()) {
					Integer cellId = it.next();
					CellInfo xmCell = relationMap.get(cellId);
					Integer sourceId = xmCell.getSource();
					Integer tagertId = xmCell.getTarget();
					CellInfo sourceCell = stepMap.get(sourceId);
					CellInfo targetCell = stepMap.get(tagertId);
					sourceCell.getChildCells().add(targetCell);
					targetCell.getParentCells().add(sourceCell);
				}
			}			

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return stepMap;		
	}
}
