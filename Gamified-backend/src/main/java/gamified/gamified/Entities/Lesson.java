package gamified.gamified.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Lesson")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Lesson extends Step {

     @Lob
    @Column(length = 65535)  // Ceci définit la colonne 'content' comme étant de type 'TEXT'
    private String content;


    // @Column(name = "content")
    // private String content;

    @Column(name = "link")
    private String link;
}
