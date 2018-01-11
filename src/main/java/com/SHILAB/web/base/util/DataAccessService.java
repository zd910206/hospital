package com.SHILAB.web.base.util;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

/**
 * 流程上下文数据访问；
 * 日志写入处理；
 *
 */
public class DataAccessService {
	private static final Logger logger = LoggerFactory.getLogger(DataAccessService.class);
	public static byte[] intToByte(int data, int len) {
		byte[] rtn = new byte[len];
		try {
			for (int i = 0; i < len; i++) {
				rtn[i] = (byte) ((data >> 8 * (len - 1 - i)) & 0xFF);
			}
		} catch (Exception ex) {
			return null;
		}
		return rtn;
	}
	public static int ByteToInt(byte[] data, int len) {
		int intValue = 0;
		try {
			for (int i = 0; i < data.length; i++) {
				intValue += (data[i] & 0xFF) << (8 * (len - 1 - i));
			}
		} catch (Exception ex) {
			return -1;
		}
		return intValue;
	}
	/**
	 * 读取文件
	 * @param filePath 读取文件名 包含全路径的文件名
	 * @return
	 * @throws Exception
	 */
	public static InputStream getDataByStream(String filePath)throws Exception{
		File file = new File(filePath);
		InputStream in = new FileInputStream(file);
		return in;
	}
	/**
	 * 读取文件返回bufferreader
	 * @param path
	 * @param encode
	 * @return
	 * @throws Exception
	 */
	public static BufferedReader getDataByReader(String path,String encode) throws Exception{
		BufferedReader reader=null;
		File file=new File(path);
		if(file.exists()){
			reader=new BufferedReader(new InputStreamReader(FileUtils.openInputStream(file),encode));
			//reader=new BufferedReader(new InputStreamReader(HDFSUtils.readSimpleStream(path),encode));
		}
		return reader;
	}
	/**
	 * 读取文件返回bufferwriter
	 * @param path
	 * @param encode
	 * @return
	 * @throws Exception
	 */
	public static BufferedWriter getDataByWriter(String path, String encode) throws Exception{
		BufferedWriter writer=null;
		File file=new File(path);
		if(file.exists()){
			FileUtils.forceDelete(file);
		}
		writer=new BufferedWriter(new OutputStreamWriter(FileUtils.openOutputStream(file),encode));
		//reader=new BufferedReader(new InputStreamReader(HDFSUtils.readSimpleStream(path),encode));
		return writer;
	}
	/**
	 * 
	 * @param filePath 写入文件名 包含全路径的文件名
	 * @throws Exception
	 */
	public static OutputStream setDataByStream(String filePath)throws Exception{
		File file = new File(filePath);
		OutputStream out = new FileOutputStream(file);
		return out;
		
	}
	/**
	 *  * 日志
	 * @param flowId 流程ID
	 * @param task_id 任务ID
	 * @param logStr 日志内容
	 */
	public static void log(String logLevel, int flowId, int task_id, String logStr){
		if (logLevel.equals("error")){
			logger.error(logStr);
		}
		if (logLevel.equals("debug")){
			logger.debug(logStr);
		}
		if (logLevel.equals("info")){
			logger.info(logStr);
		}
	}



	
}
