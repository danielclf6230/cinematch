package com.cm.cinematchapp.services;

import com.cm.cinematchapp.entities.FriendRequest;
import com.cm.cinematchapp.entities.Friendship;
import com.cm.cinematchapp.repositories.FriendRequestRepository;
import com.cm.cinematchapp.repositories.FriendshipRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;


    public List<FriendRequest> getFriendRequestsByUserId(Long userId) {
        return friendRequestRepository.getFriendRequestsByUserId(userId);
    }

//    //accepting friend req.
//    public void acceptFriendRequest(Long friendRequestId) {
//        FriendRequest friendRequest = friendRequestRepository.findById(friendRequestId).orElse(null);
//
//        if (friendRequest != null) {
//            if (friendRequest.getRequestStatus() == FriendRequest.FriendRequestStatus.PENDING) {
//                // Update the request status to "Accepted"
//                friendRequest.setRequestStatus(FriendRequest.FriendRequestStatus.ACCEPTED);
//                friendRequestRepository.save(friendRequest);
//
//                // Create an entry in the Friendship table
//                Friendship friendship = new Friendship();
//                friendship.setUserId(friendRequest.getRequester().getUserId());
//                friendship.setFriendUserId(friendRequest.getUser().getUserId());
//                friendshipRepository.save(friendship);
//            } else {
//                // Request is already accepted or rejected, remove it from the table
//                friendRequestRepository.delete(friendRequest);
//            }
//        }
//    }

}
