package gamified.gamified.Entities;

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
@Table(name = "Enrollement", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "course_id" })
})
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Enrollement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "currentstep")
    private Integer currentstep;

    @Column(name = "correctanswers")
    private Long correctanswers;

    @Column(name = "wronganswers")
    private Long wronganswers;

    @Column(name = "completedlessons")
    private Long completedlessons;

    @Column(name = "playedgames")
    private Long playedgames;

    @Column(name="state")
    private String state;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
