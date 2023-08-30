package com.fshoes.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Component
public class CloudinaryImage {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile imageFile){
        try {
            Map map = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
            return (String) map.get("url");
        }catch (Exception e){
            e.printStackTrace();
            return "Upload fail";
        }
    }
}
