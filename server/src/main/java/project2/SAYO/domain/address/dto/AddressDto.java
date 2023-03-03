package project2.SAYO.domain.address.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;


public class AddressDto {
    @Getter
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "주소명칭은 공백이 없어야 합니다.")
        private String addressName;
        @NotBlank(message = "회원 이름은 공백이 없어야 합니다.")
        private String addressUserName;
        @NotBlank(message = "회원 닉네임은 공백이 없어야 합니다.")
        private String phoneNumber;
        @NotEmpty(message = "상세 주소를 작성해야 합니다.")
        private String detailAddress;

    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long addressId;
        private String addressName;
        private String addressUserName;
        private String phoneNumber;
        private String detailAddress;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
