package project2.SAYO.global.auth.userDetails;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
    private UserDetails createUserDetails(User user) {
        return AuthUser.of(user);
    }
}
