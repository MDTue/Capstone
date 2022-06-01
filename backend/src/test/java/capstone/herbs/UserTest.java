package capstone.herbs;

import capstone.herbs.user.LoginData;
import capstone.herbs.plants.HerbsController;
import capstone.herbs.plants.HerbsItem;
import capstone.herbs.plants.HerbsRepository;
import capstone.herbs.plants.HerbsService;
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
        assertThat(createUserResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/api/login", new LoginData("Testuser", "123456a", "email@email.de"), String.class);
        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(loginResponse.getBody()).isNotBlank();
    }
}





