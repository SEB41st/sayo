package project2.SAYO.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Principal {
    private String email;
    private Long userId;

}
