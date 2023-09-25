package com.fshoes.core.admin.nhanvien.repository;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.repository.StaffRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepositorys extends StaffRepository {

    @Query(value = "select id, full_name, date_birth, citizen_id, phone_number, email" +
            ", gender, password, avatar, role, status from staff Where id = :id", nativeQuery = true)
    StaffRespone getOneStaff(String id);

    @Query(value = "select id, full_name, date_birth,phone_number, citizen_id,email" +
            ", gender, password, avatar, role from staff", nativeQuery = true)
    List<StaffRespone> getAll(StaffRequest request);

    @Query(value = "SELECT ROW_NUMBER() over (ORDER BY created_at desc ) as stt, id, full_name, date_birth, phone_number, citizen_id, email, gender, password, avatar, role, created_at, status FROM staff " +
            "where  (:#{#x.searchTen} is null or full_name like %:#{#x.searchTen}% or email like %:#{#x.searchTen}% or phone_number like %:#{#x.searchTen}%) " +
            "and (:#{#x.genderSearch} is null or gender=:#{#x.genderSearch}) " +
            "and (:#{#x.statusSearch} is null or status=:#{#x.statusSearch}) " +
            "and (:#{#x.roleSearch} is null or role=:#{#x.roleSearch}) " +
            "ORDER BY created_at DESC", nativeQuery = true)
    Page<StaffRespone> searchStaff(SearchStaff x, Pageable pageable);
}
