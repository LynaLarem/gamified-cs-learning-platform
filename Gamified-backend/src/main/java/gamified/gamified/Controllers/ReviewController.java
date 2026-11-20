package gamified.gamified.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Review;
import gamified.gamified.Entities.Student;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.ReviewService;
import gamified.gamified.Services.StudentService;

@RestController
@RequestMapping("/review")
@CrossOrigin("http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/{studentId}/{courseId}")
    public ResponseEntity<Review> getReviewByCourseIdAndStudentId(@PathVariable Long courseId,
            @PathVariable Long studentId) {
        return ResponseEntity.ok(reviewService.getReviewByCourseIdAndStudentId(courseId, studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Review>> getReviewsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(reviewService.getReviewsByCourseId(courseId));
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAllReview() {
        List<Review> review = reviewService.getAllReview();
        return ResponseEntity.ok(review);
    }

    @PostMapping("/{studentId}/{courseId}")
    public ResponseEntity<Review> addReview(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Review review) {
        Student student = studentService.getStudentById(studentId);
        Course course = courseService.getCourseById(courseId);
        review.setStudent(student);
        review.setCourse(course);
        return ResponseEntity.ok(reviewService.addReview(review));
    }

    @PutMapping("/{studentId}/{courseId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Review review) {
        Review existingReview = reviewService.getReviewByCourseIdAndStudentId(courseId, studentId);
        review.setStudent(existingReview.getStudent());
        review.setCourse(existingReview.getCourse());
        review.setId(existingReview.getId());
        return ResponseEntity.ok(reviewService.updateReview(review));
    }

    @DeleteMapping("/{studentId}/{courseId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long studentId, @PathVariable Long courseId) {
        reviewService.deleteReviewByCourseIdAndStudentId(courseId, studentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/averageRating/{courseId}")
    public ResponseEntity<Double> getAverageRatingByCourseId(@PathVariable Long courseId) {
        Double averageRating = reviewService.getAverageRatingByCourseId(courseId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("exists/{studentId}/{courseId}")
    public boolean reviewExists(@PathVariable Long studentId,
            @PathVariable Long courseId) {
                if(reviewService.getReviewByCourseIdAndStudentId( courseId, studentId) != null){
                    return true;
                }else{
                    return false;
                }
    }

}
