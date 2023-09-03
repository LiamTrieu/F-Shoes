package com.fshoes.core.admin.khuyenmai.repository;

import com.fshoes.core.admin.khuyenmai.model.respone.KhuyenMaiRespone;
import com.fshoes.repository.PromotionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends PromotionRepository {
    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status from Promotion", nativeQuery = true)
    List<KhuyenMaiRespone> getAllKhuyenMai();

    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
                   "from Promotion where Name like %:textSearch%",nativeQuery = true)
    Page<KhuyenMaiRespone> searchByName(PageRequest pageRequest, @Param("textSearch") String textSearch);
}
