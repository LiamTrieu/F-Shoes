package com.fshoes.core.admin.khuyenmai.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface PromotionRespone extends IsIdentified {

    String getName();

    Long getTimeStart();

    Long getTimeEnd();

    Integer getValue();

    Integer getStatus();

}
