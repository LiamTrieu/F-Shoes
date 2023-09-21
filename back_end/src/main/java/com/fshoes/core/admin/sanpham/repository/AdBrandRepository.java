package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Brand;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.BrandRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdBrandRepository extends BrandRepository {
    List<Brand> findAllByDeleted(Status status);
}
