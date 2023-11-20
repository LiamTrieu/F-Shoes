package com.fshoes.core.admin.returns.repository;

import com.fshoes.core.admin.returns.model.response.BillDetailReturnResponse;
import com.fshoes.repository.ReturnDetailRepository;
import com.fshoes.repository.ReturnsRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminReturnDetailRepository extends ReturnDetailRepository {
    @Query(value = """
                select rd.id, rd.quantity, rd.price,rd.note,
                 CONCAT(p.name, ' ', m.name, ' ', s.name, ' "', c.name,'"', ' [', si.size, ']') AS name,
                 GROUP_CONCAT(DISTINCT i.url) as image
                 from return_detail rd
                 JOIN product_detail pd on rd.id_product_detail = pd.id
                 JOIN product p ON p.id = pd.id_product
                 JOIN color c ON c.id = pd.id_color
                 JOIN category ca ON ca.id = pd.id_category
                 JOIN brand b ON b.id = pd.id_brand
                 JOIN sole s ON s.id = pd.id_sole
                 JOIN material m ON m.id = pd.id_material
                 JOIN size si ON si.id = pd.id_size
                 LEFT JOIN image i ON pd.id = i.id_product_detail
                 where rd.id_return = :idReturn
                 GROUP BY rd.id, rd.quantity, rd.price
            """, nativeQuery = true)
    List<BillDetailReturnResponse> getBillDetailReturn(String idReturn);
}
