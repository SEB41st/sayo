package project2.SAYO.domain.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.service.CategoryService;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.repository.ItemRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

import static project2.SAYO.domain.item.entity.Item.ItemStatus.ITEM_END;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CustomBeanUtils<Item> beanUtils;
    private final UserService userService;
    private final CategoryService categoryService;

    // 중복 조건(ex. email)이 따로 없어서 바로 저장
    // item 등록
    public Item createItem(Long userId, Item item, long categoryId){

        //현재 User을 가져와 저장
        User user = userService.findVerifiedUser(userId);
        item.addUser(user);

        //카테고리 가져와 저장
        Category category = categoryService.findCategory(categoryId);
        item.addCategory(category);

        return itemRepository.save(item);
    }

    // itemId에 해당하는 item 수정
    public Item updateItem(Long userId, Item item){
        Item findItem = findVerifiedItem(item.getItemId()); // item 존재 여부 확인

        // Item의 User가 현재 User와 동일할 경우 수정 가능
        // User user = userService.findVerifiedUser(findItem.getUser().getId());
        if(!findItem.getUser().getId().equals(userId)){
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        Item updateItem = beanUtils.copyNonNullProperties(item, findItem);
        updateItem.changeItemStatus(item.getItemStatus());

        //카테고리 가져와 저장
        Category category = categoryService.findCategory(categoryId);
        updateItem.addCategory(category);


        return itemRepository.save(updateItem);
    }

    // itemId 1개 조회는 findVerifiedItem로 처리

    // 전체 item 조회
    public Page<Item> findItems(int page, int size){
        return itemRepository.findAll(PageRequest.of(page, size, Sort.by("itemId").ascending()));
    }

    // itemId 1개 게시글 삭제
    public void deleteItem(Long userId, Long itemId){
        Item findItem = findVerifiedItem(itemId); // item 존재 여부 확인

        // Item의 User가 현재 User와 동일할 경우 삭제 가능
        // User user = userService.findVerifiedUser(findItem.getUser().getId());
        if(!findItem.getUser().getId().equals(userId)){
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        itemRepository.deleteById(itemId);
    }

    // 전제 item 게시글 삭제
    public void deleteItems(){
        itemRepository.deleteAll();
    }

    // item 1개 공동 구매 종료
    public void endItem(Long userId, Long itemId){
        Item findItem = findVerifiedItem(itemId);

        // Item의 User가 현재 User와 동일할 경우 삭제 가능
        // User user = userService.findVerifiedUser(findItem.getUser().getId());
        if(!findItem.getUser().getId().equals(userId)){
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        findItem.changeItemStatus(ITEM_END); // 공동 구매 종료로 상태 변경
        itemRepository.save(findItem);
    }

    // item 존재 여부 확인 후 없을 경우 Exception, 있을 경우 item 리턴
    public Item findVerifiedItem(long itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        Item findItem = item.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));

        return findItem;
    }
}
