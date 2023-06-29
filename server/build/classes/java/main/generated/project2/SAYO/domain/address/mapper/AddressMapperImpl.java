package project2.SAYO.domain.address.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.address.dto.AddressDto;
import project2.SAYO.domain.address.entity.Address;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-27T11:03:23+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public List<AddressDto.Response> addressListToResponseList(List<Address> addressList) {
        if ( addressList == null ) {
            return null;
        }

        List<AddressDto.Response> list = new ArrayList<AddressDto.Response>( addressList.size() );
        for ( Address address : addressList ) {
            list.add( addressToAddressResponse( address ) );
        }

        return list;
    }
}
