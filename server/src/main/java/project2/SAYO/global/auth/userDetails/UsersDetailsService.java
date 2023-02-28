package project2.SAYO.global.auth.userDetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.global.auth.authority.CustomAuthorityUtils;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.Collection;
import java.util.Optional;

@Component
public class UsersDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;

    public UsersDetailsService(UserRepository userRepository, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UsersDetails(findUser);
    }

    private final class UsersDetails extends User implements UserDetails {
        // (1)
        UsersDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}

/*
# 전체 개요

## 부분 설명
- (1)
: UserDetailsService 를 그대로 이용하지 않고 Custom 하기 위해서 `implements`키워드 사용.
: 추상 메서드를 필수로 구현해야함. (3)에서 진행

- (2)
: DB 조회를 위한 Repository 와 조회한 사용자 정보에 권한을 생성하기 위한 AuthorityUtils(Custom) DI

- (3)
: 필수 추상 메서드(loadUserByUsername)를 구현하는 부분
: 크리덴셜(name => email)을 이용하여 DB 에서 사용자 정보를 조회하고 UserDetails(UserDetails)형태로 반환
: UserDetails(UserDetails)는 (4)에서 내부 클래스로 구현 예정.

- (4)
: `Custom UserDetails`역할을 하는 내부 클래스
: `User`클래스를 상속받기 때문에 User 객체를 사용할 수 있음. (생성자, Getter, Setter 등)
: `UserDetails`인터페이스를 구현하기 때문에 필수로 추상 메서드를 구현해야함.
: 사용자 정보에 권한을 조회하기 위한 `getAuthorities()`와 크리덴셜(name)을 조회하는 `getName()`만 구현하고, 나머진 적당히 처리(return true)

- (4-1)
: userId(식별자), email(name), password, roles 를 인자로 하는 생성자.
: 위 4개의 정보를 담는 UserDetails 로 설정하는 부분

- (4-2)
: User 객체의 필드인 Roles 은 List<String> 이다.
: 문자열로 저장된 필드에서, Spring Security 에서 사용될 실제 권한을 부여하는 메서드가 (4-2)이다.
: 해당 과정에서 DI 로 설정한 AuthorityUtils 를 사용한다.

- (4-3)
: User 의 name 을 조회하는 메서드
: getEmail 을 사용할 수 있는 이유는 User 를 상속받기 때문.

- (4-4)
: 이후에 공부
 */
