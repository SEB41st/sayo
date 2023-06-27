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
                .orderName(order.getOrderName())
                .amount(order.getAmount())
                .paymentId(order.getPaymentId())
                .id(order.getId())
                .itemList(order.getShoppingCartItemList())
                .modifiedAt(order.getModifiedAt())
                .createdAt(order.getCreatedAt())
                .build();
    };
    //OrderResponseDto orderToOrderResponseDto(Order order);
    List<OrderResponseDto> orderListToOrderResponseList(List<Order> order);

}
