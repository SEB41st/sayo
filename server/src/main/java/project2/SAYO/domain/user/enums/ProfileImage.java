package project2.SAYO.domain.user.enums;

import lombok.Getter;

public enum ProfileImage {
    BASIC_IMAGE_ONE(1,"https://cdn-icons-png.flaticon.com/512/560/560216.png"),
    BASIC_IMAGE_TWO(2,"https://cdn-icons-png.flaticon.com/512/506/506185.png"),
    BASIC_IMAGE_THREE(3,"https://cdn-icons-png.flaticon.com/512/2922/2922561.png"),
    BASIC_IMAGE_FOUR(4,"https://cdn-icons-png.flaticon.com/512/2922/2922510.png"),
    BASIC_IMAGE_FIVE(5,"https://cdn-icons-png.flaticon.com/512/7452/7452962.png"),
    BASIC_IMAGE_SIX(6,"https://cdn-icons-png.flaticon.com/512/10169/10169731.png"),
    BASIC_IMAGE_SEVEN(7,"https://cdn-icons-png.flaticon.com/512/10132/10132151.png");

    @Getter
    int index;
    @Getter
    private String url;

    ProfileImage(int index, String url) {
        this.index = index;
        this.url = url;
    }
}
