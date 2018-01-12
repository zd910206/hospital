package com.SHILAB.web.controller;

import DecompressNConvertToPath.MatlabFunc;
import com.SHILAB.web.base.util.CollectionUtils;
import com.SHILAB.web.model.User;
import com.SHILAB.web.service.*;
import com.SHILAB.web.web.util.HttpSessionProvider;
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
        User user = (User) session.getAttribute(request, USER_KEY);

        MultiValueMap<String, MultipartFile> map = request.getMultiFileMap();// 为了获取文件，这个类是必须的
        List<MultipartFile> list = map.get("inputFile");// 获取到文件的列表


        File dir = new File("d:\\" + user.getUserName());  // 创建用户文件夹
        judeDirExists(dir);
        String path = "d:\\" + user.getUserName();

        List<String> filenameList = new ArrayList<String>();//

        try {
            for (MultipartFile mFile : list) {
                String originalFileName = mFile.getOriginalFilename();//获取文件名称
                filenameList.add(originalFileName);
                byte[] bytes = mFile.getBytes();//获取字节数组
                String filePath = path + File.separator + originalFileName;
                FileOutputStream fos = new FileOutputStream(new File(filePath)); //写出到文件
                fos.write(bytes);
                fos.flush();
                fos.close();

                MatlabFunc mfunc = new MatlabFunc();

                String str[] = originalFileName.split("\\.");
                String path1 = path + "\\" + originalFileName;
                String path2 = "E:\\workspace\\hosptial\\src\\main\\webapp\\resources\\newImages" + "\\" + str[0];
                mfunc.DecompressNConvertToPath(0, path1, originalFileName, "E:\\workspace\\hosptial\\src\\main\\webapp\\resources\\newImages", path2);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";

    }


    /**
     * test matlab AddFunction
     *
     * @param request
     * @param response
     */
    @RequestMapping("/showDcm")
    @ResponseBody
    public Map<String, Object> showImagesNum(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();
        ArrayList<String> list = new ArrayList<String>();
        File file = new File("E:\\workspace\\hosptial\\src\\main\\webapp\\resources\\newImages");
        File[] tempList = file.listFiles();
        for(int i = 0; i < tempList.length; i++) {
            if (tempList[i].isDirectory()) {
                list.add(tempList[i].getName());
            }
        }
        if(list.size() > 0) {
            resultMap.put(RESULT, true);
            resultMap.put("dcmList", list);
        } else {
            resultMap.put(RESULT, false);
        }
        return resultMap;
    }



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


    @RequestMapping("/showImages")
    @ResponseBody
    public Map<String, Object> showImages(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();
        String fileName = request.getParameter("fileName");
        File file = new File("E:\\workspace\\hosptial\\src\\main\\webapp\\resources\\newImages\\" + fileName);
        String[] s = file.list();
        if(s.length > 0) {
            resultMap.put(RESULT, true);
            resultMap.put("num", s.length);
        } else {
            resultMap.put(RESULT, false);
        }
        return resultMap;

    }


}
