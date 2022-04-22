package capstone.herbs.user;

import lombok.Data;


@Data
    public class LoginData {
        private String username;
        private String password;
        private String email;

    public LoginData(String testuser, String s, String s1) {
        this.username = testuser;
        this.password = s;
        this.email = s1;
    }




}



