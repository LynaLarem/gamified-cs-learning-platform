package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Level;

public interface LevelRepository extends JpaRepository<Level, Long> {

    List<Level> findAllByCourseId(Long courseId);

    Level findFirstByCourseId(Long courseId);
}
