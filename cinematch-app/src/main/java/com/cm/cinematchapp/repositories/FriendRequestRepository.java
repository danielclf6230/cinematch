package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {



    @Query("SELECT fr FROM FriendRequest fr WHERE fr.user.userId = :userId")
    List<FriendRequest> getFriendRequestsByUserId(Long userId);
}
