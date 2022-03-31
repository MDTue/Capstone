package capstone.herbs.plants;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HerbsService {
    private final HerbsRepository herbsRepository;

    public HerbsService(HerbsRepository herbsRepository) {
        this.herbsRepository = herbsRepository;
    }

    public void createHerbsItem(HerbsItem newHerb ) {
        herbsRepository.save(newHerb);
    }

    public List<HerbsItem> getAllHerbs() {
        List<HerbsItem> allHerbs = herbsRepository.findAll();
        return allHerbs;
    }
}