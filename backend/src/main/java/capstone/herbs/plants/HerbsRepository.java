package capstone.herbs.plants;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface HerbsRepository extends MongoRepository<HerbsItem, String> {
    List<HerbsItem> findAllByHerbsName(String herbsName);
}
