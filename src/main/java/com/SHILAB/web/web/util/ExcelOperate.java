package com.SHILAB.web.web.util;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;

import java.awt.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SZJ on 2017/3/21.
 * 导入Excel表格并解析
 * 导出对象并存入Excel文件
 */
public class ExcelOperate {


    static XSSFWorkbook workbook;

    /**
     * 读取Excel
     * 封装表格对象,返回一个List<List<String>>类型的集合
     * @param input  流对象
     * @param path   导入表格的名字
     * @return 数据集合
     */
    public static List<List<String>> readExcel(InputStream input,String path) throws IOException {
        //判断是否为Excel文件，不是则返回null
        if(!path.endsWith("xlsx") && !path.endsWith("xls")){
            return null;
        }else{
            List<List<String>> lists = new ArrayList<List<String>>();

            boolean isE2007 = false; // 判断是否是excel2007格式
            if (path.endsWith("xlsx")) {
                isE2007 = true;
            }

            // 准备workbook
            // 同时支持Excel 2003、2007
            Workbook workbook = null;

            // 根据文件格式(2003或者2007)来初始化
                if (isE2007) {
                    workbook = new XSSFWorkbook(input);
                } else {
                    workbook = new HSSFWorkbook(input);
                }
                input.close();

            // 循环工作表
            for (int numSheet = 0; numSheet < workbook.getNumberOfSheets(); numSheet++) {
                Sheet sheet = workbook.getSheetAt(numSheet);
                if (sheet == null) {
                    continue;
                }
                // 循环行
                for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
                    Row row = sheet.getRow(rowNum);
                    if (row == null) {
                        continue;
                    }

                    // 将单元格中的内容存入集合
                    List<String> list = new ArrayList<String>();

                    Cell cell;
                    //循环列
                    for(int i = 0 ; i < row.getLastCellNum() ;i++){
                        cell = row.getCell(i);
                        if(isMergedRegion(sheet,rowNum,i)){
                            list.add(getMergedRegionValue(sheet,rowNum,i));
                        }else{
                            list.add(getCellValue(cell));
                        }
                    }
                    lists.add(list);
                }
            }
            return lists;
        }
    }



    /**
     * 获取合并单元格的值
     * @param sheet
     * @param row
     * @param column
     * @return
     */
    public static String getMergedRegionValue(Sheet sheet ,int row , int column){

        int sheetMergeCount = sheet.getNumMergedRegions();

        for(int i = 0 ; i < sheetMergeCount ; i++){
            CellRangeAddress ca = sheet.getMergedRegion(i);
            int firstColumn = ca.getFirstColumn();
            int lastColumn = ca.getLastColumn();
            int firstRow = ca.getFirstRow();
            int lastRow = ca.getLastRow();

            if(row >= firstRow && row <= lastRow){
                if(column >= firstColumn && column <= lastColumn){
                    Row fRow = sheet.getRow(firstRow);
                    Cell fCell = fRow.getCell(firstColumn);
                    return getCellValue(fCell) ;
                }
            }
        }
        return null ;
    }

    /**
     * 判断指定的单元格是否是合并单元格
     * @param sheet
     * @param row
     * @param column
     * @return
     */
    public static boolean isMergedRegion(Sheet sheet , int row , int column){

        int sheetMergeCount = sheet.getNumMergedRegions();

        for(int i = 0 ; i < sheetMergeCount ; i++ ){
            CellRangeAddress ca = sheet.getMergedRegion(i);
            int firstColumn = ca.getFirstColumn();
            int lastColumn = ca.getLastColumn();
            int firstRow = ca.getFirstRow();
            int lastRow = ca.getLastRow();

            if(row >= firstRow && row <= lastRow){
                if(column >= firstColumn && column <= lastColumn){
                    return true ;
                }
            }
        }
        return false ;
    }

    /**
     * 获取单元格的值
     * @param cell
     * @return
     */
    public static String getCellValue(Cell cell){

        if(cell == null) return "";

        if(cell.getCellType() == Cell.CELL_TYPE_STRING){

            return cell.getStringCellValue();

        }else if(cell.getCellType() == Cell.CELL_TYPE_BOOLEAN){

            return String.valueOf(cell.getBooleanCellValue());

        }else if(cell.getCellType() == Cell.CELL_TYPE_FORMULA){

            return cell.getCellFormula() ;

        }else if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC){
            return String.valueOf((int)cell.getNumericCellValue());
        }
        return "";
    }


    /**
     * 将对象写入Excel表中
     */
    public static void outputToExcel(List<List<String>> stringList ,OutputStream out,List<Integer> listInteger) throws IOException{

        List<Integer> l = new ArrayList<Integer>();
        //去重
        l.add(listInteger.get(0));
        for(int i = 1 ; i < listInteger.size() ; i++){
            boolean flag = false;
            for(Integer ii : l){
                if(listInteger.get(i) == ii){
                    flag = true;
                }
            }
            if(!flag){
                l.add(listInteger.get(i));
            }
        }

        //创建表头内容
        List<String> list = new ArrayList<String>();
        list.add("工段名称");
        list.add("工段编码");
        list.add("工序名称");
        list.add("工序编码");
        list.add("设备");
        list.add("参数名称");
        list.add("参数编码");
        list.add("参数类型");
        list.add("参数长度");
        list.add("单位名称");
        list.add("单位编码");
        list.add("OPC数据点变量名(tag点)");
        // 创建一个Excel文件
         workbook = new XSSFWorkbook();
        // 创建一个工作表
        XSSFSheet sheet = workbook.createSheet("导入失败表");
        // 添加表头行
        XSSFRow xssfRow =sheet.createRow(0);
        // 设置单元格格式居中
        XSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);

        // 添加表头内容
        XSSFCell xssfCell;
        for(int i = 0 ; i < list.size() ; i++){
            xssfCell=xssfRow.createCell(i);
            xssfCell.setCellValue(list.get(i));
            xssfCell.setCellStyle(cellStyle);
            sheet.setColumnWidth(i, 6000);
        }

        // 添加数据内容
        for(int i = 0 ; i < stringList.size() ; i++){
            xssfRow = sheet.createRow(i+1);
            XSSFCell cell;
            for(int j = 0 ; j < stringList.get(i).size() ; j++){
                cell =  xssfRow.createCell(j);
                cell.setCellValue(stringList.get(i).get(j));
                cell.setCellStyle(cellStyle);
                if(j>4){
                    for(Integer s : l){
                        //判断是否是要标识的数据
                        if(s == i){
                            styleSet(cell);
                        }
                    }
                }
            }
        }
        //合并列
        for(int i = 0 ; i < 5 ;i++){
            int num = 0;
            int n = 0;
            String s;
            String string = stringList.get(0).get(i).trim();
            List<Integer> integers = new ArrayList<Integer>();
            for(int j = 0 ; j < stringList.size() ; j ++){
                 s = stringList.get(j).get(i).trim();
                 if(string.equals(s)){
                     num++;
                 }else{
                     integers.add(num);
                     num=1;
                     string = s;
                 }
                if (j == stringList.size()-1) {
                    integers.add(num);
                }
            }
            for(int j = 0 ; j < integers.size() ; j++){
                sheet.addMergedRegion(new CellRangeAddress(1+n, integers.get(j)+n, i, i));
                n += integers.get(j);
            }
        }
        workbook.write(out);
    }

    /**
     * 设置背景色
     * @param cell
     */
    public static void styleSet(XSSFCell cell) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setFillForegroundColor(new XSSFColor(Color.RED));
        style.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
        style.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        cell.setCellStyle(style);
    }
}
