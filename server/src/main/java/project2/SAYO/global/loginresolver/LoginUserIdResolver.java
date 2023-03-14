package project2.SAYO.global.loginresolver;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import project2.SAYO.global.auth.userDetails.AuthUser;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

/*
 * WebConfig에서 addArgumentResolvers(); 메서드에 추가할 것
 * */
public class LoginUserIdResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        boolean hasLoginMemberIdAnnotation = parameter.hasParameterAnnotation(LoginUserId.class);
        boolean hasLongType = Long.class.isAssignableFrom(parameter.getParameterType());
        return hasLoginMemberIdAnnotation && hasLongType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal == "anonymousUser") {
            throw new BusinessLogicException(ExceptionCode.ANONYMOUS_USER);
            //return -1L;
        }

        AuthUser castedPrincipal = (AuthUser) principal;

        return castedPrincipal.getId();
    }
}
