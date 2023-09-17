package com.fshoes.core.admin.khachhang.repository;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends CustomerRepository {

    @Query(value = "Select id, avatar, email, full_name as fullName,date_birth as dateBirth,phone_number as phoneNumber, created_at as createdAt, status " +
            "from customer where status = 0 order by created_at desc", nativeQuery = true)

    Page<KhachHangRespone> getAllKhachHang(Pageable pageable);

    @Query(value = "Select id, avatar, email, full_name as fullName,date_birth as dateBirth,phone_number as phoneNumber, created_at as createdAt, status " +
            "from customer where status = 0 and full_name like %:textSearch% or phone_number like %:textSearch% ", nativeQuery = true)
    Page<KhachHangRespone> FindKhachHangByName(Pageable pageable, @Param("textSearch") String textSeacrh);
}
