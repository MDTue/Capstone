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
    private String herbsName;
    private String herbsNameCategory;
    private String herbsDescription;
    private String herbsDescriptionCategory;
    private String herbsApplication;
    private String herbsApplicationCategory;
    private List<Link> links;

    public HerbsItemDTO(String herbsName, String herbsNameCategory, String herbsDescription, String herbsDescriptionCategory, String herbsApplication, String herbsApplicationCategory) {
    }

    public static HerbsItemDTO of (HerbsItem herbsItem) {
        List<Link> links = List.of(
                Link.of("/api/items/" + herbsItem.getHerbsId(), "self")
        );
        return new HerbsItemDTO(herbsItem.getHerbsName(), herbsItem.getHerbsNameCategory(),
                                herbsItem.getHerbsDescription(), herbsItem.getHerbsDescriptionCategory(),
                                herbsItem.getHerbsApplication(), herbsItem.getHerbsApplicationCategory(),
                                links );
    }
    public HerbsItem toItem(){
        return new HerbsItem(null, herbsName, herbsNameCategory, herbsDescription, herbsDescriptionCategory,herbsApplication,herbsApplicationCategory);
    }
}
