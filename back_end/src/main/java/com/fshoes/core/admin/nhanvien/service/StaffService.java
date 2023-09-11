package com.fshoes.core.admin.nhanvien.service;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Staff;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.util.List;

public interface StaffService {
    List<Staff> getAll();

    Page<StaffRespone> getStaff(Integer page);

    Page<StaffRespone> searchStaff(PageableRequest pageableRequest, SearchStaff searchStaff);

    Staff getOne(Integer id);

    Staff add(@Valid StaffRequest staffRequest) throws ParseException;

    Staff update(StaffRequest staffRequest, Integer id);

}
