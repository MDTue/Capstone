package capstone.herbs.plants;

import capstone.herbs.user.UserDocument;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class HerbsService {
    private final HerbsRepository herbsRepository;

    public HerbsService(HerbsRepository herbsRepository) {
        this.herbsRepository = herbsRepository;
    }

    public void createHerbsItem(HerbsItem newHerb, UserDocument user) {
        String userRole = user.getRole();
        if (Objects.equals(userRole, "ADMIN")) {
            newHerb.setHerbsOk(true);
        }else{
            newHerb.setHerbsOk(true);
        }
        herbsRepository.save(newHerb);
    }

    public void changeHerbsItem(HerbsItem herbsItem){
       boolean status =  herbsRepository.findById(herbsItem.getHerbsId()).map(herbsItem1 -> herbsItem1.isHerbsOk()) .orElse (true);
       herbsItem.setHerbsOk(status);
       herbsRepository.save(herbsItem);
    }

    public List<HerbsItem> getAllHerbs() {
        List<HerbsItem> allHerbs = herbsRepository.findAllByHerbsOkTrue(Sort.by("herbsName"));
        return allHerbs;
    }

    public List<HerbsItem> getAllHerbsNotConfirmed() {
        List<HerbsItem> allHerbs = herbsRepository.findAllByHerbsOkFalse(Sort.by("herbsName"));
        return allHerbs;
    }

    public void deleteHerbsItem(String id) {
        herbsRepository.deleteById(id);
    }

    public List<HerbsItem> getAllHerbsByCategory(String categoryApplication) {
        List<HerbsItem> allHerbsByCategoryApplication = herbsRepository.findAllByHerbsApplicationCategoryAndHerbsOkTrue(categoryApplication, Sort.by("herbsName"));
        return allHerbsByCategoryApplication;
    }
    public List<HerbsItem> getAllHerbsByCategoryDescription(String categoryDescription) {
        List<HerbsItem> allHerbsByCategoryDescription = herbsRepository.findAllByHerbsDescriptionCategoryAndHerbsOkTrue(categoryDescription, Sort.by("herbsName"));
        return allHerbsByCategoryDescription;
    }


    public void confirmHerbsItem(String id) {
        Optional<HerbsItem> herbToConfirm =  herbsRepository.findById(id);
        if(herbToConfirm.isPresent()   ) {
            HerbsItem herbOk = herbToConfirm.get();
            herbOk.setHerbsOk(true);
            herbsRepository.save(herbOk);
        }
    }
}