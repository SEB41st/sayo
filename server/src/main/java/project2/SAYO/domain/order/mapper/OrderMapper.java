package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.order.dto.OrderResponseDto;
import project2.SAYO.domain.order.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    default OrderResponseDto orderToOrderResponseDto(Order order){
        return OrderResponseDto.builder()
                .orderCode(order.getOrderCode())
                .OrderName(order.getOrderName())
                .id(order.getId())
                .createdAt(order.getCreatedAt())
                .modifiedAt(order.getModifiedAt())
                .build();
    };
    //OrderResponseDto orderToOrderResponseDto(Order order);
    List<OrderResponseDto> orderListToOrderResponseList(List<Order> order);

}
