package com.SHILAB.web.base.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * <p>Project:  datamingManager</p>
 *
 * <p>Description:Linux命令行工具类</p>
 *
 */
public class LinuxShellUtil {
	public static int returnFileLineLength(String filePath){
		String[] cmdArr={"wc","-l",filePath};
		int retnum=-1;
		try{
		ProcessBuilder builder=new ProcessBuilder(cmdArr);
		Process process=builder.start();
		BufferedReader reader=new BufferedReader(new InputStreamReader(process.getInputStream()));
		String line=reader.readLine();
		if(line!=null){
			String[] arr=line.split(" ");
			retnum=Integer.parseInt(arr[0]);
		}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return retnum;
	}
	public static void main(String[] args){
		System.out.println(LinuxShellUtil.returnFileLineLength(args[0]));
	}
}
