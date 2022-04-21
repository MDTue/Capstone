package capstone.herbs.plants;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
