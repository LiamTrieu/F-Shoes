package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.response.ClientBillAccountResponse;
import com.fshoes.repository.BillRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBillRepository extends BillRepository {
    @Query(value = """
            select bi.id, bi.id_customer , p.name as nameProduct, bd.price, bd.quantity ,s.size as size,
             c.name as color,m.name as material,sl.name as sole,b.name as brand,cate.name as category, MAX(i.url) as url
             from bill bi join bill_detail bd on bi.id = bd.id_bill
            join product_detail pd on pd.id = bd.id_product_detail
            join product p on p.id = pd.id_product
              left join material m on m.id = pd.id_material
              left join category cate on cate.id = pd.id_category
              left join brand b on b.id  = pd.id_brand
              left join sole sl on sl.id = pd.id_sole
              left join size s on s.id = pd.id_size
              left join color c on c.id = pd.id_color
              left join image i on i.id_product_detail = pd.id
               WHERE (:#{#request.status} is null or bi.status = :#{#request.status}) 
              AND (:#{#request.nameProductSearch} is null or p.name like %:#{#request.nameProductSearch}%) 
              group by p.id, bi.id,bd.id, pd.id;
              
            """, nativeQuery = true)
    List<ClientBillAccountResponse> getALlBill(@Param("request") ClientBillAccountRequest request);

}
