package project2.SAYO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SayoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SayoApplication.class, args);
	}

}
