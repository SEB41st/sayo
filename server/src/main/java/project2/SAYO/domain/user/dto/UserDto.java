package project2.SAYO.domain.user.dto;

import project2.SAYO.domain.user.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.user.entity.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import java.util.List;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;
        @Pattern(message = "비밀번호는 8글자이상 20글자 이하로 영어,숫자,특수문자가 1개이상 들어가야 합니다, 특수문자는!@#$%^&*만 허용", regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$")
        private String password;
//        @NotBlank(message = "회원 이름은 공백이 없어야 합니다.")
//        private String username;
//        @NotBlank(message = "회원 닉네임은 공백이 없어야 합니다.")
        private String nickname;
//        private String userPicture;

        @NotBlank(message = "권한은 공백이 아니어야 합니다.")
        private String role;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
//        private String username;
        private String nickname;
        private String address;
        private String image;
        private String introduction;
//        private String password;
//        private String userPicture;
//        private User.UserStatus userStatus;
    }

/*    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
    }*/

/*
    @Getter
    public static class Reissue {
        @NotBlank(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotBlank(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }
    }
*/
/*

    @Getter
    public static class Logout {
        @NotBlank(message = "잘못된 요청입니다.")
        private String accessToken;

        @NotBlank(message = "잘못된 요청입니다.")
        private String refreshToken;

        public void setAccessToken(String accessToken){
            this.accessToken = accessToken;
        }
    }
*/

/*
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class PrevModify {
        @NotSpace(message = "비밀 번호는 공백이 아니어야 합니다")
        private String password;
    }
*/

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String email;
        private String role;
//        private String username;
        private String nickname;
//        private String userPicture;
//        private User.UserStatus userStatus;
//        public String getUserStatus() {
//            return userStatus.getStatus();
//        }
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
  /*      @Builder
        public GetResponse(Long userId, String email, String userName, String nickName, String password, String userPicture) {
            this.userId = userId;
            this.email = email;
            this.userName = userName;
            this.nickName = nickName;
            this.password = password;
            this.userPicture = userPicture;
        }*/

    }*/

    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        private Long id;
        private String email;
        private String role;
        private List<Profile> profile;
      /*  private Double latitude;
        private Double longitude;
*/
        @Builder
        public GetResponse(Long id, String email, List<String> role, Profile profile/*,
                           Double latitude, Double longitude*/){
            this.id = id;
            this.email = email;
            this.role = role.get(0);
            this.profile = List.of(profile);
/*            this.latitude = latitude;
            this.longitude = longitude;*/
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PostResponse {
        private Long id;
        private String email;
        private String nickname;
        private String role;

        @Builder
        public PostResponse(Long id, String email, String nickname, List<String> role){
            this.id = id;
            this.email = email;
            this.nickname = nickname;
            this.role = role.get(0);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        private String nickname;
        private String address;
        private String image;
        private String introduction;
       /* private Double latitude;
        private Double longitude;*/
    }


    @Getter
    @Builder
    @AllArgsConstructor
    public static class LoginResponse {
        private Long id;
        private String email;
        private String nickname;
        private String role;
    }
}
