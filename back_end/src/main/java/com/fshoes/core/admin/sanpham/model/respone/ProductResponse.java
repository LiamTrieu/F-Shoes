package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface ProductResponse extends IsIdentified {
    Integer getStt();

    String getName();

    String getDescription();

    String getCategory();

    String getCategoryId();

    String getBrand();

    String getBrandId();

    Integer getAmount();

    Integer getStatus();

}
