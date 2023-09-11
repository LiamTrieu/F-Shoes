package com.fshoes.core.admin.khachhang.service;

import com.fshoes.core.admin.khachhang.model.request.DiaChiRequest;
import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.core.admin.khachhang.repository.DiaChiRepository;
import com.fshoes.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiaChiService {

    List<Address> getAll();

    Address getOne(int id);

    Page<Address> getPage(int p);

    Address add(DiaChiRequest diaChiRequest);

    Boolean update(Integer id, DiaChiRequest DiaChiRequest);



    void delete(int id);


}
