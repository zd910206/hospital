package com.SHILAB.web.controller;

import com.SHILAB.web.base.util.CollectionUtils;
import com.SHILAB.web.model.User;
import com.SHILAB.web.service.*;
import com.SHILAB.web.web.util.HttpSessionProvider;
import com.mathworks.toolbox.javabuilder.MWNumericArray;
import matlabFunctions.MatlabFunction;
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
 *
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

    MWNumericArray resultArrs = null;

    static final String DISK_PATH = "E:\\workspace\\hospital\\src\\main\\webapp\\resources\\newImages";


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

        MultiValueMap<String, MultipartFile> map = request.getMultiFileMap();
        List<MultipartFile> list = map.get("inputFile");


        File dir = new File("d:\\" + user.getUserName());
        judeDirExists(dir);
        String path = "d:\\" + user.getUserName();

        List<String> filenameList = new ArrayList<String>();//

        try {
            for (MultipartFile mFile : list) {
                String originalFileName = mFile.getOriginalFilename();
                filenameList.add(originalFileName);
                byte[] bytes = mFile.getBytes();
                String filePath = path + File.separator + originalFileName;
                FileOutputStream fos = new FileOutputStream(new File(filePath));
                fos.write(bytes);
                fos.flush();
                fos.close();

                MatlabFunction mfunc = new MatlabFunction();

                String str[] = originalFileName.split("\\.");
                String path1 = path + "\\" + originalFileName;
                String path2 = DISK_PATH;
                mfunc.DecompressNConvertToPath(0, path1, originalFileName, path2, path2 + "\\" + str[0]);
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
        File file = new File(DISK_PATH);
        File[] tempList = file.listFiles();
        for (int i = 0; i < tempList.length; i++) {
            if (tempList[i].isDirectory()) {
                list.add(tempList[i].getName());
            }
        }
        if (list.size() > 0) {
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
        File file = new File(DISK_PATH + "\\" + fileName);
        String[] s = file.list();
        if (s.length > 0) {
            resultMap.put(RESULT, true);
            resultMap.put("num", s.length);
        } else {
            resultMap.put(RESULT, false);
        }
        return resultMap;

    }

    @RequestMapping("/verticalFlip")
    @ResponseBody
    public Map<String, Object> verticalFlip(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();
        String selectedDiv = request.getParameter("selectedDiv");
        User user = (User) session.getAttribute(request, USER_KEY);
        String path = "d:\\" + user.getUserName();
        try {
            MatlabFunction mfunc = new MatlabFunction();
            String path1 = path + "\\" + selectedDiv + ".dcm";
            String path2 = DISK_PATH;
            String path3 = "E:\\workspace\\hospital\\target\\hospital\\resources\\newImages";
            mfunc.vFlipDecompressNConvertToPath(0, path1, selectedDiv + ".dcm", path2, path2 + "\\" + selectedDiv);

            mfunc.vFlipDecompressNConvertToPath(0, path1, selectedDiv + ".dcm", path2, path3 + "\\" + selectedDiv);
            resultMap.put(RESULT, true);

        } catch (Exception e) {
            resultMap.put(RESULT, false);
            e.printStackTrace();
        }
        return resultMap;
    }




    @RequestMapping("/speckleTracking")
    @ResponseBody
    public Map<String, Object> speckleTracking(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();
        String selectedDiv = request.getParameter("selectedDiv");
        Integer offsetX = Integer.valueOf(request.getParameter("offsetX"));
        Integer offsetY = Integer.valueOf(request.getParameter("offsetY"));
        Integer pixelsX = Integer.valueOf(request.getParameter("pixelsX"));
        Integer pixelsY = Integer.valueOf(request.getParameter("pixelsY"));

        String path = "D:\\admin\\" + selectedDiv + ".dcm";

        String path2 = DISK_PATH + "\\" + selectedDiv;

        try {
            MatlabFunction mfunc = new MatlabFunction();
            resultArrs = (MWNumericArray) mfunc.trackAll(1, path, path2, offsetX, 600 - offsetY, pixelsX, pixelsY)[0];
            resultMap.put(RESULT, true);

        } catch (Exception e) {
            resultMap.put(RESULT, false);
            e.printStackTrace();
        }
        return resultMap;
    }





    @RequestMapping("/viewPulsatility")
    @ResponseBody
    public Map<String, Object> viewPulsatility(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = CollectionUtils.newHashMap();

        Integer imageNum = Integer.valueOf(request.getParameter("imageNum").split("\\.")[0]);
        String selectedDiv = request.getParameter("selectedDiv");
        Integer firstPoint_x = Integer.valueOf(request.getParameter("firstPoint_x"));
        Integer firstPoint_y = Integer.valueOf(request.getParameter("firstPoint_y"));
        Integer secondPoint_x = Integer.valueOf(request.getParameter("secondPoint_x"));
        Integer secondPoint_y = Integer.valueOf(request.getParameter("secondPoint_y"));
        String fRate = request.getParameter("fRate");
        String calibration = request.getParameter("calibration");

        Double newfRate;
        Double newcalibration;

        List<Double> xList = new ArrayList<Double>();
        List<Double> yList = new ArrayList<Double>();


        String path = DISK_PATH + "\\" + selectedDiv + "\\" + selectedDiv + "_1.dcm";

        String path2 = DISK_PATH + "\\" + selectedDiv + "\\pointLog.mat";

        try {
            MatlabFunction mfunc = new MatlabFunction();

            if (fRate == null || fRate.equals("")) {
                newfRate = Double.parseDouble(mfunc.detectFrameRate(1, path)[0].toString());
            } else {
                newfRate = Double.valueOf(fRate);
            }
            if (calibration == null || calibration.equals("")) {
                newcalibration = Double.parseDouble(mfunc.detectCalibration(1, path)[0].toString());
            } else {
                newcalibration = Double.parseDouble(mfunc.manualPixelCalibration(1, firstPoint_x, firstPoint_y, secondPoint_x, secondPoint_y, Double.valueOf(calibration))[0].toString());
            }

            Object[] resultArr = mfunc.distBtw2Points_v2(3, path2, firstPoint_x, 600 - firstPoint_y, secondPoint_x, 600 - secondPoint_y, newcalibration, newfRate);
            if (resultArr[2].toString().equals("1")) {
                resultMap.put(RESULT, false);
            } else {
//                int len = ((Double[][])((MWNumericArray) resultArr[0]).toDoubleArray())[0].length;
                for (int i = 1; i < imageNum; i++) {
                    xList.add(((MWNumericArray) resultArr[0]).getDouble(i));
                }
                for (int i = 1; i < imageNum; i++) {
                    yList.add(((MWNumericArray) resultArr[1]).getDouble(i));
                }

                resultMap.put(RESULT, true);
                resultMap.put("xList", xList);
                resultMap.put("yList", yList);
            }

        } catch (Exception e) {
            resultMap.put(RESULT, false);
            e.printStackTrace();
        }
        return resultMap;
    }


}
