package project2.SAYO.domain.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());
        // makeSecretPassword(user);
        // createRoles(user);

        User savedUser = userRepository.save(user);

        return savedUser;
    }

    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        // todo getCurrentUser

        User updateUser = beanUtils.copyNonNullProperties(user, findUser);

        // todo password encoder update password

        return userRepository.save(updateUser);
    }

    public User findUser(Long userId) {
        return findVerifiedUser(userId);
    }

    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("userId").descending()));
    }


    public void verifiedUserId(Long userId, Long loginUserId){
        if(userId.longValue() != loginUserId.longValue()){
            log.info("userId = {}, loginUserId = {}",userId,loginUserId);
            // throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_SAME);
        }
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User findVerifiedUser(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public void deleteUser(Long userId) {
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

}
