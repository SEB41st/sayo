package project2.SAYO.domain.wish.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.wish.dto.WishDto;
import project2.SAYO.domain.wish.entity.Wish;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WishMapper {
    default WishDto.Response wishToWishResponse(Wish wish){
        return WishDto.Response.builder()
                .itemId(wish.getItem().getItemId())
                .userId(wish.getUser().getId())
                .wishId(wish.getWishId())
                .wishSelected(wish.isWishSelected())
                .createdAt(wish.getCreatedAt())
                .modifiedAt(wish.getModifiedAt())
                .build();
    }

    default List<WishDto.Response> WishListToWishResponseList(List<Wish> wishList) {

        return wishList.stream()
                .map(this::wishToWishResponse).collect(Collectors.toList());
    }
}
