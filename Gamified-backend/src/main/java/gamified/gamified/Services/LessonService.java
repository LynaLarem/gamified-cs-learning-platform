package gamified.gamified.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Lesson;
import gamified.gamified.Repositories.LessonRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class LessonService {
    @Autowired
    LessonRepository lessonRepository;

    public Lesson getLessonById(Long lessonId) {
        return lessonRepository.findById(lessonId).orElse(null);
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public Lesson updateLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long lessonId) {
        lessonRepository.deleteById(lessonId);
    }
}
