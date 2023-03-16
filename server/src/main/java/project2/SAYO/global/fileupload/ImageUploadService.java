package project2.SAYO.global.fileupload;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadService {

	String StoreImage(MultipartFile img, AwsS3Path awsS3Path);

}
