package capstone.herbs.plants;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface HerbsRepository extends MongoRepository<HerbsItem, String> {
 //   List<HerbsItem> findAllByHerbsNameAndHerbsOkTrue(String herbsName);

    List<HerbsItem> findAllByHerbsApplicationCategoryAndHerbsOkTrue(String categoryApplication, Sort herbsName);

    List<HerbsItem> findAllByHerbsDescriptionCategoryAndHerbsOkTrue(String categoryDescription, Sort herbsName);

    List<HerbsItem> findAllByHerbsOkFalse(Sort herbsName);

    List<HerbsItem> findAllByHerbsOkTrue(Sort herbsName);
}
