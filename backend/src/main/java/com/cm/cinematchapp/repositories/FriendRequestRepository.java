package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    FriendRequest getByRequestId(Long requestId);
    List<FriendRequest> getFriendRequestsByRequesterUserId(Long userId);
    List<FriendRequest> getFriendRequestsByRecipientUserId(Long userId);


}
