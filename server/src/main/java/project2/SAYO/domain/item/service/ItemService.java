package project2.SAYO.domain.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.repository.ItemRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    /*추후 회원 Security 관련 코드 추가 필요*/
    private final ItemRepository itemRepository;
    private final CustomBeanUtils<Item> beanUtils;

    // 중복 조건(ex. email)이 따로 없어서 바로 저장
    // item 등록
    public Item createItem(Item item){
        return itemRepository.save(item);
    }

    // itemId에 해당하는 item 수정
    public Item updateItem(Item item){
        Item findItem = findVerifiedItem(item.getItemId()); // item 존재 여부 확인

        Item updateItem = beanUtils.copyNonNullProperties(item, findItem);


        return itemRepository.save(updateItem);
    }

    // itemId 1개 조회
    public Item findItem(long itemId){
        return findVerifiedItem(itemId);
    }

    // 전체 item 조회
    public Page<Item> findItems(int page, int size){
        return itemRepository.findAll(PageRequest.of(page, size, Sort.by("itemId").descending()));
    }

    // itemId 1개 삭제
    public void deleteItem(long itemId){
        findVerifiedItem(itemId); // item 존재 여부 확인
        itemRepository.deleteById(itemId);
    }

    // 전제 item 삭제
    public void deleteItems(){
        itemRepository.deleteAll();
    }

    //item 존재 여부 확인 후 없을 경우 Exception, 있을 경우 item 리턴
    //충돌 방지를 위해 BisinessLogicException 및 ExceptionCode 파일은 커밋 안함
    public Item findVerifiedItem(long itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        Item findItem = item.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        return findItem;
    }
}
