package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface BrandResponse extends IsIdentified {
    String getName();

    Integer getDeleted();
}
