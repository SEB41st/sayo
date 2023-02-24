package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.order.dto.OrderDto;
import project2.SAYO.domain.order.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order orderRequestToOrder(OrderDto.OrderRequest orderRequest);
    OrderDto.OrderResponse orderToOrderResponse(Order order);
    List<OrderDto.OrderResponse> orderListToOrderResponseList(List<Order> orderList);
}
