package project2.SAYO.domain.address.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.address.dto.AddressDto;
import project2.SAYO.domain.address.entity.Address;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AddressMapper {
    Address addressPostToAddress(AddressDto.Post postRequest);

    Address addressPatchToAddress(AddressDto.Patch patchRequest);

    AddressDto.Response addressToAddressResponse(Address address);

    List<AddressDto.Response> addressListToResponseList(List<Address> addressList);
}
