//import matlabplot.*;


import DecompressNConvertToPath.MatlabFunc;

public class testMatlab {
    public static void main(String[] str) {
        System.out.println("Hello!");
        try{
            MatlabFunc func = new MatlabFunc();

           // 'E:\Heart.dcm','Heart.dcm','E:\','E:\ttttttt'
            func.DecompressNConvertToPath(0,"E:\\Heart.dcm","Heart.dcm","E:\\","E:\\ttttttt");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
