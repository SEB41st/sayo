package project2.SAYO.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.address.entity.Address;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long> {
    Optional<Address> findByUserId(long userId);
}
