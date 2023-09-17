package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface ProductResponse extends IsIdentified {
    Integer getStt();

    String getName();

    String getCategory();

    String getBrand();

    Integer getAmount();

    Integer getStatus();

}
