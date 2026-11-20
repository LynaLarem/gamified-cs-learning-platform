package gamified.gamified.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Instructor;
import gamified.gamified.Entities.Instructorcourse;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.InstructorService;
import gamified.gamified.Services.InstructorcourseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/instructorcourse")
@CrossOrigin("http://localhost:3000")
public class InstructorcourseController {
    
    @Autowired
    private InstructorcourseService instructorcourseService;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private CourseService courseService;


    @GetMapping("/{instructorId}")
    public ResponseEntity<List<Instructorcourse>> getAllInstructorTaughtCourses(@PathVariable Long instructorId) {
        List<Instructorcourse> taught = instructorcourseService.getInstructorTaughtCourses(instructorId);
        return ResponseEntity.ok(taught);
    }

    @GetMapping("/{instructorId}/{courseId}")
    public boolean isTaught(@PathVariable Long instructorId, @PathVariable Long courseId) {
        if(instructorcourseService.isTaught(instructorId, courseId) == null){
            return false;
        }else{
            return true;
        }
        
    }

    @PostMapping("/{instructorId}/{courseId}")
    public ResponseEntity<Instructorcourse> addInstructorcourse(@PathVariable Long instructorId, @PathVariable Long courseId,
            @RequestBody Instructorcourse instructorcourse) {
        Instructor instructor = instructorService.getInstructorById(instructorId);
        Course course = courseService.getCourseById(courseId);
        instructorcourse.setInstructor(instructor);
        instructorcourse.setCourse(course);
        return ResponseEntity.ok(instructorcourseService.addInstructorcourse(instructorcourse));
    }

    @DeleteMapping("/{instructorId}/{courseId}")
    public ResponseEntity<Void> deleteInstructorcourse(@PathVariable Long instructorId, @PathVariable Long courseId) {
        instructorcourseService.deleteInstructorcourseByCourseIdAndInstructorId(courseId, instructorId);
        return ResponseEntity.ok().build();
    }
    
}
