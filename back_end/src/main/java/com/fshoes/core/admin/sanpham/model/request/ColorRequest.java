package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Color;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ColorRequest {

    private String code;


    public Color tranColor(Color color) {
        color.setCode(this.code);
        return color;
    }
}
