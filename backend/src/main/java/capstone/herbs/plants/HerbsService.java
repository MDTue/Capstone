package capstone.herbs.plants;

import org.springframework.data.domain.Sort;
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

    public void changeHerbsItem(HerbsItem herbsItem){
       herbsRepository.save(herbsItem);
    }

    public List<HerbsItem> getAllHerbs() {
        List<HerbsItem> allHerbs = herbsRepository.findAll(Sort.by("herbsName"));
        return allHerbs;
    }

    public List<HerbsItem> herbsToEdit(String herbsName) {
        List<HerbsItem> allHerbsByName = herbsRepository.findAllByHerbsName(herbsName);
        return allHerbsByName;
    }

    public void deleteHerbsItem(String id) {
        herbsRepository.deleteById(id);
    }

    public List<HerbsItem> getAllHerbsByCategory(String categoryApplication) {
        List<HerbsItem> allHerbsByCategoryApplication = herbsRepository.findAllByHerbsApplicationCategory(categoryApplication);
        return allHerbsByCategoryApplication;
    }
}