package gamified.gamified.Entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ChallengeState", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "challenge_id", "date" })
})
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Challenge_state {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "completed")
    private byte completed;

    @Column(name = "rewardtaken")
    private byte rewardtaken;

    @Column(name = "date")
    private Date date;

    @Column(name = "progress")
    private Long progress;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;
}
