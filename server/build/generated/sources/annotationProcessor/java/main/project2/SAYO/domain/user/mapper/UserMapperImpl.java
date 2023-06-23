package project2.SAYO.domain.user.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.Profile;
import project2.SAYO.domain.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-22T11:24:31+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(UserDto.Post postRequest) {
        if ( postRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.profile( postToProfile( postRequest ) );
        user.email( postRequest.getEmail() );
        user.password( postRequest.getPassword() );

        return user.build();
    }

    @Override
    public User userPatchDtoToUser(UserDto.Patch patchRequest) {
        if ( patchRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.profile( patchToProfile( patchRequest ) );

        return user.build();
    }

    @Override
    public UserDto.PostResponse userToPostResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.PostResponse.PostResponseBuilder postResponse = UserDto.PostResponse.builder();

        postResponse.nickname( userProfileNickname( user ) );
        List<String> list = user.getRoles();
        if ( list != null ) {
            postResponse.role( new ArrayList<String>( list ) );
        }
        postResponse.id( user.getId() );
        postResponse.email( user.getEmail() );
        postResponse.createdAt( user.getCreatedAt() );
        postResponse.modifiedAt( user.getModifiedAt() );

        return postResponse.build();
    }

    @Override
    public UserDto.PatchResponse userToPatchResponse(User user) {
        if ( user == null ) {
            return null;
        }

        String nickname = null;
        String address = null;
        String image = null;
        String introduction = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        nickname = userProfileNickname( user );
        address = userProfileAddress( user );
        image = userProfileImage( user );
        introduction = userProfileIntroduction( user );
        createdAt = user.getCreatedAt();
        modifiedAt = user.getModifiedAt();

        UserDto.PatchResponse patchResponse = new UserDto.PatchResponse( nickname, address, image, introduction, createdAt, modifiedAt );

        return patchResponse;
    }

    protected Profile postToProfile(UserDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setNickname( post.getNickname() );

        return profile;
    }

    protected Profile patchToProfile(UserDto.Patch patch) {
        if ( patch == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setNickname( patch.getNickname() );
        profile.setAddress( patch.getAddress() );
        profile.setImage( patch.getImage() );
        profile.setIntroduction( patch.getIntroduction() );

        return profile;
    }

    private String userProfileNickname(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String nickname = profile.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }

    private String userProfileAddress(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String address = profile.getAddress();
        if ( address == null ) {
            return null;
        }
        return address;
    }

    private String userProfileImage(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String image = profile.getImage();
        if ( image == null ) {
            return null;
        }
        return image;
    }

    private String userProfileIntroduction(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String introduction = profile.getIntroduction();
        if ( introduction == null ) {
            return null;
        }
        return introduction;
    }
}
