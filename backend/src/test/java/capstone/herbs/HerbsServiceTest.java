package capstone.herbs;

import capstone.herbs.plants.HerbsItem;
import capstone.herbs.plants.HerbsRepository;
import capstone.herbs.plants.HerbsService;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class HerbsServiceTest {
    @Test
    void shouldCreateNewHerb(){
        HerbsItem herbsItem = new HerbsItem();
        herbsItem.setHerbsId("01");
        herbsItem.setHerbsName("Holunder");
        herbsItem.setHerbsDescription("Holunderblüten blühen weiß.");
        herbsItem.setHerbsApplication("Sirup aus den Blüten .");

        HerbsRepository dbMock = mock(HerbsRepository.class);
        HerbsService herbsService = new HerbsService(dbMock);
        herbsService.createHerbsItem(herbsItem);
        verify(dbMock).save(herbsItem);
    }
}
