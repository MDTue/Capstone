package capstone.herbs.plants;

import capstone.herbs.user.UserRepository;
import capstone.herbs.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/items")
@CrossOrigin
@RequiredArgsConstructor
public class HerbsController {
    private final HerbsService herbsService;
    private final UserService userService;

    @GetMapping
    public List<HerbsItemDTO> listAllHerbs(){
        return herbsService.getAllHerbs().stream()
                .map(herbsItem -> HerbsItemDTO.of(herbsItem))
                .toList();
    }

    @PostMapping
    public List<HerbsItemDTO> createHerbsItem(@RequestBody HerbsItemDTO newHerb){
        herbsService.createHerbsItem(newHerb.toItem());
        return listAllHerbs();
    }

}
