package capstone.herbs.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
@Data
public class UserDocument {
    @Id
    String id;
    String username;
    String password;
    String email;
    String role;


}
