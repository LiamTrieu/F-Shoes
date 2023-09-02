package com.fshoes.core.admin.khachhang.service;

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

    void save(Address address);

    void delete(int id);

    public List<DiaChiRespone> seriolizeList(List<Address> lst);
}
