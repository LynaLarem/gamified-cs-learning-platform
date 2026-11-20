package gamified.gamified.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Level;
import gamified.gamified.Entities.Step;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.LevelService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/level")
@CrossOrigin("http://localhost:3000")
public class LevelController {
    @Autowired
    private LevelService levelService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/{levelId}")
    public ResponseEntity<Level> getLevelbyid(@PathVariable Long levelId) {
        return ResponseEntity.ok(levelService.getLevelById(levelId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Level>> getAllLevelsbyCourseId(@PathVariable Long courseId) {
        List<Level> levels = levelService.getAllLevelsByCourseId(courseId);
        return ResponseEntity.ok(levels);
    }

    @GetMapping
    public ResponseEntity<List<Level>> getAllLevels() {
        List<Level> levels = levelService.getAllLevels();
        return ResponseEntity.ok(levels);
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Level> addLevel(@PathVariable Long courseId, @RequestBody Level level) {
        Course course = courseService.getCourseById(courseId);
        level.setCourse(course);
        return ResponseEntity.ok(levelService.addLevel(level));
    }

    @PutMapping("/{levelId}")
    public ResponseEntity<Level> updateLevel(@RequestBody Level level,
            @PathVariable Long levelId) {
        Level existingLevel = levelService.getLevelById(levelId);
        level.setSteps(existingLevel.getSteps());
        level.setId(levelId);
        level.setCourse(existingLevel.getCourse());
        return ResponseEntity.ok(levelService.updateLevel(level));
    }

    @DeleteMapping("/{levelId}")
    public ResponseEntity<Void> deleteLevel(@PathVariable Long levelId) {
        levelService.deleteLevel(levelId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sorted/course/{courseId}")
    public ResponseEntity<List<Level>> getLevelsWithSortedSteps(@PathVariable Long courseId) {
        List<Level> levels = levelService.getLevelsWithSortedSteps(courseId);
        return ResponseEntity.ok(levels);
    }

    @GetMapping("/allsteps/course/{courseId}")
    public ResponseEntity<List<Step>> getCourseAllSteps(@PathVariable Long courseId){
        List<Level> levelsWithSortedSteps = levelService.getLevelsWithSortedSteps(courseId);
        List<Step> allSteps = levelsWithSortedSteps.stream()
        .flatMap(level -> level.getSteps().stream())
        .collect(Collectors.toList());

        return ResponseEntity.ok(allSteps);
    }


}
