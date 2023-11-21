package com.fshoes.core.client.repository;

import com.fshoes.core.admin.returns.model.response.BillDetailReturnResponse;
import com.fshoes.repository.ReturnDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientReturnDetailRepository extends ReturnDetailRepository {
}
