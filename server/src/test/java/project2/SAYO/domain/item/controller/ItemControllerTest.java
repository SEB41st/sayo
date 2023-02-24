package project2.SAYO.domain.item.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project2.SAYO.domain.item.dto.ItemDto;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.mapper.ItemMapper;
import project2.SAYO.domain.item.service.ItemService;

import javax.print.attribute.standard.Media;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {
    @Autowired
    private MockMvc mockMvc;

    /*충돌 방지를 위해 build.gradle에 gson 추가한 부분 commit 하지 않음*/
    @Autowired
    private Gson gson;

    @MockBean
    private ItemService itemService;

    private ItemMapper mapper;

    @Test
    void postItemControllerTest() throws Exception{
        // given
        ItemDto.ItemPost post = new ItemDto.ItemPost(
                "아이스 아메리카노", "커피 그림", false, 0 ,
                1500, "커피사세요", "2월 28일", "음료", 2.2, 3.3);

        Item item = mapper.itemPostDtoToItem(post);
        item.setItemId(1L);
        given(itemService.createItem(Mockito.any(Item.class))).willReturn(item);

        String content = gson.toJson(post);

        // when
        ResultActions actions = mockMvc.perform(
                post("/item").accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/item"))));
    }

    @Test
    void patchItemControllerTest() throws Exception{
        // given

        // when

        // then
    }

    @Test
    void getItemControllerTest() throws Exception{
        // given

        // when

        // then
    }

    @Test
    void getItemsControllerTest() throws Exception{
        // given

        // when

        // then
    }

    @Test
    void deleteItemControllerTest() throws Exception{
        // given

        // when

        // then
    }

    @Test
    void deleteItemsControllerTest() throws Exception{
        // given

        // when

        // then
    }


}
