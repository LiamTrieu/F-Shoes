package com.fshoes.core.admin.returns.repository;

import com.fshoes.core.admin.returns.model.request.GetReturnRequest;
import com.fshoes.core.admin.returns.model.response.GetReturnDetailResponse;
import com.fshoes.core.admin.returns.model.response.GetReturnResponse;
import com.fshoes.repository.ReturnsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminReturnsRepository extends ReturnsRepository {

    @Query(value = """
            select ROW_NUMBER() over (ORDER BY r.created_at desc ) as stt, r.id,
            r.code, b.code as codeBill,b.id as idBill, a.full_name as staff, r.return_at as date,
            b.full_name as customer,r.return_money as total
            from returns r join bill b on b.id = r.id_bill
            join account a on a.email = r.updated_by
            where (:#{#request.text} IS NULL OR (b.full_name LIKE %:#{#request.text}%
            OR b.code LIKE %:#{#request.text}% OR r.code LIKE %:#{#request.text}%))
            AND (:#{#request.status} = r.status)
            """, nativeQuery = true)
    Page<GetReturnResponse> getAllReturn(Pageable pageable, GetReturnRequest request);

    @Query(value = """
            select r.id, r.code, b.code as codeBill, b.id as idBill,
            b.full_name as customer, r.return_money as total, r.fee, r.status
            from returns r
            join bill b on b.id = r.id_bill
            where r.id = :id
            """, nativeQuery = true)
    GetReturnDetailResponse getReturnDetail(@Param("id") String id);
}
