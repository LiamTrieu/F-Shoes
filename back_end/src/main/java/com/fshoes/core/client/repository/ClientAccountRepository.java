package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.response.ClientCustomerResponse;
import com.fshoes.core.client.model.response.ClientProfileBillDetailResponse;
import com.fshoes.repository.AccountRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientAccountRepository extends AccountRepository {
    @Query(value = """
                select  ROW_NUMBER() over (ORDER BY created_at desc ) as stt, id, avatar, email,
                 full_name as fullName,date_birth as dateBirth,phone_number as phoneNumber,
                 gender, created_at as createdAt, status from account 
            """, nativeQuery = true)
    List<ClientCustomerResponse> getAllAccount();

    @Query(value = """
            SELECT bd.id, MIN(i.url) as productImg,
                   CONCAT(p.name, ' ', c.name) as productName,
                   bd.price, pd.price as productPrice, s.size as size, bd.quantity, pd.id as productDetailId,
                   bd.status as status, MAX(pd.weight) as weight, bd.note as note
            FROM bill_detail bd
                LEFT JOIN product_detail pd ON bd.id_product_detail = pd.id
                LEFT JOIN image i ON pd.id = i.id_product_detail
                LEFT JOIN product p ON pd.id_product = p.id
                LEFT JOIN size s ON pd.id_size = s.id
                LEFT JOIN bill b ON bd.id_bill = b.id
                LEFT JOIN color c ON pd.id_color = c.id
            WHERE b.id = :idBill AND bd.status = :status
            GROUP BY bd.id, p.name, c.name, bd.price, pd.price, s.size, pd.id, bd.status;
                        
            """, nativeQuery = true)
    List<ClientProfileBillDetailResponse> getBillDetailsByBillIdAndStatus(@Param("idBill") String idBill, @Param(("status")) Integer status);

}
