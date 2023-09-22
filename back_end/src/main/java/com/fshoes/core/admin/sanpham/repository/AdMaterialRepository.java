package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Material;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.MaterialRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdMaterialRepository extends MaterialRepository {
    List<Material> findAllByDeleted(Status status);
}
