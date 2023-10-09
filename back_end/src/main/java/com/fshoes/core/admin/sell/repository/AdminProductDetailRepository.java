package com.fshoes.core.admin.sell.repository;

import com.fshoes.core.admin.sell.model.response.GetAmountProductResponse;
import com.fshoes.core.admin.sell.model.response.GetColorResponse;
import com.fshoes.core.admin.sell.model.response.GetProductDetailBillSellResponse;
import com.fshoes.core.admin.sell.model.response.GetSizeResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminProductDetailRepository extends ProductDetailRepository {
    @Query(value = """
                   SELECT  pd.id, pr.id as promotion,pr.value, bd.quantity, p.name as nameProduct, pd.price, s.size, i.url as image   FROM product_detail pd join bill_detail bd on bd.id_product_detail = pd.id join bill b
                                       on b.id = bd.id_bill join product p on p.id = pd.id_product join size s on s.id = pd.id_size
                                        join image i on i.id_product_detail = pd.id join product_promotion pp on pp.id_product_detail = pd.id
                                         join promotion pr on pr.id = pp.id_promotion where b.id = ?;
            """, nativeQuery = true)
    List<GetProductDetailBillSellResponse> getlistProductBilllSell(String id);

    @Query(value = """
                  SELECT s.id, s.size FROM product_detail pd join size s on s.id = pd.id_size group by s.size, s.id ;
            """, nativeQuery = true)
    List<GetSizeResponse> getlistSize();

    @Query(value = """
                 SELECT c.id , c.name as nameColor FROM product_detail pd join color c on c.id = pd.id_color group by c.name, c.id
            """, nativeQuery = true)
    List<GetColorResponse> getlistColor();


    @Query(value = """
            SELECT id, amount  FROM product_detail where id = ?
            """, nativeQuery = true)
    GetAmountProductResponse getAmount(String id);
}
