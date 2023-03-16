package project2.SAYO.global.auth.userDetails;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import project2.SAYO.domain.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;


@Getter
public class AuthUser extends User implements UserDetails {

	private Long id;
	private String email;
	private String password;
	private List<String> roles;

	private AuthUser(User user) {
		this.id = user.getId();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.roles = user.getRoles();
	}

	private AuthUser(Long id, String email, List<String> roles) {
		this.id = id;
		this.email = email;
		this.password = "";
		this.roles = roles;
	}

	public static AuthUser of(User user) {
		return new AuthUser(user);
	}

	public static AuthUser of(Long id, String email, List<String> roles) {
		return new AuthUser(id, email, roles);
	}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return roles.stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role))
				.collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
