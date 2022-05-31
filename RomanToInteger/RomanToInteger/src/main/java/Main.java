

public class Main {
    public static void main(String[] args) {
        romanToInt("MCMXCIV");
    }

    public static void romanToInt(String sGiven) {
        String[] aRomans = new String[]{"I", "V", "X", "L", "C", "D", "M"};
        int[] aInteger = new int[]{1, 5, 10, 50, 100, 500, 1000};
        int iResultX = 0;
        int iResultY = 0;
        int iErgebnis = 0;
        int i = 0;
        char cX;
        char cY;
        int h = 0;
        int nLengthRomans = aRomans.length;
        int nLengthGiven = sGiven.length();

        for (i = 0; i < nLengthGiven; i++) {
            cX = sGiven.charAt(i);  //M
            if (i==nLengthGiven-1){
                cY = sGiven.charAt(i);  //C
            }else{
                if(i+1 < nLengthGiven){
                    cY =sGiven.charAt(i + 1);  //C
            }else{
                    cY = cX;
                }
            }
                     // Position vom sGiven[i]=cX in aRomans suchen
            for (h = 0; (h < nLengthRomans); h++) {
                if (!aRomans[h].matches(String.valueOf(cX))) {
                    continue;
                } else {
                    iResultX = aInteger[h];
                }
            }
            for (h = 0; (h < nLengthRomans); h++) {
                if (!aRomans[h].matches(String.valueOf(cY))) {
                    continue;
                } else {
                    iResultY = aInteger[h];
                }
            }
            // 2. Abfrage nach nächster Zahl für die Entscheidung, ob iResult addiert oder subtrahiert wird
            if (iResultX >= iResultY) {
                iErgebnis = iErgebnis + iResultX;
            } else {
                iErgebnis = iErgebnis - iResultX;
            }
        }
        System.out.println(iErgebnis);
        return;
    }
}


