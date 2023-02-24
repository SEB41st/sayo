package project2.SAYO.domain.user.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post userPostDto);

    User userPatchDtoToUser(UserDto.Patch userPatchDto);

    UserDto.PostResponse userToPostResponse(User user);

    UserDto.PatchResponse userToPatchResponse(User user);

    UserDto.GetResponse userToGetResponse(User user);

    List<UserDto.GetResponse> userListToUserResponseList(List<User> userList);
}
