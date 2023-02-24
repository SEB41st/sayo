package project2.SAYO.domain.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.mapper.UserMapper;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.response.MultiResponseDto;
import project2.SAYO.global.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    // TODO POST
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto) {
        User user = userMapper.userPostDtoToUser(userPostDto);
        User saveUser = userService.createUser(user);
        UserDto.PostResponse postResponse = userMapper.userToPostResponse(saveUser);
        return new ResponseEntity<>(new SingleResponseDto<>(postResponse), HttpStatus.CREATED);
    }


    // TODO PATCH
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@RequestBody UserDto.Patch userPatchDto,
                                    @PathVariable("user-id") Long userId) {

        User user = userMapper.userPatchDtoToUser(userPatchDto);
        // user.setUserId(userId);
        User updateUser = userService.updateUser(user);
        UserDto.PatchResponse patchResponse = userMapper.userToPatchResponse(updateUser);
        return new ResponseEntity<>(new SingleResponseDto<>(patchResponse), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") Long userId) {
        User verifiedUser = userService.findUser(userId);
        UserDto.GetResponse getResponse = userMapper.userToGetResponse(verifiedUser);

        return new ResponseEntity<>(new SingleResponseDto<>(getResponse), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getUserAll(@Positive @RequestParam int page, @Positive @RequestParam int size){
        Page<User> userPage = userService.findUsers(page -1, size);
        List<User> users = userPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                userMapper.userListToUserResponseList(users), userPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteOneMember(@PathVariable("user-id") Long userId){
        userService.deleteUser(userId);

        return new ResponseEntity<>(("회원탈퇴가 완료되었습니다"),HttpStatus.NO_CONTENT);
    }
}
