package com.fshoes.core.admin.khachhang.service;

import com.fshoes.core.admin.khachhang.model.request.DiaChiRequest;
import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiaChiService {

    List<Address> getAll();

    Page<DiaChiRespone> getAllAddressByIdCustomer(int p, String idCustomer);

    Address getOne(String id);

    Page<Address> getPage(int p);

    Address add(DiaChiRequest diaChiRequest);

    Boolean update(String id, DiaChiRequest DiaChiRequest);


}
