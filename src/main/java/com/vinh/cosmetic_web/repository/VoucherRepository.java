package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, String> {
    List<Voucher> findByEnabled(boolean enabled);
    List<Voucher> findByCodeContainingIgnoreCaseAndEnabled(String code, boolean enabled);
    Optional<Voucher> findByCode(String code);
}
