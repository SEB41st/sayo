package project2.SAYO.domain.category.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long categoryId;

    @Column(length = 30, nullable = false)
    private String categoryName;

    @JsonManagedReference
    @OneToMany(mappedBy = "parent")
    private List<Category> children = new ArrayList<>();

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category parent;

    @OneToMany(mappedBy = "itemId")
    private List<Item> itemList = new ArrayList<>();

    public Category(String categoryName, Category parent) {
        this.categoryName = categoryName;
        this.parent = parent;
    }
}
