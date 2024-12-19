package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.ShippingAddress;
import com.vinh.cosmetic_web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, String> {
    ShippingAddress findFirstByUserOrderByShippingAddressIdAsc(User user);
}
