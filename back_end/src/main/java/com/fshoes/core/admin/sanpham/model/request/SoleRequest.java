package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Sole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SoleRequest {

    private String name;


    public Sole tranSole(Sole sole) {
        sole.setName(this.name);
        return sole;
    }
}
