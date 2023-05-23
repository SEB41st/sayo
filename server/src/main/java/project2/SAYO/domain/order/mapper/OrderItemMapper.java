package project2.SAYO.domain.order.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.order.dto.OrderItemDto;
import project2.SAYO.domain.order.entity.OrderItem;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    /*default OrderItem orderRequestToOrder(OrderItemDto.Request request){
        return OrderItem.builder()
                .orderStatus(request.getOrderStatus())
                .orderPrice(request.getOrderPrice())
                .waybillNumber(request.getWaybillNumber())
                .build();
    }*/
    default OrderItemDto.Response orderToOrderResponse(OrderItem orderItem){
        return OrderItemDto.Response.builder()
                .orderItemId(orderItem.getOrderItemId())
                .itemId(orderItem.getItemId())
                .itemName(orderItem.getItemName())
                .itemPicture(orderItem.getItemPicture())
                .itemCount(orderItem.getItemCount())
                .totalCount(orderItem.getTotalCount())
                .itemTotalPrice(orderItem.getItemTotalPrice())
                .orderStatus(orderItem.getOrderStatus())
                //.waybillNumber(orderItem.getWaybillNumber())
                .userId(orderItem.getUser().getId())
                .createdAt(orderItem.getCreatedAt())
                .modifiedAt(orderItem.getModifiedAt())
                .build();
    }
    List<OrderItemDto.Response> orderListToOrderResponseList(List<OrderItem> orderList);
}
