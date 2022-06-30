package capstone.herbs.components;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


public class ReadMe {
    String datNamed = "ReadMe.txt";
    private static void liesDatei(String datName) {
            try {
                String s = Files.readString(Path.of(datName));
                System.out.println(s);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    /*    public static void main(String[] args) {
            String datName = "/Pfad/zur/Datei.txt";
            liesDatei(datName);
        }
     */
}

