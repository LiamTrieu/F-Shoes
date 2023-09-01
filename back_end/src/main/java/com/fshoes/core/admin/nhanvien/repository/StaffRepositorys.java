package com.fshoes.core.admin.nhanvien.repository;

import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.repository.StaffRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepositorys extends StaffRepository {
    @Query(value = "select id, full_name, date_birth, citizen_id, phone_number, email" +
            ", gender, password, avatar from staff", nativeQuery = true)
    Page<StaffRespone> staffProveti(Pageable pageable);

    @Query(value = "select id, full_name, date_birth,phone_number, citizen_id,email" +
            ", gender, password, avatar from staff", nativeQuery = true)
    List<StaffRespone> getAll(StaffRequest request);

}
