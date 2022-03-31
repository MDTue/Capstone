package capstone.herbs.plants;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
@RequiredArgsConstructor
public class HerbsController {
    private final HerbsService herbsService;
    //private final HerbsRepository herbsRepository

    @GetMapping
    public List<HerbsItem> listAllHerbs(){
        return herbsService.getAllHerbs();
    }

    @PostMapping
    public List<HerbsItem> createHerbsItem(@RequestBody HerbsItem newHerb){
        herbsService.createHerbsItem(newHerb);
        return herbsService.getAllHerbs();
    }
}
