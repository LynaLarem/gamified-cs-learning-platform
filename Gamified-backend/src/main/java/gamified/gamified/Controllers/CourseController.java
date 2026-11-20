package gamified.gamified.Controllers;

import java.util.ArrayList;
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

import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Lesson;
import gamified.gamified.Entities.Specialist;
import gamified.gamified.Entities.Step;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.ReviewService;
import gamified.gamified.Services.SpecialistService;

@RestController
@RequestMapping("/course")
@CrossOrigin("http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Autowired
    private SpecialistService specialistService;

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseById(courseId));
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllAvailableCourses() {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCourses(available);
        return ResponseEntity.ok(courses);
    }   

    @GetMapping("/specialist/{specialistId}")
    public ResponseEntity<List<Course>> getCoursesBySpecialistId(@PathVariable Long specialistId) {
        List<Course> courses = courseService.getCoursesBySpecialistId(specialistId);
        return ResponseEntity.ok(courses);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Course>> getCoursesByinstructorId(@PathVariable Long instructorId) {
        return ResponseEntity.ok(courseService.getCoursesByInstructorId(instructorId));
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Course>> getCoursesByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(courseService.getCoursesByStudentId(studentId));
    }
    
    @PostMapping("/specialist/{specialistId}")
    public ResponseEntity<Course> addCourse(@PathVariable Long specialistId, @RequestBody Course course) {
        Specialist specialist = specialistService.getSpecialistById(specialistId);
        course.setSpecialist(specialist);
        return ResponseEntity.ok(courseService.addCourse(course));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course,
            @PathVariable Long courseId) {
        Course existingCourse = courseService.getCourseById(courseId);
        course.setLevels(existingCourse.getLevels());
        course.setId(courseId);
        course.setSpecialist(existingCourse.getSpecialist());
        course.setEnrollements(existingCourse.getEnrollements());
        course.setChatroom(existingCourse.getChatroom());
        course.setReviews(existingCourse.getReviews());
        course.setInstructorcourse(existingCourse.getInstructorcourse());
        return ResponseEntity.ok(courseService.updateCourse(course));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stepcount/{courseId}")
    public int getNumberOfSteps(@PathVariable Long courseId) {
        return courseService.getNumberOfSteps(courseId);
    }

    @GetMapping("/search/{searchTerm}")
    public ResponseEntity<List<Course>> searchCourses(@PathVariable String searchTerm) {
        List<Course> courses = courseService.searchCoursesByName(searchTerm);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/firststep/{courseId}")
    public ResponseEntity<Step> getFirstStepOfFirstLevelInCourse(@PathVariable Long courseId) {
        Lesson firstStep = courseService.getFirstStepOfFirstLevelInCourse(courseId);
        return ResponseEntity.ok(firstStep);
    }
    
    @GetMapping("/filteredbydiff/{difficulty}")
    public ResponseEntity<List<Course>> getAllAvailableCoursesByDifficulty(@PathVariable String difficulty) {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCoursesByDifficulty(available, difficulty);
        return ResponseEntity.ok(courses);
    } 

    @GetMapping("/filteredbyrating/{rating}")
    public ResponseEntity<List<Course>> getAllAvailableCoursesByRating(@PathVariable Integer rating) {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCourses(available);
        List<Course> filteredCourses = new ArrayList<Course>();
        for (Course course : courses) {
            Double avg = reviewService.getAverageRatingByCourseId(course.getId());
            if(avg != null && avg >= rating){
                filteredCourses.add(course);
            }
        }
        return ResponseEntity.ok(filteredCourses);
    }
     

    @GetMapping("/sortbynameasc")
    public ResponseEntity<List<Course>> getAllAvailableCoursesSortedByNameAsc() {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCoursesSortedAsc(available);
        
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/sortbynamedesc")
    public ResponseEntity<List<Course>> getAllAvailableCoursesSortedByNameDesc() {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCoursesSortedDesc(available);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/sortbypopularityleast")
    public ResponseEntity<List<Course>> getAllAvailableCoursesSortedByPopLeast() {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCoursesSortedByPopLeast(available);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/sortbypopularitymost")
    public ResponseEntity<List<Course>> getAllAvailableCoursesSortedByPopMost() {
        byte available = 1;
        List<Course> courses = courseService.getAllAvailableCoursesSortedByPopMost(available);
        return ResponseEntity.ok(courses);
    }
}
