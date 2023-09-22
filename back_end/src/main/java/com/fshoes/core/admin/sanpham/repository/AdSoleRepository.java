package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Sole;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.SoleRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdSoleRepository extends SoleRepository {
    List<Sole> findAllByDeleted(Status status);
}
