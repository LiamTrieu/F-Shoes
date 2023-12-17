package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface CategoryResponse extends IsIdentified {
    String getName();

    Integer getDeleted();

    Long getCreatedAt();
}
