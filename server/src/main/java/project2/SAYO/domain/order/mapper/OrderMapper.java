package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.order.dto.OrderDto;
import project2.SAYO.domain.order.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order orderRequestToOrder(OrderDto.Request request);
    OrderDto.Response orderToOrderResponse(Order order);
    List<OrderDto.Response> orderListToOrderResponseList(List<Order> orderList);
}
