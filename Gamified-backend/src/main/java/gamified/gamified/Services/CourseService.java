package gamified.gamified.Services;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Lesson;
import gamified.gamified.Entities.Level;
import gamified.gamified.Repositories.CourseRepository;
import gamified.gamified.Repositories.LessonRepository;
import gamified.gamified.Repositories.LevelRepository;
import jakarta.transaction.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    LevelRepository levelRepository;

    @Autowired
    LessonRepository lessonRepository;


    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public List<Course> getCoursesBySpecialistId(Long specialistId) {
            return courseRepository.findBySpecialistId(specialistId);
    }

    public List<Course> getAllAvailableCourses(byte available) {
        return courseRepository.findByAvailable(available);
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }
    
    public List<Course> getCoursesByInstructorId(Long instructorId) {
        return courseRepository.findByInstructorcourse_Instructor_Id(instructorId);
    }

    public List<Course> getCoursesByStudentId(Long studentId) {
        return courseRepository.findByEnrollementsStudentId(studentId);
    }

    public List<Course> searchCoursesByName(String name) {
        return courseRepository.findByNameContainingIgnoreCase(name);
    }

    public int getNumberOfSteps(Long courseId) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));

        return course.getLevels().stream()
            .mapToInt(level -> level.getSteps().size())
            .sum();
    }

    public Lesson getFirstStepOfFirstLevelInCourse(Long courseId) {
        Level firstLevel = levelRepository.findFirstByCourseId(courseId);
        
        Lesson firstStep = lessonRepository.findByLevelIdAndSteporder(firstLevel.getId(), 1);
        
        return firstStep;
    }


    public List<Course> getAllAvailableCoursesByDifficulty(byte available, String difficulty) {
        return courseRepository.findByAvailableAndDifficulty(available, difficulty);
    }

    public List<Course> getAllAvailableCoursesSortedAsc(byte available) {
        return courseRepository.getAvailableOrderByNameAsc(available);
    }

    public List<Course> getAllAvailableCoursesSortedDesc(byte available) {
        return courseRepository.getAvailableOrderByNameDesc(available);
    }

    public List<Course> getAllAvailableCoursesSortedByPopLeast(byte available) {
        List<Course> courses = courseRepository.findByAvailable(available);
        Map<Course, Integer> beforeMap = new HashMap<>();
        for(Course course: courses){
            beforeMap.put(course,course.getEnrollements().size());
        }
        Map<Course, Integer> sortedMap = sortMapByValues(beforeMap);
        List<Course> sortedcourses = sortedMap.keySet().stream().collect(Collectors.toList());
        return sortedcourses;
    }

    public List<Course> getAllAvailableCoursesSortedByPopMost(byte available) {
        List<Course> courses = courseRepository.findByAvailable(available);
        Map<Course, Integer> beforeMap = new HashMap<>();
        for(Course course: courses){
            beforeMap.put(course,course.getEnrollements().size());
        }
        Map<Course, Integer> sortedMap = sortMapByValuesDesc(beforeMap);
        List<Course> sortedcourses = sortedMap.keySet().stream().collect(Collectors.toList());
        return sortedcourses;
    }

    public static <K, V extends Comparable<? super V>> Map<K, V> sortMapByValues(Map<K, V> map) {
        return map.entrySet().stream()
              .sorted(Map.Entry.<K, V>comparingByValue())
              .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    public static <K, V extends Comparable<? super V>> Map<K, V> sortMapByValuesDesc(Map<K, V> map) {
        // Comparator<Map.Entry<K, V>> comparator = Map.Entry.<K, V>comparingByValue();
        // if (!descending) {
        //     comparator = comparator.reversed(); // Default to ascending order
        // }
        return map.entrySet().stream()
               .sorted(Map.Entry.<K, V>comparingByValue().reversed())
               .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }
}
