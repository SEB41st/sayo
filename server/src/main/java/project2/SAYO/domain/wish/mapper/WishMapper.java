package project2.SAYO.domain.wish.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.wish.dto.WishDto;
import project2.SAYO.domain.wish.entity.Wish;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface WishMapper {
    WishDto.Response wishToWishResponse(Wish wish);

    default List<WishDto.Response> WishListToWishResponseList(List<Wish> wishList) {

        return wishList.stream()
                .map(this::wishToWishResponse).collect(Collectors.toList());
    }
}
