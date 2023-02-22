package project2.SAYO.domain.item;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Wish extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishId;

    @Column
    private boolean wishSelected;

//    @ManyToOne
//    @JoinColumn(name="USER_ID")
//    private User user; 유저 클래스 병합 후 연결
//
//    @ManyToOne
//    @JoinColumn(name = "ITEM_ID")
//    private Item item;
}
