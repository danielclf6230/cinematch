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
public class Message {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    private Long messageId;

    private Long senderId;

    private Long receiverId;

    private String content;

    //timestamp;





}
