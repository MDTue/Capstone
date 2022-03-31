package capstone.herbs.plants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class HerbsItem {
    @Id
    private String herbsId;
    private String herbsName;
    private String herbsNameCategory;
    private String herbsDescription;
    private String herbsDescriptionCategory;
    private String herbsApplication;
    private String herbsApplicationCategory;
    private String userId;

    public HerbsItem(Object o, String herbsName, String herbsNameCategory, String herbsDescription, String herbsDescriptionCategory, String herbsApplication, String herbsApplicationCategory) {
    }
}
