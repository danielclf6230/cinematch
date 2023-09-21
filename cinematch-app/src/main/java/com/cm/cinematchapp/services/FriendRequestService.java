package com.cm.cinematchapp.services;

import com.cm.cinematchapp.entities.FriendRequest;
import com.cm.cinematchapp.entities.Friendship;
import com.cm.cinematchapp.entities.User;
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

    @Autowired
    private UserService userService;


    public List<FriendRequest> getFriendRequestsByUserId(Long userId) {
        return friendRequestRepository.getFriendRequestsByUserId(userId);
    }

    public FriendRequest sendFriendRequest(Long requesterId, Long userId) {
        // Retrieve the requester and the user by their IDs
        User requester = userService.getUserById(requesterId);
        User user = userService.getUserById(userId);

//        // Check if the requester and user exist
//        if (requester == null || user == null) {
//            throw new IllegalArgumentException("Invalid requesterId or userId");
//        }
//
//        // Check if a friend request already exists between the requester and user
//        if (friendRequestRepository.existsByRequesterAndUser(requester, user)) {
//            throw new IllegalArgumentException("Friend request already exists");
//        }

        // Create a new friend request
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequester(requester);
        friendRequest.setUser(user);
        friendRequest.setRequestStatus(FriendRequest.FriendRequestStatus.PENDING);

        // Save the friend request to the repository
        return friendRequestRepository.save(friendRequest);
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
