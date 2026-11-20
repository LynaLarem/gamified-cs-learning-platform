package gamified.gamified.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    List<Instructor> findByFirstnameOrLastname(String fname, String lname);

}
