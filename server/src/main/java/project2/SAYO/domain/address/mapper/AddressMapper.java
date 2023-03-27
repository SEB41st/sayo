package project2.SAYO.domain.address.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.address.dto.AddressDto;
import project2.SAYO.domain.address.entity.Address;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AddressMapper {
    Address addressPostToAddress(AddressDto.Post postRequest);

    default Address addressPatchToAddress(AddressDto.Patch patchRequest){
        Address address = Address.builder()
                .addressName(patchRequest.getAddressName())
                .addressUserName(patchRequest.getAddressUserName())
                .phoneNumber(patchRequest.getPhoneNumber())
                .postcode(patchRequest.getPostcode())
                .roadAddress(patchRequest.getRoadAddress())
                .detailAddress(patchRequest.getDetailAddress())
                .build();

        return address;
    }

    default AddressDto.Response addressToAddressResponse(Address address){
        AddressDto.Response addressResponse = AddressDto.Response.builder()
                .addressId(address.getAddressId())
                .userId(address.getUser().getId())
                .addressName(address.getAddressName())
                .addressUserName(address.getAddressUserName())
                .phoneNumber(address.getPhoneNumber())
                .postcode(address.getPostcode())
                .roadAddress(address.getRoadAddress())
                .detailAddress(address.getDetailAddress())
                .createdAt(address.getCreatedAt())
                .modifiedAt(address.getModifiedAt())
                .build();

        return addressResponse;
    }


    List<AddressDto.Response> addressListToResponseList(List<Address> addressList);
}
