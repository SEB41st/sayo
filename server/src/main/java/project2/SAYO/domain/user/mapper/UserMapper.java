package project2.SAYO.domain.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(source = "nickname", target = "profile.nickname")
    User userPostDtoToUser(UserDto.Post postRequest);

    @Mapping(source = "nickname", target = "profile.nickname")
    @Mapping(source = "address", target = "profile.address")
    @Mapping(source = "image", target = "profile.image")
    @Mapping(source = "introduction", target = "profile.introduction")
    User userPatchDtoToUser(UserDto.Patch patchRequest);

    @Mapping(source = "profile.nickname", target = "nickname")
    @Mapping(source = "roles", target = "role")
    UserDto.PostResponse userToPostResponse(User user);

    @Mapping(source = "profile.nickname", target = "nickname")
    @Mapping(source = "profile.address", target = "address")
    @Mapping(source = "profile.image", target = "image")
    @Mapping(source = "profile.introduction", target = "introduction")
    UserDto.PatchResponse userToPatchResponse(User user);

    @Mapping(source = "profile.nickname", target = "profile.nickname")
    @Mapping(source = "profile.address", target = "profile.address")
    @Mapping(source = "profile.image", target = "profile.image")
    @Mapping(source = "profile.introduction", target = "profile.introduction")
    @Mapping(source = "roles", target = "role")
    default UserDto.GetResponse userToGetResponse(User user){
        return UserDto.GetResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .profile(user.getProfile())
                .role(user.getRoles())
                .addressList(user.getAddress())
                .createdAt(user.getCreatedAt())
                .modifiedAt(user.getModifiedAt())
                .userStatus(user.getUserStatus())
                .build();
    }

    //User userPreModifyToUser(UserDto.PrevModify prevModifyRequest);

    default List<UserDto.GetResponse> userListToUserResponseList(List<User> userList){

        return userList.stream()
                .map(this::userToGetResponse).collect(Collectors.toList());
    }


}
