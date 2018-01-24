//import matlabplot.*;


import matlabFunctions.MatlabFunction;

public class testMatlab {
    public static void main(String[] str) {
        System.out.println("Hello!");
        try{
            MatlabFunction func = new MatlabFunction();

           // 'E:\Heart.dcm','Heart.dcm','E:\','E:\ttttttt'
            func.DecompressNConvertToPath(0,"E:\\Heart.dcm","Heart.dcm","E:\\","E:\\ttttttt");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
