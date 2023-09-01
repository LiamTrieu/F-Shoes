package com.fshoes.core.common;

import java.util.Objects;

public class ObjectRespone {
    private boolean status = false;
    private String mess;

    private Objects objects;

    public ObjectRespone(Objects objects) {
        if (objects != null) {
            status = true;
        }
    }
}
