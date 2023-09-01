package com.fshoes.core.admin.nhanvien.service;

import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.entity.Staff;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface StaffService {
    List<Staff> getAll();
    List<StaffRespone> findAll(StaffRequest request);

    Page<StaffRespone> getStaff(Integer page);

    Staff getOne(Integer id);

    Staff add(@Valid StaffRequest staffRequest, BindingResult result);

    Staff update(StaffRequest staffRequest, Integer id);

    void remove(Integer id);
}
