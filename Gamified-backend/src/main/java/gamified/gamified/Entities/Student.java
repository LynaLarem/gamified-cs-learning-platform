package gamified.gamified.Entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Student")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Student extends Account {

    @Column(name = "studylvl")
    private String studylvl;
    @Column(name = "coins")
    private Long coins;
    @Column(name = "xp")
    private Long xp;
    @Column(name = "score")
    private Long score;
    @Column(name = "keysleft")
    private Long keysleft;
    @Column(name = "openedchests")
    private Long openedchests;
    @Column(name = "itemsbought")
    private Long itemsbought;
    @Column(name = "hearts")
    private Long hearts;
    @Column(name = "heartsDecrementedAt")
    private LocalDateTime heartsDecrementedAt;
    @Column(name = "level")
    private int level;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonIgnoreProperties("student")
    @JsonIgnore
    private List<Enrollement> enrollments;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonIgnoreProperties("student")
    @JsonIgnore
    private List<Inventory> Inventory;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonIgnoreProperties("student")
    @JsonIgnore
    private List<Chatroom> chatroom;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonIgnoreProperties("student")
    @JsonIgnore
    private List<Challenge_state> challenges;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonIgnoreProperties("student")
    @JsonIgnore
    private List<Review> reviews;

}
