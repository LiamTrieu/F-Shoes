package com.fshoes.core.admin.khachhang.repository;

import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.repository.AddressRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaChiRepository extends AddressRepository {
    @Query(value = "Select a.id, a.name, a.phone_number as phoneNumber, a.email, a.specific_address as specificAddress from address a where a.id_customer = :idCustomer order by created_at desc",nativeQuery = true)
     Page<DiaChiRespone> getPageAddressByIdCustomer(Pageable pageable,@Param("idCustomer") String idCustomer);
}
