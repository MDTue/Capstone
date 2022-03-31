package capstone.herbs.plants;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HerbsRepository extends MongoRepository<HerbsItem, String> {
    Collection<HerbsItem> findAllByHerbsName(String herbsName);
}
