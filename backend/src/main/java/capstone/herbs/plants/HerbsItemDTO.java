package capstone.herbs.plants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.Link;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class HerbsItemDTO {
    private String name;
    private String description;
    private String application;
    private List<Link> links;
}
