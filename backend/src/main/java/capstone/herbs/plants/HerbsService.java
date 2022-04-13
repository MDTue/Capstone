package capstone.herbs.plants;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    public void deleteHerbsItem(String id) {
        herbsRepository.deleteById(id);
    }

    public List<HerbsItem> getAllHerbsByCategory(String categoryApplication) {
        List<HerbsItem> allHerbsByCategoryApplication = herbsRepository.findAllByHerbsApplicationCategory(categoryApplication, Sort.by("herbsName"));
        return allHerbsByCategoryApplication;
    }
    public List<HerbsItem> getAllHerbsByCategoryDescription(String categoryDescription) {
        List<HerbsItem> allHerbsByCategoryDescription = herbsRepository.findAllByHerbsDescriptionCategory(categoryDescription, Sort.by("herbsName"));
        return allHerbsByCategoryDescription;
    }

}