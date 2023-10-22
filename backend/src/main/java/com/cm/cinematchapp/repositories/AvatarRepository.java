package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {

    Avatar findByFilename(String fileName);
    Avatar findByPath(String path);
}
