package project2.SAYO.domain.wish.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.user.entity.User;
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

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    public void addUser(User user) {
        this.user = user;
    }

    public void addItem(Item item) {
        this.item = item;
    }

    public void ChangeWishSelected(boolean wishSelected) {
        this.wishSelected = wishSelected;
    }
}
