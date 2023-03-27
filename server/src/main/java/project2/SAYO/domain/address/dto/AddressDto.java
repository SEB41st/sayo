package project2.SAYO.domain.address.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


public class AddressDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "주소명칭은 공백이 없어야 합니다.")
        private String addressName;
        @NotBlank(message = "회원 이름은 공백이 없어야 합니다.")
        private String addressUserName;
        @NotBlank(message = "회원 닉네임은 공백이 없어야 합니다.")
        private String phoneNumber;
        @NotNull(message = "우편번호를 작성해야 합니다.")
        private Long postcode;
        @NotEmpty(message = "본주소를 작성해야 합니다.")
        private String roadAddress;
        @NotEmpty(message = "상세 주소를 작성해야 합니다.")
        private String detailAddress;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String addressName;
        private String addressUserName;
        private String phoneNumber;
        private Long postcode;
        private String roadAddress;
        private String detailAddress;

    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long addressId;
        private Long userId;
        private String addressName;
        private String addressUserName;
        private String phoneNumber;
        private Long postcode;
        private String roadAddress;
        private String detailAddress;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
