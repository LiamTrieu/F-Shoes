package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SizeRequest {

    private String size;

    private String deleted = "false";

    public Size tranSize(Size size) {
        size.setSize(Float.valueOf(this.size));
        size.setDeleted(Boolean.valueOf(this.deleted));
        return size;
    }
}
