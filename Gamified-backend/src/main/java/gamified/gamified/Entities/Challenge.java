package gamified.gamified.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gamified.gamified.Entities.Enumeration.ChallengeType;
import gamified.gamified.Entities.Validation.Interface.AtLeastOneNotNull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "Challenge")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@AtLeastOneNotNull(fields = {"coinsreward", "xpreward", "keyreward"})
public class Challenge {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "description", nullable = false)
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private ChallengeType type;

  @Column(name="title", nullable = false)
  private String title;

  @Column(name="element")
  private String element;

  @Column(name = "required")
  private Integer required;

  @Column(name = "coinsreward")
  private Integer coinsreward;

  @Column(name = "xpreward")
  private Integer xpreward;

  @Column(name = "keyreward")
  private Integer keyreward;

  @ManyToOne
  private Admin admin;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "challenge_id", referencedColumnName = "id")
  @JsonIgnoreProperties("challenge")
  @JsonIgnore
  private List<Challenge_state> challenges;
  
}
