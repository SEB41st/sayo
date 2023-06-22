package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.order.dto.OrderResponseDto;
import project2.SAYO.domain.order.entity.Order;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    OrderResponseDto orderToOrderResponseDto(Order order);
    List<OrderResponseDto> orderListToOrderResponseList(List<Order> order);

}
