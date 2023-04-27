package project2.SAYO.global.upload;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.repository.ItemRepository;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.domain.user.entity.Profile;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.domain.user.service.UserService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor    // final 멤버변수가 있으면 생성자 항목에 포함시킴
@Component
@Service
public class S3UploadService {

    private final AmazonS3Client amazonS3Client;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ItemService itemService;
    private final ItemRepository itemRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
    public String userImageUpload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return userImageUpload(uploadFile, dirName);
    }

    private String userImageUpload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
        //String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        User user = userService.getCurrentMember();
        Profile profile = user.getProfile();
        profile.setImage(fileName);

        userRepository.save(user);

        return fileName;      // 업로드 할 파일 URL 반환
    }

    public String itemImageUpload(MultipartFile multipartFile, String dirName, Long itemId) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return itemImageUpload(uploadFile, dirName, itemId);
    }

    private String itemImageUpload(File uploadFile, String dirName, Long itemId) {
        String fileName = dirName + "/" + uploadFile.getName();
        //String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        Item item = itemService.findVerifiedItem(itemId);

        itemRepository.save(item);

        return fileName;      // 업로드 할 파일 URL 반환
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws  IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

}