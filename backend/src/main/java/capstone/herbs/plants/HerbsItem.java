package capstone.herbs.plants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HerbsItem {
    @Id
    private String Id;
    private String name;
    private String description;
    private String application;
    private String userId;

}
