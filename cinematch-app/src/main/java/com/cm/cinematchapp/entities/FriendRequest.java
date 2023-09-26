package com.cm.cinematchapp.entities;

import java.util.ArrayList;
import java.util.List;

import com.cm.cinematchapp.constants.EntityConstants;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class FriendRequest {

    @Id
    @Column(name="request_id", nullable=false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    @Enumerated(EnumType.STRING)
    @Column(name="request_status", nullable=false)
    private FriendRequestStatus requestStatus;

    //date

    public enum FriendRequestStatus {
        PENDING, // Request is pending
        ACCEPTED, // Request has been accepted
        REJECTED // Request has been rejected
    }

}
