package project2.SAYO.global.util;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ErrorResponse;
import project2.SAYO.global.exception.ExceptionCode;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Responder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

    public static void sendErrorResponse(HttpServletResponse response, ExceptionCode code) {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        throw new BusinessLogicException(code);
    }

    public static void loginSuccessResponse(HttpServletResponse response, User authUser) throws IOException {
        Gson gson = new Gson();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        UserDto.LoginResponse loginResponse = UserDto.LoginResponse.builder()
                .id(authUser.getId())
                .email(authUser.getEmail())
                .role(authUser.getRoles().get(0))
                .build();

        response.getWriter().write(gson.toJson(new SingleResponseDto<>(loginResponse),SingleResponseDto.class));
    }

}
