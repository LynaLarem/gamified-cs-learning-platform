package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Lesson findByLevelIdAndSteporder(Long levelId, int stepOrder);
}
