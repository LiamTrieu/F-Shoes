package com.fshoes.core.admin.nhanvien.service.impl;

import com.fshoes.core.admin.nhanvien.model.request.SearchStaff;
import com.fshoes.core.admin.nhanvien.model.request.StaffRequest;
import com.fshoes.core.admin.nhanvien.model.respone.StaffRespone;
import com.fshoes.core.admin.nhanvien.repository.StaffRepositorys;
import com.fshoes.core.admin.nhanvien.service.StaffService;
import com.fshoes.entity.Staff;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.util.DateUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

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
    public Page<StaffRespone> searchStaff(SearchStaff searchStaff) {
        int page = searchStaff.getPage() < 1 ? 0 : searchStaff.getPage() - 1;
        Pageable pageable = PageRequest.of(page, 5);
        return repo.searchStaff(searchStaff, pageable);
    }

    @Override
    public StaffRespone getOne(String id) {
        return repo.getOneStaff(id);
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
                .status(Status.values()[staffRequest.getStatus()])
                .build();
        return repo.save(staff);
    }

    @Override
    public Boolean update(StaffRequest staffRequest, String id) throws ParseException {
        Optional<Staff> optional = repo.findById(id);
        if (optional.isPresent()) {
            Staff staff = staffRequest.tranStaff(optional.get());
            repo.save(staff);
            return true;
        } else {
            return false;
        }
    }
}
