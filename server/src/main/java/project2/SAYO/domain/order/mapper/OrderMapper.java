package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.order.dto.OrderDto;
import project2.SAYO.domain.order.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    default Order orderRequestToOrder(OrderDto.Request request){
        return Order.builder()
                .orderStatus(request.getOrderStatus())
                .orderPrice(request.getOrderPrice())
                .waybillNumber(request.getWaybillNumber())
                .build();
    }
    default OrderDto.Response orderToOrderResponse(Order order){
        return OrderDto.Response.builder()
                .orderId(order.getOrderId())
                .orderPrice(order.getOrderPrice())
                .orderStatus(order.getOrderStatus())
                .waybillNumber(order.getWaybillNumber())
                .userId(order.getUser().getId())
                // .itemId(order.getItemId())
                .createdAt(order.getCreatedAt())
                .modifiedAt(order.getModifiedAt())
                .build();
    }
    List<OrderDto.Response> orderListToOrderResponseList(List<Order> orderList);
}
