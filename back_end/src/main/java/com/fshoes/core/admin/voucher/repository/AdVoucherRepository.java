package com.fshoes.core.admin.voucher.repository;

import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.repository.VoucherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdVoucherRepository extends VoucherRepository {
    @Query(value = """
            select v.id, v.code, v.name, v.value, v.maximum_value as maximumValue,
            v.type, v.minimum_amount as minimumAmount, v.quantity,
            v.start_date as startDate, v.end_date as endDate, v.status
            from voucher v
            where (:#{#AVS.nameSearch} is null  or v.name like %:#{#AVS.nameSearch}%)
            and (:#{#AVS.startDateSearch} is null or v.start_date >= :#{#AVS.startDateSearch})
            and (:#{#AVS.endDateSearch} is null or v.end_date <= :#{#AVS.endDateSearch})
            """, nativeQuery = true)
    Page<AdVoucherRespone> pageSearchVoucher(Pageable pageable, @Param("AVS") AdVoucherSearch AVS);

    @Query(value = """
            select v.id, v.code, v.name, v.value, v.maximum_value as maximumValue,
            v.type, v.minimum_amount as minimumAmount, v.quantity,
            v.start_date as startDate, v.end_date as endDate, v.status
            from voucher v
            where v.id =:id
            """, nativeQuery = true)
    Optional<AdVoucherRespone> getVoucherById(@Param("id") Integer id);
}
