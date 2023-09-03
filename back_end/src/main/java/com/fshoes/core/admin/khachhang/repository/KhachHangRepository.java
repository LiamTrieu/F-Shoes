package com.fshoes.core.admin.khachhang.repository;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends CustomerRepository {

    @Query(value = "Select id, avatar, email, full_name as fullName, created_at as createdAt, status from customer where status = 0", nativeQuery = true)
    Page<KhachHangRespone> getAllKhachHang(Pageable pageable);
}
