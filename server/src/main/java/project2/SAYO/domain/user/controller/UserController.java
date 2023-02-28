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
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;
import org.springframework.http.HttpHeaders;

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
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post postRequest) {
        User userForService = userMapper.userPostDtoToUser(postRequest);
        User userForResponse = userService.createUser(userForService);
        UserDto.Response response = userMapper.userToUserResponse(userForResponse);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@RequestBody UserDto.Patch patchRequest,
                                    @PathVariable("user-id") Long userId) {

        User userForService  = userMapper.userPatchDtoToUser(patchRequest);
        // userForService.setUserId(userId);
        User userForResponse = userService.updateUser(userForService);
        UserDto.Response response = userMapper.userToUserResponse(userForResponse);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@Valid @RequestBody UserDto.Reissue reissue) {
        // validation check
        reissue.setAccessToken(reissue.getAccessToken().replace("Bearer ",""));
        UserDto.TokenInfo tokenInfo = userService.reissue(reissue);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer " +tokenInfo.getAccessToken());
        headers.set("RefreshToken",tokenInfo.getRefreshToken());
        return new ResponseEntity<>(headers,HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Valid @RequestBody UserDto.Logout logout) {
        // validation check
        logout.setAccessToken(logout.getAccessToken().replace("Bearer ",""));
        userService.logout(logout);
        return new ResponseEntity<>("/members/login",HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") Long userId) {
        User uerForResponse = userService.findUser(userId);
        UserDto.Response response = userMapper.userToUserResponse(uerForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<User> userPage = userService.findUsers(page -1, size);
        List<User> userList = userPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                userMapper.userListToUserResponseList(userList), userPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteOneUser(@PathVariable("user-id") Long userId){
        userService.deleteUser(userId);

        return new ResponseEntity<>(("회원탈퇴가 완료되었습니다"),HttpStatus.NO_CONTENT);
    }
    @PostMapping("/prevModify")
    public ResponseEntity postPrevModify(@Valid @RequestBody UserDto.PrevModify prevRequest) {
        log.info("## prevModify = {}", prevRequest);
        boolean check = userService.prevModify(userService.getCurrentUser().getPassword(), prevRequest.getPassword());
        if(check){
            log.info("pw 재확인 완료");
            return new ResponseEntity(HttpStatus.OK);
        }else{
            log.info("pw 재확인 필요");
            return  new ResponseEntity(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
    }
}
