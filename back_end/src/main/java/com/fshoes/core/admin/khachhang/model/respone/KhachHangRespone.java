package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KhachHangRespone {
    Integer id;
    String avatar;
    String email;
    String fullName;
    Long createdAt;
    Integer status;

    public KhachHangRespone(Customer cu){
        this.id = cu.getId();
        this.avatar = cu.getAvatar();
        this.email = cu.getEmail();
        this.fullName = cu.getFullName();
        this.createdAt = cu.getCreatedAt();
        this.status = cu.getStatus();
    }
}
