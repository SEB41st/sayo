package project2.SAYO.global.email.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import project2.SAYO.domain.user.entity.User;

@Getter
public class UserRegistrationApplicationEvent extends ApplicationEvent {

    private User user;

    public UserRegistrationApplicationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
