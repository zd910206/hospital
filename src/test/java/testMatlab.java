//import matlabplot.*;


import matlabTest.*;

public class testMatlab {
    public static void main(String[] str) {
//        System.out.println("你好！");
        try{
            matlabTest func = new matlabTest();
            System.out.println(func.addTest(1)[0]);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
