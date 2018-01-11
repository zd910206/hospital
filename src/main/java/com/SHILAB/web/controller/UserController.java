package com.SHILAB.web.controller;

import com.SHILAB.web.base.util.CollectionUtils;
import com.SHILAB.web.model.User;
import com.SHILAB.web.service.*;
import com.SHILAB.web.web.util.HttpSessionProvider;
import matlabTest.matlabTest;
import org.apache.commons.fileupload.FileUploadException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.SHILAB.web.web.util.Constants.RESULT;
import static com.SHILAB.web.web.util.Constants.USER_KEY;

/**
 * 用户管理控制器
 *
 * @author ZD
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;
    @Autowired
    private HttpSessionProvider session;


    @RequestMapping("/forward")
    public String userForward(HttpServletRequest request,
                              HttpServletResponse response) {
        return "user/userList";
    }


    /**
     * test file upload
     *
     * @param request
     * @return
     * @throws FileUploadException
     * @throws IOException
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "multipart/*")
    public String uploadFilesFromHtml(MultipartHttpServletRequest request) throws FileUploadException, IOException {
        User user= (User) session.getAttribute(request, USER_KEY);

        MultiValueMap<String, MultipartFile> map = request.getMultiFileMap();// 为了获取文件，这个类是必须的
        List<MultipartFile> list = map.get("inputFile");// 获取到文件的列表


        File dir = new File("d:\\" + user.getUserName());  // 创建用户文件夹
        judeDirExists(dir);
        String path = "d:\\" + user.getUserName();

        List<String> filenameList = new ArrayList<String>();//
        for (MultipartFile mFile : list) {
            String originalFileName = mFile.getOriginalFilename();//获取文件名称
//            if(originalFileName != null && originalFileName.length() > 0 ) {
//
//            } else {
//
//            }

            filenameList.add(originalFileName);
            byte[] bytes = mFile.getBytes();//获取字节数组
            String filePath = path + File.separator + originalFileName;
            FileOutputStream fos = new FileOutputStream(new File(filePath)); //写出到文件
            fos.write(bytes);
            fos.flush();
            fos.close();
        }
        return "index";
    }


    /**
     * test matlab AddFunction
     *
     * @param request
     * @param response
     */
    @RequestMapping("/matlabAdd")
    @ResponseBody
    public Map<String, Object> matlabAdd(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();
        try {
            matlabTest func = new matlabTest();
            String sum = func.addTest(1)[0].toString();
//            System.out.println(func.addTest(1)[0]);
            resultMap.put(RESULT, true);
            resultMap.put("sum", sum);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }




    // 判断文件是否存在
    public static void judeFileExists(File file) {

        if (file.exists()) {
            System.out.println("file exists");
        } else {
            System.out.println("file not exists, create it ...");
            try {
                file.createNewFile();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

    // 判断文件夹是否存在
    public static void judeDirExists(File file) {

        if (file.exists()) {
            if (file.isDirectory()) {
                System.out.println("dir exists");
            } else {
                System.out.println("the same name file exists, can not create dir");
            }
        } else {
            System.out.println("dir not exists, create it ...");
            file.mkdir();
        }

    }


}
