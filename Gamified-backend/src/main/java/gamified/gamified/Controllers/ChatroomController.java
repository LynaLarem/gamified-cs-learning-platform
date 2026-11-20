package gamified.gamified.Controllers;

import java.sql.Date;
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

import gamified.gamified.Entities.Chatroom;
import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Instructor;
import gamified.gamified.Entities.Student;
import gamified.gamified.Services.ChatroomService;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.InstructorService;
import gamified.gamified.Services.StudentService;

import java.sql.Timestamp;
import java.time.Instant;

@RestController
@RequestMapping("/chatroom")
@CrossOrigin("http://localhost:3000")
public class ChatroomController {
    @Autowired
    private ChatroomService chatroomService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/{studentId}/{courseId}")
    public ResponseEntity<List<Chatroom>> getStudentChatroom(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(chatroomService.getChatroomByStudentIdAndCourseId(studentId, courseId));
    }

    @GetMapping("/{instructorId}/{courseId}")
    public ResponseEntity<List<Chatroom>> getInstructorChatroom(@PathVariable Long instructorId) {
        return ResponseEntity.ok(chatroomService.getInstructorChatroom(instructorId));
    }

    @GetMapping
    public ResponseEntity<List<Chatroom>> getAllChatrooms() {
        List<Chatroom> chatrooms = chatroomService.getAllChatrooms();
        return ResponseEntity.ok(chatrooms);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Chatroom>> getChatroomByCourseId(@PathVariable Long courseId) {
        List<Chatroom> chatrooms = chatroomService.getChatroomByCourseId(courseId);
        return ResponseEntity.ok(chatrooms);
    }

    @PostMapping("/student/{studentId}/{courseId}")
    public ResponseEntity<Chatroom> addChatroomForStudent(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Chatroom chatroom) {
        Instant now = Instant.now();
        chatroom.setDate(Timestamp.from(now));
        System.out.println(Timestamp.from(now));
        Student student = studentService.getStudentById(studentId);
        Course course = courseService.getCourseById(courseId);
        chatroom.setStudent(student);
        chatroom.setCourse(course);
        return ResponseEntity.ok(chatroomService.addChatroom(chatroom));
    }

    @PostMapping("/instructor/{instructorId}/{courseId}")
    public ResponseEntity<Chatroom> addChatroomForInstructor(@PathVariable Long instructorId, @PathVariable Long courseId,
            @RequestBody Chatroom chatroom) {
        Instructor instructor = instructorService.getInstructorById(instructorId);
        Course course = courseService.getCourseById(courseId);
        chatroom.setInstructor(instructor);
        chatroom.setCourse(course);
        return ResponseEntity.ok(chatroomService.addChatroom(chatroom));
    }

    @PutMapping("/{studentId}/{courseId}/{date}")
    public ResponseEntity<Chatroom> updateChatroomMsgStudent(@PathVariable Long studentId, @PathVariable Long courseId, @PathVariable Date date,
            @RequestBody Chatroom chatroom) {
        Chatroom existingChatroomMsg = chatroomService.getChatroomByStudentIdAndCourseIdAndDate(studentId, courseId, date);
        chatroom.setStudent(existingChatroomMsg.getStudent());
        chatroom.setCourse(existingChatroomMsg.getCourse());
        chatroom.setId(existingChatroomMsg.getId());
        return ResponseEntity.ok(chatroomService.updateChatroom(chatroom));
    }

    @PutMapping("/{instructorId}/{courseId}/{date}")
    public ResponseEntity<Chatroom> updateChatroomMsgInstructor(@PathVariable Long instructorId, @PathVariable Long courseId, @PathVariable Date date,
            @RequestBody Chatroom chatroom) {
        Chatroom existingChatroomMsg = chatroomService.getChatroomByStudentIdAndCourseIdAndDate(instructorId, courseId, date);
        chatroom.setInstructor(existingChatroomMsg.getInstructor());
        chatroom.setCourse(existingChatroomMsg.getCourse());
        chatroom.setId(existingChatroomMsg.getId());
        return ResponseEntity.ok(chatroomService.updateChatroom(chatroom));
    }

    @DeleteMapping("/{studentId}/{courseId}")
    public ResponseEntity<Void> deleteChatroomForStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        chatroomService.deleteChatroomForStudent(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{instructorId}/{courseId}")
    public ResponseEntity<Void> deleteChatroomForInstructor(@PathVariable Long instructorId, @PathVariable Long courseId) {
        chatroomService.deleteChatroomForInstructor(instructorId, courseId);
        return ResponseEntity.ok().build();
    }

}

