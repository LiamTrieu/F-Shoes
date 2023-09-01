package com.fshoes.core.admin.khuyenmai.model.respone;

import com.fshoes.entity.Promotion;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KhuyenMaiRespone {
    private int id;
    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private Long timeStart;

    private Long timeEnd;

    private Integer value;

    private Integer status;

    public KhuyenMaiRespone (Promotion p){
        this.id = p.getId();
        this.code = p.getCode();
        this.name = p.getName();
        this.timeStart = p.getTimeStart();
        this.timeEnd = p.getTimeEnd();
        this.value = p.getValue();
        this.status = p.getStatus();
    }

}
