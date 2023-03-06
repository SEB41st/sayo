package project2.SAYO.domain.address.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.address.entity.Address;
import project2.SAYO.domain.address.repository.AddressRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AddressService {
    private final AddressRepository addressRepository;
    private final CustomBeanUtils<Address> beanUtils;
    private final UserService userService;

    public Address createAddress(Address address) {
        User user = userService.findUser(userService.getCurrentUser().getUserId());
        address.addUser(user);
        return addressRepository.save(address);
    }

    public Address updateAddress(Address address) {
        Address findAddress = findVerifiedAddress(address.getAddressId());
        User user = userService.findUser(userService.getCurrentUser().getUserId());
        if (userService.getCurrentUser().getUserId() != user.getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        Address updateAddress = beanUtils.copyNonNullProperties(address, findAddress);

        return addressRepository.save(updateAddress);
    }

    public Address findAddress(Long addressId) {
        return findVerifiedAddress(addressId);
    }

    public Page<Address> findAddresses(int page, int size) {
        return addressRepository.findAll(PageRequest.of(page, size, Sort.by("addressId").descending()));
    }

    public void deleteAddress(Long addressId) {
        Address findAddress = findVerifiedAddress(addressId);
        User user = userService.findVerifiedUser(findAddress.getUser().getUserId());
        if (userService.getCurrentUser().getUserId() != user.getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        addressRepository.deleteById(addressId);
    }

    public Address findVerifiedAddress(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
    }
}
