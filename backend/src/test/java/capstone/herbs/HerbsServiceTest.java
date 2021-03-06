package capstone.herbs;

import capstone.herbs.plants.HerbsItem;
import capstone.herbs.plants.HerbsRepository;
import capstone.herbs.plants.HerbsService;
import capstone.herbs.user.UserDocument;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

public class HerbsServiceTest {

    @Test
    void shouldCreateNewHerb(){
        UserDocument user = new UserDocument();
        user.setUsername("Oskar");
        user.setRole("USER");
        HerbsItem herbsItem = new HerbsItem();
        herbsItem.setHerbsId("01");
        herbsItem.setHerbsName("Holunder");
        herbsItem.setHerbsDescription("Holunderblüten blühen weiß.");
        herbsItem.setHerbsApplication("Sirup aus den Blüten .");

        HerbsRepository dbMock = mock(HerbsRepository.class);
        HerbsService herbsService = new HerbsService(dbMock);
        herbsService.createHerbsItem(herbsItem, user);
        verify(dbMock).save(herbsItem);
    }

    @Test
    void shouldFindAllHerbs(){
        HerbsItem herbsItem1 = new HerbsItem();
        herbsItem1.setHerbsId("01");
        herbsItem1.setHerbsName("A_Holunder");
        herbsItem1.setHerbsDescription("Holunderblüten blühen weiß.");
        herbsItem1.setHerbsApplication("Sirup aus den Blüten .");
        herbsItem1.setHerbsOk(true);

        HerbsItem herbsItem2 = new HerbsItem();
        herbsItem2.setHerbsId("02");
        herbsItem2.setHerbsName("B_Primel");
        herbsItem2.setHerbsDescription("Blüte gelb.");
        herbsItem2.setHerbsApplication("Tee aus Blättern.");
        herbsItem1.setHerbsOk(true);

        HerbsItem herbsItem3 = new HerbsItem();
        herbsItem3.setHerbsId("03");
        herbsItem3.setHerbsName("C_Gänseblümchen");
        herbsItem3.setHerbsDescription("Frühlingsblüher.");
        herbsItem3.setHerbsApplication("Blüten sind essbar.");
        herbsItem1.setHerbsOk(true);

        HerbsRepository herbsRepository = mock(HerbsRepository.class);
        when(herbsRepository.findAllByHerbsOkTrue(Sort.by("herbsName"))).thenReturn(List.of(herbsItem1,herbsItem2,herbsItem3));
        HerbsService herbsService = new HerbsService(herbsRepository);
        List<HerbsItem> actual = herbsService.getAllHerbs();
        assertThat(actual).isEqualTo(List.of(herbsItem1, herbsItem2, herbsItem3));
    }
}
