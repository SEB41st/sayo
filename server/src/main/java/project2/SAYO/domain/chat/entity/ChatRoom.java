package project2.SAYO.domain.chat.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @Column(nullable = false)
    private String chatRoomName;

//    @ManyToOne
//    @JoinColumn(name="USER_ID")
//    private User user; 유저 클래스 병합 후 연결
}
