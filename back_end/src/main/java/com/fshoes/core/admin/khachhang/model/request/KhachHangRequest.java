//package com.fshoes.core.admin.khachhang.model.request;
//
//import com.fshoes.entity.Customer;
//import com.fshoes.util.DateUtil;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.text.ParseException;
//
//@Getter
//@Setter
//public class KhachHangRequest {
//   private Integer id;
//   private String avatar;
//   private String email;
//   private String fullName;
//   private String dateBirth;
//   private String phoneNumber;
//   private String createdAt;
//   private Integer status;
//
//   public Customer newCustomer(Customer customer) throws ParseException {
//        customer.setId(this.getId());
//        customer.setAvatar(this.getAvatar());
//        customer.setEmail(this.getEmail());
//        customer.setFullName(this.getFullName());
//        customer.setDateBirth(DateUtil.parseDateLong(this.getDateBirth()));
//        customer.setPhoneNumber(this.getPhoneNumber());
//        customer.setCreatedAt(DateUtil.parseDateLong(this.getCreatedAt()));
//
//        return customer;
//   }
//}
