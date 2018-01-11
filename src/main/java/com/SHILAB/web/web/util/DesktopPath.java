package com.SHILAB.web.web.util;

import javax.swing.filechooser.FileSystemView;
import java.io.File;

/**
 * Created by pengjunpu on 2017/3/25.
 */
public class DesktopPath {
    public static File getDeskTop(){
        FileSystemView fsv = FileSystemView.getFileSystemView();
        File com=fsv.getHomeDirectory();
        return com ;
    }
}
