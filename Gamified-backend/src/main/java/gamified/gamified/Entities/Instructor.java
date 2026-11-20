package gamified.gamified.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Instructor")
@Setter
@Getter
@NoArgsConstructor
public class Instructor extends Account {

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "instructor_id", referencedColumnName = "id")
    @JsonIgnoreProperties("instructor")
    @JsonIgnore
    private List<Chatroom> chatroom;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "instructor_id", referencedColumnName = "id")
    @JsonIgnoreProperties("instructor")
    @JsonIgnore
    private List<Instructorcourse> instructorcourse;
}
