package capstone.herbs.plants;

import java.util.List;

public class HerbsService {
    private final HerbsRepository herbsRepository;

    public HerbsService(HerbsRepository herbsRepository) {
        this.herbsRepository = herbsRepository;
    }

    public void createHerbsItem(HerbsItem newHerb) {
        herbsRepository.save(newHerb);
    }

    public List<HerbsItem> getAllHerbs() {
        List<HerbsItem> allHerbs = herbsRepository.findAll();
        return allHerbs;
    }
}