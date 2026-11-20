package gamified.gamified.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamified.gamified.Entities.Lesson;
import gamified.gamified.Entities.Level;
import gamified.gamified.Services.LessonService;
import gamified.gamified.Services.LevelService;

@RestController
@RequestMapping("/lesson")
@CrossOrigin("http://localhost:3000")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @Autowired
    private LevelService levelService;

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long lessonId) {
        return ResponseEntity.ok(lessonService.getLessonById(lessonId));
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        List<Lesson> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @PostMapping("/level/{levelId}")
    public ResponseEntity<Lesson> addLesson(@PathVariable Long levelId, @RequestBody Lesson lesson) {
        Level level = levelService.getLevelById(levelId);
        lesson.setLevel(level);
        return ResponseEntity.ok(lessonService.addLesson(lesson));
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<Lesson> updateLesson(@RequestBody Lesson lesson,
            @PathVariable Long lessonId) {
        Lesson existingLesson = lessonService.getLessonById(lessonId);
        lesson.setLevel(existingLesson.getLevel());
        lesson.setId(lessonId);
        lesson.setSteporder(existingLesson.getSteporder());
        lesson.setSteptype(existingLesson.getSteptype());
        return ResponseEntity.ok(lessonService.updateLesson(lesson));
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long lessonId) {
        lessonService.deleteLesson(lessonId);
        return ResponseEntity.ok().build();
    }
}
