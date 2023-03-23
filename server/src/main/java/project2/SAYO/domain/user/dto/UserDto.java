package project2.SAYO.domain.user.dto;

import project2.SAYO.domain.user.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import java.time.LocalDateTime;
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
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String nickname;
        private String address;
        private String image;
        private String introduction;
    }

    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        private Long id;
        private String email;
        private String role;
        private List<Profile> profile;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
      /*  private Double latitude;
        private Double longitude;
*/
        @Builder
        public GetResponse(Long id, String email, List<String> role, Profile profile, LocalDateTime createdAt, LocalDateTime modifiedAt/*,
                           Double latitude, Double longitude*/){
            this.id = id;
            this.email = email;
            this.role = role.get(0);
            this.profile = List.of(profile);
/*            this.latitude = latitude;
            this.longitude = longitude;*/
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PostResponse {
        private Long id;
        private String email;
        private String nickname;
        private String role;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        @Builder
        public PostResponse(Long id, String email, String nickname, List<String> role, LocalDateTime createdAt, LocalDateTime modifiedAt){
            this.id = id;
            this.email = email;
            this.nickname = nickname;
            this.role = role.get(0);
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        private String nickname;
        private String address;
        private String image;
        private String introduction;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
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
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
