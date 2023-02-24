package project2.SAYO.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
