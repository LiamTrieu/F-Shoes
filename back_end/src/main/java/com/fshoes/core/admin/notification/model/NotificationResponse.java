package com.fshoes.core.admin.notification.model;

import com.fshoes.entity.base.IsIdentified;

public interface NotificationResponse extends IsIdentified {

    Long getCreatedAt();

    String getTitle();

    String getContent();

    String getIdRedirect();

    String getType();

    String getStatus();

    String getImage();
}
