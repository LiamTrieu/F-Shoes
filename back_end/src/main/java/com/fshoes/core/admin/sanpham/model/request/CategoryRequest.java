package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Category;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {

    private String name;

    private String deleted = "false";

    public Category tranCategory(Category category) {
        category.setName(this.name);
        category.setDeleted(Boolean.valueOf(this.deleted));
        return category;
    }
}
