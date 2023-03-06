package project2.SAYO.domain.item.controller;

import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.item.dto.ItemDto;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.mapper.ItemMapper;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    /*추후 회원 Security 관련 코드 추가 필요*/

    private final ItemService itemService;
    private final ItemMapper mapper;

    // item 등록
    @PostMapping
    public ResponseEntity postItem(@Valid @RequestBody ItemDto.ItemPost postRequest){

        Item item = mapper.itemPostDtoToItem(postRequest);
        Item itemResponse = itemService.createItem(item);
        ItemDto.ItemResponse response = mapper.itemToItemResponseDto(itemResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // item 수정
    @PatchMapping("/{item-id}")
    public ResponseEntity patchItem(@Valid @PathVariable("item-id") @Positive Long itemId,
                                    @RequestBody ItemDto.ItemPatch patchRequest){
        Item itemForService = mapper.itemPatchDtoToItem(patchRequest);
        itemForService.addItemId(itemId);
        Item itemResponse = itemService.updateItem(itemForService);
        ItemDto.ItemResponse response = mapper.itemToItemResponseDto(itemResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // item 1개 조회
    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@Valid @PathVariable("item-id") @Positive Long itemId){
        Item findItem = itemService.findVerifiedItem(itemId);
        return new ResponseEntity(new SingleResponseDto<>(findItem), HttpStatus.OK);
    }

    // item 전체 조회
    @GetMapping
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<Item> itemPage = itemService.findItems(page-1, size);
        List<Item> itemList = itemPage.getContent();
        List<ItemDto.ItemResponse> response = mapper.itemListToItemResponseList(itemList);

        return new ResponseEntity(new MultiResponseDto<>(response, itemPage), HttpStatus.OK);
    }

    // item 1개 게시글 삭제
    @DeleteMapping("/delete/{item-id}")
    public ResponseEntity deleteItem(@Valid @PathVariable("item-id") @Positive Long itemId){
        itemService.deleteItem(itemId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // item 전체 게시글 삭제
    @DeleteMapping("/delete")
    public ResponseEntity deleteItems(){
        itemService.deleteItems();
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // item 1개 판매 종료로 상태 변경
    @DeleteMapping("{item-id}")
    public ResponseEntity endItem(@Valid @PathVariable("item-id") @Positive Long itemId){
        itemService.endItem(itemId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
