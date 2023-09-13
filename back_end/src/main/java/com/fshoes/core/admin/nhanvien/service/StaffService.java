package com.fshoes.core.admin.nhanvien.service;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.entity.Staff;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.text.ParseException;
import java.util.List;

public interface StaffService {
    List<Staff> getAll();

    Page<StaffRespone> getStaff(Integer page);

    Page<StaffRespone> searchStaff(SearchStaff searchStaff);

    Staff getOne(String id);

    Staff add(@Valid StaffRequest staffRequest) throws ParseException;

    Boolean update(StaffRequest staffRequest, String id) throws ParseException;

}
