package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface BrandResponse extends IsIdentified {

    Integer getStt();
    String getName();

    Integer getDeleted();

    Long getCreatedAt();
}
