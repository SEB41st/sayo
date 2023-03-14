package project2.SAYO.domain.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(source = "nickname", target = "profile.nickname")
    @Mapping(source = "role", target = "roles")
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
    UserDto.GetResponse userToGetResponse(User user);

    //User userPreModifyToUser(UserDto.PrevModify prevModifyRequest);

    //List<UserDto.Response> userListToUserResponseList(List<User> userList);
}
