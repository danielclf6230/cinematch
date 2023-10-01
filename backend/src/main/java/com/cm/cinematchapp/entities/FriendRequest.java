package com.cm.cinematchapp.entities;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"requester_id", "recipient_id"})
})
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
