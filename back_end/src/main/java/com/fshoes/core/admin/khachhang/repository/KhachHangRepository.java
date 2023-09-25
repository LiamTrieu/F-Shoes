package com.fshoes.core.admin.khachhang.repository;

import com.fshoes.core.admin.khachhang.model.request.AdKhachHangSearch;
import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends CustomerRepository {

    @Query(value = "Select ROW_NUMBER() over (ORDER BY created_at desc ) as stt, id, avatar, email, full_name as fullName," +
            "date_birth as dateBirth,phone_number as phoneNumber," +
            "gender, created_at as createdAt, status from customer " +
            "where  (:#{#AKS.nameSearch} is null or full_name like %:#{#AKS.nameSearch}% or email like %:#{#AKS.nameSearch}% or phone_number like %:#{#AKS.nameSearch}%) " +
            "and (:#{#AKS.gender} is null or gender=:#{#AKS.gender}) " +
            "and (:#{#AKS.statusSearch} is null or status=:#{#AKS.statusSearch}) " +
            "order by created_at desc", nativeQuery = true)
    Page<KhachHangRespone> FindKhachHang(Pageable pageable, AdKhachHangSearch AKS);
}
