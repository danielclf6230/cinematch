package com.cm.cinematchapp.entities;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class MoviePoster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="poster_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(name="file_name")
    private String filename = "";

    @Column(name="path")
    private String path;

    @Column(name="file_size")
    private Long size;

}
