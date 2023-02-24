package project2.SAYO.domain.user.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post postRequest);

    User userPatchDtoToUser(UserDto.Patch patchRequest);

    UserDto.Response userToUserResponse(User user);


    List<UserDto.Response> userListToUserResponseList(List<User> userList);
}
