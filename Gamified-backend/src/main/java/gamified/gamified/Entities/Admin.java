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
@Table(name = "Admin")
@Setter
@Getter
@NoArgsConstructor
public class Admin extends Account{

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    @JsonIgnoreProperties("admin")
    @JsonIgnore
    private List<Challenge> challenges;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    @JsonIgnoreProperties("admin")
    @JsonIgnore
    private List<Item> items;
}
