package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
}
