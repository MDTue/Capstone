package capstone.herbs;

import capstone.herbs.user.LoginData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void integrationTest() {
        ResponseEntity<LoginData> createUserResponse = restTemplate.postForEntity("/api/users", new LoginData("Testuser", "123456a", "email@email.de"), LoginData.class);
        assertThat(createUserResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/api/users", new LoginData("Testuser", "123456a", "email@email.de"), String.class);
        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(loginResponse.getBody()).isNotBlank();

        ResponseEntity<Void> createUser = restTemplate.exchange(
                "/api/users",
                HttpMethod.POST,
                new HttpEntity<>(new UserNew("Testuser"), createHeaders(loginResponse.getBody())),
                Void.class
        );
        assertThat(createUser.getStatusCode()).isEqualTo(HttpStatus.CREATED);


    }
    private HttpHeaders createHeaders(String token) {
        String authHeader = "Bearer " + token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        return headers;
    }
}





