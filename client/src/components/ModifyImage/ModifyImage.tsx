import { useRef, useCallback, useState } from "react";
import axios from "axios";
import * as S from "./styled";

const ModifyImage = () => {
  const [imgFile, setImgFile]: any = useState(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
console.log(imgFile)
  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImgFile(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  // const inputRef = useRef<HTMLInputElement | null>(null);

  // const onUploadImage = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!e.target.files) {
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);

  //     axios({
  //       // baseURL: API_HOST,
  //       url: "/images/:username/thumbnail",
  //       method: "POST",
  //       data: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   },
  //   []
  // );

  // const onUploadImageButtonClick = useCallback(() => {
  //   if (!inputRef.current) {
  //     return;
  //   }
  //   inputRef.current.click();
  // }, []);

  return (
    <S.ModifyImageWrapper>
      
      <img
        src={imgFile === null? <S.Image/> : imgFile}
        alt="프로필 이미지"
      />
      {/* <S.Image></S.Image> */}
      <input
        type="file"
        accept="image/*"
        id="productImg"
        onChange={saveImgFile}
        ref={imgRef}
        // ref={inputRef}
        // onChange={onUploadImage}
      />
      <label htmlFor="productImg">
        <div className="upLoad">이미지 업로드</div>
      </label>
      {/* <button type="button" id="productImg">이미지 추가</button> */}
      {/* <button onClick={onUploadImageButtonClick} /> */}
      {/* <img src={imgFile} alt="productImage"></img> */}
    </S.ModifyImageWrapper>
  );
};

export default ModifyImage;