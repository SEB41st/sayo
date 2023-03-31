package project2.SAYO.domain.item.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.util.List;

@RestController
@Slf4j
@Validated
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    /*추후 회원 Security 관련 코드 추가 필요*/

    private final ItemService itemService;
    private final ItemMapper mapper;

    // item 등록
    @PostMapping
    public ResponseEntity postItem(@Valid @RequestBody ItemDto.ItemPost postRequest,
                                   @LoginUserId Long userId){

        log.info("## 컨트롤러에 들어옵니다.");
        Item item = mapper.itemPostDtoToItem(postRequest);
        Item itemResponse = itemService.createItem(userId, item, postRequest.getCategoryId());
        ItemDto.ItemResponse response = mapper.itemToItemResponseDto(itemResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // item 수정
    @PatchMapping("/{item-id}")
    public ResponseEntity patchItem(@Valid @PathVariable("item-id") @Positive Long itemId,
                                    @LoginUserId Long userId,
                                    @RequestBody ItemDto.ItemPatch patchRequest){
        Item itemForService = mapper.itemPatchDtoToItem(patchRequest);
        itemForService.addItemId(itemId);
        Item itemResponse = itemService.updateItem(userId, itemForService, patchRequest.getCategoryId());
        ItemDto.ItemResponse response = mapper.itemToItemResponseDto(itemResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // item 1개 조회
    @GetMapping("/get/{item-id}")
    public ResponseEntity getItem(@Valid @PathVariable("item-id") @Positive Long itemId){
        Item findItem = itemService.findVerifiedItem(itemId);
        ItemDto.ItemResponse itemResponse = mapper.itemToItemResponseDto(findItem);
        return new ResponseEntity(new SingleResponseDto<>(itemResponse), HttpStatus.OK);
    }

    // item 전체 조회
    @GetMapping("/get")
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<Item> itemPage = itemService.findItems(page-1, size);
        List<Item> itemList = itemPage.getContent();
        List<ItemDto.ItemResponse> response = mapper.itemListToItemResponseList(itemList);

        return new ResponseEntity(new MultiResponseDto<>(response, itemPage), HttpStatus.OK);
    }

    // item 1개 게시글 삭제
    @DeleteMapping("/delete/{item-id}")
    public ResponseEntity deleteItem(@Valid @PathVariable("item-id") @Positive Long itemId,
                                     @LoginUserId Long userId){
        itemService.deleteItem(userId, itemId);
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
    public ResponseEntity endItem(@Valid @PathVariable("item-id") @Positive Long itemId,
                                  @LoginUserId Long userId){
        itemService.endItem(userId, itemId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
