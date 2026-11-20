package gamified.gamified.Entities;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gamified.gamified.Entities.Validation.Interface.AtLeastOneNotNull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Course")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@AtLeastOneNotNull(fields = { "learnobj1", "learnobj2", "learnobj3", "learnobj4", "learnobj5"})
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "photo", nullable = false)
  private String photo;

  @Column(name = "difficulty", nullable = false)
  private String difficulty;

  @Column(name = "learnobj1")
  private String learnobj1;

  @Column(name = "learnobj2")
  private String learnobj2;

  @Column(name = "learnobj3")
  private String learnobj3;

  @Column(name = "learnobj4")
  private String learnobj4;

  @Column(name = "learnobj5")
  private String learnobj5;

  @Column(name = "dateadded", nullable = false)
  private Date dateadded;

  @Column(name = "available")
  private byte available;

  @ManyToOne
  @JsonIgnore
  private Specialist specialist;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "course_id", referencedColumnName = "id")
  @JsonIgnoreProperties("course")
  @JsonIgnore
  private List<Enrollement> enrollements;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "course_id", referencedColumnName = "id")
  @JsonIgnoreProperties("course")
  @JsonIgnore
  private List<Level> levels;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "course_id", referencedColumnName = "id")
  @JsonIgnoreProperties("course")
  @JsonIgnore
  private List<Chatroom> chatroom;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "course_id", referencedColumnName = "id")
  @JsonIgnoreProperties("course")
  @JsonIgnore
  private List<Review> reviews;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "course_id", referencedColumnName = "id")
  @JsonIgnoreProperties("course")
  @JsonIgnore
  private List<Instructorcourse> instructorcourse;
}
