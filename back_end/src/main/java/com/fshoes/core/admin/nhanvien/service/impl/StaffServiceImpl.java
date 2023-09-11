package com.fshoes.core.admin.nhanvien.service.impl;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.core.admin.nhanvien.repository.StaffRepositorys;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Staff;
import com.fshoes.util.DateUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.util.Date;
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
    public Page<StaffRespone> getStaff(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repo.staffProveti(pageable);
    }

    @Override
    public Page<StaffRespone> searchStaff(PageableRequest pageableRequest, SearchStaff searchStaff) {
        int page = pageableRequest.getPage() < 1 ? 0 : pageableRequest.getPage() - 1;
        Pageable pageable = PageRequest.of(page, 5);

        return repo.searchStaff(searchStaff, pageable);
    }

    @Override
    public Staff getOne(Integer id) {
        return repo.findById(id).get();
    }

    @Override
    public Staff add(@Valid StaffRequest staffRequest) throws ParseException {
//        if (result.hasErrors()) {
//            return null;
//        }
        Long dateBirth = DateUtil.parseDateLong(staffRequest.getDateBirth());
        Staff staff = Staff.builder()
                .fullName(staffRequest.getFullName())
                .password(staffRequest.getPassword())
                .dateBirth(dateBirth)
                .phoneNumber(staffRequest.getPhoneNumber())
                .email(staffRequest.getEmail())
                .gender(staffRequest.getGender())
                .avatar(staffRequest.getAvatar())
                .CitizenId(staffRequest.getCitizenId())
                .role(staffRequest.getRole())
                .status(staffRequest.getStatus())
                .build();
        return repo.save(staff);
    }

//    @Override
//    public Staff update(StaffRequest staffRequest, Integer id) {
//
//        try {
//            Staff staff = repo.findById(id).orElseThrow();
//            return repo.save(staffRequest.tranStaff(staff));
//        } catch (Exception e) {
//            return null;
//        }
//    }

    @Override
    public Staff update(StaffRequest staffRequest, Integer id) throws ParseException {
        Long dateBirth = DateUtil.parseDateLong(staffRequest.getDateBirth());
        try {
            Staff staff = repo.findById(id).orElseThrow();
            staff.setFullName(staffRequest.getFullName());
            staff.setEmail(staffRequest.getEmail());
            staff.setPhoneNumber(staffRequest.getPhoneNumber());
            staff.setCitizenId(staffRequest.getCitizenId());
            staff.setRole(staffRequest.getRole());
            staff.setGender(staffRequest.getGender());
            staff.setDateBirth(dateBirth);
            staff.setStatus(staffRequest.getStatus());
            return repo.save(staff);
        } catch (Exception e) {
            return null;
        }
    }
}
