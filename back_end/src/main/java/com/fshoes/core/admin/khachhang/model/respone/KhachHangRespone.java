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
    String tenTaiKhoan;
    String email;
    String hoTen;
    Long ngayTao;
    Integer trangThai;

    public KhachHangRespone(Customer cu){
        this.id = cu.getId();
        this.avatar = cu.getAvatar();
        this.tenTaiKhoan = cu.getEmail();
        this.email = cu.getEmail();
        this.hoTen = cu.getFullName();
        this.ngayTao = cu.getCreatedAt();
        this.trangThai = cu.getStatus();
    }
}
