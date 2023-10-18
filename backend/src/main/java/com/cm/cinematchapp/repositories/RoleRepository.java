package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String Name);
}
