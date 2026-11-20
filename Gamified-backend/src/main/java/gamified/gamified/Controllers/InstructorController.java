package gamified.gamified.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Instructor;
import gamified.gamified.Services.InstructorService;
import java.util.List;

@RestController
@RequestMapping("/instructor")
@CrossOrigin("http://localhost:3000")
public class InstructorController {
    @Autowired
    private InstructorService instructorService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        List<Instructor> instructors = instructorService.getAllInstructors();
        return ResponseEntity.ok(instructors);
    }
    @GetMapping("/{instructorId}")
    public ResponseEntity<Instructor> getInstructorId(@PathVariable Long instructorId) {
        return ResponseEntity.ok(instructorService.getInstructorById(instructorId));
    }

    @PostMapping
    public ResponseEntity<Instructor> addInstructor(@RequestBody Instructor instructor) {
        String w = instructor.getPassword();
        instructor.setPassword(passwordEncoder.encode(w));
        Instructor addedInstructor = instructorService.addInstructor(instructor);
        return ResponseEntity.ok(addedInstructor);
    }

    @PutMapping("/{instructorId}")
    public ResponseEntity<Instructor> updateInstructor(@RequestBody Instructor instructor,
            @PathVariable Long instructorId) {
        Instructor existingInstructor = instructorService.getInstructorById(instructorId);
        instructor.setChatroom(existingInstructor.getChatroom());
        instructor.setInstructorcourse(existingInstructor.getInstructorcourse());
        instructor.setId(instructorId);
        return ResponseEntity.ok(instructorService.updateInstructor(instructor));
    }

    @DeleteMapping("/{instructorId}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long instructorId) {
        instructorService.deleteInstructor(instructorId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countaccounts() { 
        return ResponseEntity.ok(instructorService.countaccounts());
    }
}
