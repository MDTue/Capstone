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
    private String herbsId;
    private String herbsName;
    private String herbsNameCategory;
    private String herbsDescription;
    private String herbsDescriptionCategory;
    private String herbsApplication;
    private String herbsApplicationCategory;
    private boolean herbsOk;
    private String herbsPicUrl1;
    private String herbsPicUrl2;

    public HerbsItem(String herbsName, String herbsNameCategory, String herbsDescription, String herbsDescriptionCategory, String herbsApplication,
                     String herbsApplicationCategory, String picUrl1, String herbsPicUrl2) {
        this.herbsName = herbsName;
        this.herbsNameCategory = herbsNameCategory;
        this.herbsDescription = herbsDescription;
        this.herbsDescriptionCategory = herbsDescriptionCategory;
        this.herbsApplication = herbsApplication;
        this.herbsApplicationCategory = herbsApplicationCategory;
        this.herbsPicUrl1 = picUrl1;
        this.herbsPicUrl2 = herbsPicUrl2;
    }
}
