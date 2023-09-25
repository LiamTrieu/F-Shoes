package com.fshoes.core.admin.voucher.repository;

import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.entity.Voucher;
import com.fshoes.repository.VoucherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdVoucherRepository extends VoucherRepository {
    @Query(value = """
            select v.id, v.code, v.name, v.value, v.maximum_value as maximumValue,
            v.type, v.minimum_amount as minimumAmount, v.quantity,
            v.start_date as startDate, v.end_date as endDate, v.status
            from voucher v
            where
            (:#{#AVS.nameSearch} is null  or v.code like %:#{#AVS.nameSearch}% or v.name like %:#{#AVS.nameSearch}%)
            and (:#{#AVS.startDateSearch} is null or v.start_date >= :#{#AVS.startDateSearch})
            and (:#{#AVS.endDateSearch} is null or v.end_date <= :#{#AVS.endDateSearch})
            and (:#{#AVS.typeSearch} is null or v.type = :#{#AVS.typeSearch})
            and (:#{#AVS.statusSearch} is null or v.status = :#{#AVS.statusSearch})
            """, nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucher(Pageable pageable, @Param("AVS") AdVoucherSearch AVS);

    @Query(value = """
            select v.id, v.code, v.name, v.value, v.maximum_value as maximumValue,
            v.type, v.minimum_amount as minimumAmount, v.quantity,
            v.start_date as startDate, v.end_date as endDate, v.status
            from voucher v
            """, nativeQuery = true)
    Page<AdVoucherRespone> getPageVoucher(Pageable pageable);

    @Query(value = """
            select v.id, v.code, v.name, v.value, v.maximum_value as maximumValue,
            v.type, v.minimum_amount as minimumAmount, v.quantity,
            v.start_date as startDate, v.end_date as endDate, v.status
            from voucher v
            where v.id =:id
            """, nativeQuery = true)
    Optional<AdVoucherRespone> getVoucherById(@Param("id") String id);

    @Query("""
    select v from Voucher v
    where (v.startDate > :dateNow and v.status != 0)
    or (v.endDate <= :dateNow and v.status != 2)
    or ((v.startDate <= :dateNow and v.endDate > :dateNow) and v.status != 1)
    """)
    List<Voucher> getAllVoucherWrong(Long dateNow);
}
