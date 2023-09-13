package com.fshoes.core.admin.voucher.repository;

import com.fshoes.core.admin.voucher.model.respone.AdCustomerVoucherRespone;
import com.fshoes.repository.CustomerVoucherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdCustomerVoucherRepository extends CustomerVoucherRepository {
    @Query(value = """
            select cv.id, c.full_name as customer, v.name as voucher, cv.status
            from customer_voucher cv
            left join customer c on cv.id_customer = c.id
            left join voucher v on cv.id_voucher = v.id
            """, nativeQuery = true)
    List<AdCustomerVoucherRespone> getAll();

    @Query(value = """
            select cv.id, c.full_name as customer, v.name as voucher, cv.status
            from customer_voucher cv
            left join customer c on cv.id_customer = c.id
            left join voucher v on cv.id_voucher = v.id
            where cv.id =:id
            """, nativeQuery = true)
    AdCustomerVoucherRespone getOneById(String id);
    @Query(value = """
            select cv.id, c.full_name as customer, v.name as voucher, cv.status
            from customer_voucher cv
            left join customer c on cv.id_customer = c.id
            left join voucher v on cv.id_voucher = v.id
            """, nativeQuery = true)
    Page<AdCustomerVoucherRespone> getPage(Pageable pageable);
}
