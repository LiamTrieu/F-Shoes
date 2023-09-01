package com.fshoes.core.admin.nhanvien.service.impl;

import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.core.admin.nhanvien.repository.StaffRepositorys;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import com.fshoes.entity.Staff;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffRepositorys repo;

    @Override
    public List<Staff> getAll() {
        return repo.findAll();
    }

    @Override
    public List<StaffRespone> findAll(StaffRequest request) {
        return repo.getAll(request);
    }

    @Override
    public Page<StaffRespone> getStaff(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repo.staffProveti(pageable);
    }

    @Override
    public Staff getOne(Integer id) {
        return repo.findById(id).get();
    }

    @Override
    public Staff add(@Valid StaffRequest staffRequest, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }
        Staff staff = Staff.builder()
                .fullName(staffRequest.getFullName())
//                .dateBirth(staffRequest.getDateBirth())
                .phoneNumber(staffRequest.getPhoneNumber())
                .email(staffRequest.getEmail())
                .gender(staffRequest.getGender())
                .avatar(staffRequest.getAvatar())
//                .status(staffRequest.getStatus())
                .build();
        return repo.save(staff);
    }

    @Override
    public Staff update(StaffRequest staffRequest, Integer id) {
        Staff edit = repo.findById(id).get();
        edit = Staff.builder()
                .fullName(staffRequest.getFullName())
//                .dateBirth(staffRequest.getDateBirth())
                .phoneNumber(staffRequest.getPhoneNumber())
                .email(staffRequest.getEmail())
                .gender(staffRequest.getGender())
                .avatar(staffRequest.getAvatar())
//                .status(staffRequest.getStatus())
                .build();
        return repo.save(edit);
    }

    @Override
    public void remove(Integer id) {
        repo.delete(repo.findById(id).get());
    }
}
