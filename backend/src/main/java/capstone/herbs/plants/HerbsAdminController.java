package capstone.herbs.plants;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items/admin")
@CrossOrigin
@RequiredArgsConstructor

public class HerbsAdminController {
    private final HerbsService herbsService;

    @GetMapping()
    public List<HerbsItemDTO> listHerbsNotConfirmed(){
        return herbsService.getAllHerbsNotConfirmed().stream()
                .map(herbsItem -> HerbsItemDTO.of(herbsItem))
                .toList();
    }
    @PutMapping("/{id}")
    public List<HerbsItemDTO> confirmHerb(@PathVariable String id){
        herbsService.confirmHerbsItem(id);
        return herbsService.getAllHerbs().stream()
                .map(herbsItem -> HerbsItemDTO.of(herbsItem))
                .toList();
    }

}
