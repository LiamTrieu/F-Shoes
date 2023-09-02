package com.fshoes.core.admin.voucher.repository;

import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.repository.VoucherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdVoucherRepository extends VoucherRepository {
    @Query(value = """
            select id, code, name, value, maximum_value as maximumValue,
            type, minimum_amount as minimumAmount, quantity,
            start_date as startDate, end_date as endDate, status
            from voucher where name like %:textSearch%
            """, nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucherByName(Pageable pageable, @Param("textSearch") String textSeacrh);

    @Query(value = """
            select id, code, name, value, maximum_value as maximumValue,
            type, minimum_amount as minimumAmount, quantity,
            start_date as startDate, end_date as endDate, status
            from voucher where start_date >= :sdSearch
            """, nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucherByStartDate(Pageable pageable, @Param("sdSearch") String sdSearch);

    @Query(value = """
            select id, code, name, value, maximum_value as maximumValue,
            type, minimum_amount as minimumAmount, quantity,
            start_date as startDate, end_date as endDate, status
            from voucher where end_date <= :edSearch""", nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucherByEndDate(Pageable pageable, @Param("edSearch") String edSearch);

    @Query(value = """
            select id, code, name, value, maximum_value as maximumValue,
            type, minimum_amount as minimumAmount, quantity,
            start_date as startDate, end_date as endDate, status
            from voucher where start_date >= :sdSearch and end_date <= :edSearch""", nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucherBetweenDate(Pageable pageable, @Param("sdSearch") String sdSearch, @Param("edSearch") String edSearch);
}
