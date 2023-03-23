package project2.SAYO.domain.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.mapper.UserMapper;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.fileupload.AwsS3Path;
import project2.SAYO.global.fileupload.ImageUploadService;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    private final ImageUploadService awsS3Service;

    // TODO POST
    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post postRequest) {
        User userForService = userMapper.userPostDtoToUser(postRequest);
        User userForResponse = userService.createUser(userForService);
        UserDto.PostResponse postResponse = userMapper.userToPostResponse(userForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(postResponse), HttpStatus.CREATED);
    }

    @PostMapping("/{user-id}/uploads")
    public ResponseEntity uploadProfileImage(@RequestParam MultipartFile file,
                                             @Positive @PathVariable("user-id") Long userId,
                                             @LoginUserId Long loginUserId){

        userService.verifiedUserId(userId, loginUserId);
        String url = awsS3Service.StoreImage(file, AwsS3Path.PROFILEIMAGE);

        return new ResponseEntity<>(new SingleResponseDto<>(url), HttpStatus.CREATED);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request,
                                  HttpServletResponse response) {
        // @CookieValue(value = "refreshToken", required = false) String refreshToken // 쿠키사용

        userService.reissueAccessToken(request,response);
        return new ResponseEntity<>(new SingleResponseDto<>("Access Token 재발급 완료!"),HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // @CookieValue(value = "refreshToken", required = false) String refreshToken // 쿠키사용
        userService.logout(request);
        return new ResponseEntity<>(new SingleResponseDto<>("로그아웃에 성공하였습니다."), HttpStatus.NO_CONTENT);
    }

    // TODO PATCH
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@RequestBody UserDto.Patch patchRequest,
                                    @Positive @PathVariable("user-id") Long userId,
                                    @LoginUserId Long loginUserId){
        userService.verifiedUserId(userId, loginUserId);
        User userForService  = userMapper.userPatchDtoToUser(patchRequest);
        User userForResponse = userService.updateUser(userForService, userId);
        UserDto.PatchResponse patchResponse = userMapper.userToPatchResponse(userForResponse);
        return new ResponseEntity<>(new SingleResponseDto<>(patchResponse), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@Positive @PathVariable("user-id") Long userId) {
        User uerForResponse = userService.findVerifiedUser(userId);
        UserDto.GetResponse getResponse = userMapper.userToGetResponse(uerForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(getResponse), HttpStatus.OK);
    }
    @GetMapping("/{user-id}/mypage")
    public ResponseEntity getMyUser(@Positive @PathVariable("user-id") Long userId,
                                    @LoginUserId Long loginUserId){

        userService.verifiedUserId(userId, loginUserId);
        User verifiedUser = userService.findVerifiedUser(userId);
        UserDto.GetResponse getResponse = userMapper.userToGetResponse(verifiedUser);

        return new ResponseEntity<>(new SingleResponseDto<>(getResponse), HttpStatus.OK);
    }

    @GetMapping("/token")
    public ResponseEntity giveMemberInfo(@LoginUserId Long userId) {

        log.info("token -------");
        User user = userService.findVerifiedUser(userId);
        UserDto.PostResponse response = userMapper.userToPostResponse(user);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ALL
//    @PostMapping("/usersAll")
//    @GetMapping("/usersAll")
    @GetMapping
    public ResponseEntity getUsersAll() {
        System.out.println("1111111111111111111111111111111111111111111111111111111");
        log.info("1111111111111111111111");
        List<User> userList = userService.findUsers();
        log.info("2222222222222222222222222222222");
        List<UserDto.GetResponse> responseList = userMapper.userListToUserResponseList(userList);
        log.info("## responseList = {}", responseList);
         return new ResponseEntity<>(new SingleResponseDto<>(responseList),HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@Positive @PathVariable("user-id") Long userId,
                                     @LoginUserId Long loginUserId){
        userService.verifiedUserId(userId, loginUserId);
        userService.deleteUser(userId);

        return new ResponseEntity<>(("회원탈퇴가 완료되었습니다"),HttpStatus.NO_CONTENT);
    }

}
