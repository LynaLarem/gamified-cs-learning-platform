package gamified.gamified.Services;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Level;
import gamified.gamified.Entities.Step;
import gamified.gamified.Repositories.LevelRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class LevelService {
    @Autowired
    LevelRepository levelRepository;

    public Level getLevelById(Long levelId) {
        return levelRepository.findById(levelId).orElse(null);
    }

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }

    public List<Level> getAllLevelsByCourseId(Long courseId) {
        return levelRepository.findAllByCourseId(courseId);
    }

    public Level addLevel(Level level) {
        return levelRepository.save(level);
    }

    public Level updateLevel(Level level) {
        return levelRepository.save(level);
    }

    public void deleteLevel(Long levelId) {
        levelRepository.deleteById(levelId);
    }

    public List<Level> getLevelsWithSortedSteps(Long courseId) {
        List<Level> levels = levelRepository.findAllByCourseId(courseId);
        
        levels.forEach(level -> {
            Collections.sort(level.getSteps(), Comparator.comparingInt(Step::getSteporder));
        });
        
        return levels;
    }

    public List<Step> getCourseSortedSteps(Long courseId) {
        List<Level> levels = levelRepository.findAllByCourseId(courseId);
        
        levels.forEach(level -> {
            Collections.sort(level.getSteps(), Comparator.comparingInt(Step::getSteporder));
        });

        List<Step> allSteps = levels.stream()
        .flatMap(level -> level.getSteps().stream())
        .collect(Collectors.toList());
        
        return allSteps;
    }
}
