package project2.SAYO.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.address.entity.Address;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
