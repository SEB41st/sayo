package project2.SAYO.domain.order.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.order.dto.OrderResponseDto;
import project2.SAYO.domain.order.entity.Order;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-29T10:13:14+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public List<OrderResponseDto> orderListToOrderResponseList(List<Order> order) {
        if ( order == null ) {
            return null;
        }

        List<OrderResponseDto> list = new ArrayList<OrderResponseDto>( order.size() );
        for ( Order order1 : order ) {
            list.add( orderToOrderResponseDto( order1 ) );
        }

        return list;
    }
}
