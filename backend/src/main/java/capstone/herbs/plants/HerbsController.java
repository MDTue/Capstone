package capstone.herbs.plants;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/items")
@CrossOrigin
@RequiredArgsConstructor
public class HerbsController {
    private final HerbsService herbsService;
    private final HerbsRepository herbsRepository;

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

    @PutMapping("/{id}")
    public List<HerbsItemDTO> changeHerb(@PathVariable String id, @RequestBody HerbsItemDTO herbToChange){
        herbsService.changeHerbsItem(herbToChange.toItem(id));
        return herbsService.getAllHerbs().stream()
                .map(herbsItem -> HerbsItemDTO.of(herbsItem))
                .toList();

    }

    @DeleteMapping("/{id}")
    public List<HerbsItemDTO> deleteHerb(@PathVariable String id, @RequestBody HerbsItemDTO herbToDelete){
        herbsService.deleteHerbsItem(herbToDelete.toItem(id));
        return herbsService.getAllHerbs().stream()
                .map(herbsItem -> HerbsItemDTO.of(herbsItem))
                .toList();

    }
}
