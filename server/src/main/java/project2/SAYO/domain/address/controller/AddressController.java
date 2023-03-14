package project2.SAYO.domain.address.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.address.dto.AddressDto;
import project2.SAYO.domain.address.entity.Address;
import project2.SAYO.domain.address.mapper.AddressMapper;
import project2.SAYO.domain.address.service.AddressService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/addresses")
public class AddressController {
    private final AddressService addressService;
    private final AddressMapper addressMapper;


    // TODO POST
    @PostMapping
    public ResponseEntity postAddress(@LoginUserId Long userId,
                                      @Valid @RequestBody AddressDto.Post postRequest) {
        Address addressForService = addressMapper.addressPostToAddress(postRequest);
        Address addressForResponse = addressService.createAddress(addressForService, userId);
        AddressDto.Response response = addressMapper.addressToAddressResponse(addressForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/{address-id}")
    public ResponseEntity patchAddress(@Positive @PathVariable("address-id") Long addressId,
                                       @LoginUserId Long userId,
                                       @Valid @RequestBody AddressDto.Patch patchRequest) {
        Address addressForService = addressMapper.addressPatchToAddress(patchRequest);
        Address addressForResponse = addressService.updateAddress(addressForService,addressId,userId);
        AddressDto.Response response = addressMapper.addressToAddressResponse(addressForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{address-id}")
    public ResponseEntity getAddress(@Positive @PathVariable("address-id") Long addressId) {
        Address addressForResponse = addressService.findAddress(addressId);
        AddressDto.Response response = addressMapper.addressToAddressResponse(addressForResponse);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getAddresses(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Address> addressPage = addressService.findAddresses(page - 1, size);
        List<Address> addressList = addressPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                addressMapper.addressListToResponseList(addressList), addressPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{address-id}")
    public ResponseEntity deleteAddress(@Positive @PathVariable("address-id") Long addressId, @LoginUserId Long userId) {
        addressService.deleteAddress(userId, addressId);

        return new ResponseEntity<>(("주소삭제가 완료되었습니다"), HttpStatus.NO_CONTENT);
    }

}
