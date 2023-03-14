package project2.SAYO.global.email.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.email.EmailService;

@Slf4j
@Component
@EnableAsync
@Configuration
@RequiredArgsConstructor
public class UserRegistrationEventListener {

    @Value("${mail.subject.member.registration}")
    private String subject;

    @Value("${mail.template.name.member.join}")
    private String templateName;

    private final EmailService emailService;
    private final UserService userService;

    @Async
    @EventListener
    public void listen(UserRegistrationApplicationEvent event) throws Exception {

        try {

            String[] to = new String[]{event.getUser().getEmail()};
            String message = event.getUser().getProfile().getNickname() + "님, 회원가입이 성공적으로 완료되었습니다.";
            emailService.sendEmail(to, subject, message, templateName);

        } catch (MailSendException e) {

            log.error("이메일 보내기에 실패하였습니다.");
            userService.emailVerifyFailed(event.getUser().getId());
        }
    }
}
