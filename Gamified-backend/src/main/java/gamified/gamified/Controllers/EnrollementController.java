package gamified.gamified.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Course;
import gamified.gamified.Entities.Enrollement;
import gamified.gamified.Entities.Level;
import gamified.gamified.Entities.Step;
import gamified.gamified.Entities.Student;
import gamified.gamified.Services.CourseService;
import gamified.gamified.Services.EnrollementService;
import gamified.gamified.Services.GameService;
import gamified.gamified.Services.LessonService;
import gamified.gamified.Services.LevelService;
import gamified.gamified.Services.StudentService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/enrollement")
@CrossOrigin("http://localhost:3000")
public class EnrollementController {
    @Autowired
    private EnrollementService enrollementService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private LessonService lessonService;

    @Autowired
    private GameService gameService;

    @Autowired
    private LevelService levelService;

    @GetMapping("/{studentId}/{courseId}")
    public ResponseEntity<Enrollement> getEnrollementByCourseIdAndStudentId(@PathVariable Long studentId,
            @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.getEnrollementByCourseIdAndStudentId(studentId, courseId));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollement>> getEnrollementsByStudentId(@PathVariable Long studentId) {
        List<Enrollement> enrollements = enrollementService.getStudentNonCancelledEnrollements(studentId);
        return ResponseEntity.ok(enrollements);
    }

    @GetMapping("/completedcourses/student/{studentId}")
    public ResponseEntity<List<Enrollement>> getCompletedEnrollementsByStudentId(@PathVariable Long studentId) {
        List<Enrollement> enrollements = enrollementService.getStudentCompletedEnrollements(studentId);
        return ResponseEntity.ok(enrollements);
    }

    @GetMapping("/ongoingcourses/student/{studentId}")
    public ResponseEntity<List<Enrollement>> getOngoingEnrollementsByStudentId(@PathVariable Long studentId) {
        List<Enrollement> enrollements = enrollementService.getStudentOnGoingEnrollements(studentId);
        return ResponseEntity.ok(enrollements);
    }

    @GetMapping("/cancelledcourses/student/{studentId}")
    public ResponseEntity<List<Enrollement>> getCancelledEnrollementsByStudentId(@PathVariable Long studentId) {
        List<Enrollement> enrollements = enrollementService.getStudentCancelledEnrollements(studentId);
        return ResponseEntity.ok(enrollements);
    }

    @GetMapping
    public ResponseEntity<List<Enrollement>> getAllEnrollement() {
        List<Enrollement> enrollement = enrollementService.getAllEnrollement();
        return ResponseEntity.ok(enrollement);
    }

    @GetMapping("/course/{courseId}/{instructorDomain}")
    public ResponseEntity<List<Enrollement>> getEnrollmentsByCourseAndInstructorDomain(
            @PathVariable Long courseId,
            @PathVariable String instructorDomain) {
        List<Enrollement> enrollments = enrollementService.getCourseEnrollements(courseId);
        List<Enrollement> filteredEnrollments = new ArrayList<>();
        for (Enrollement enrollment : enrollments) {
            String studentEmailDomain = enrollment.getStudent().getEmail().split("@")[1];
            if (studentEmailDomain.equals(instructorDomain)) {
                filteredEnrollments.add(enrollment);
            }
        }
        return new ResponseEntity<>(filteredEnrollments, HttpStatus.OK);
    }

    @PostMapping("/{studentId}/{courseId}")
    public ResponseEntity<Enrollement> addEnrollement(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Enrollement enrollement) {
        Student student = studentService.getStudentById(studentId);
        Course course = courseService.getCourseById(courseId);
        enrollement.setStudent(student);
        enrollement.setCourse(course);
        enrollement.setState("ongoing");
        enrollement.setCompletedlessons(0l);
        enrollement.setPlayedgames(0l);
        enrollement.setCorrectanswers(0l);
        enrollement.setCurrentstep(courseService.getFirstStepOfFirstLevelInCourse(courseId).getId().intValue());
        enrollement.setWronganswers(0l);
        return ResponseEntity.ok(enrollementService.addEnrollement(enrollement));
    }

    @PutMapping("/{studentId}/{courseId}")
    public ResponseEntity<Enrollement> updateEnrollement(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Enrollement enrollement) {
        Enrollement existingEnrollement = enrollementService.getEnrollementByCourseIdAndStudentId(courseId, studentId);
        enrollement.setStudent(existingEnrollement.getStudent());
        enrollement.setCourse(existingEnrollement.getCourse());
        enrollement.setId(existingEnrollement.getId());
        return ResponseEntity.ok(enrollementService.updateEnrollement(enrollement));
    }

    @DeleteMapping("/{studentId}/{courseId}")
    public ResponseEntity<Void> deleteEnrollement(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollementService.deleteEnrollementByCourseIdAndStudentId(courseId, studentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{studentId}/{courseId}")
    public String StudentEnrollStatus(@PathVariable Long studentId, @PathVariable Long courseId) {
        return enrollementService.getEnrollStateByStudentIdAndCourseId(studentId, courseId);
    }

    @PutMapping("/correctanswers/{studentId}/{courseId}")
    public ResponseEntity<Void> incrementcorrectanswers(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollementService.incrementcorrectanswers(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/wronganswers/{studentId}/{courseId}")
    public ResponseEntity<Void> incrementwronganswers(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollementService.incrementwronganswers(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/currentstep/{studentId}/{courseId}")
    public ResponseEntity<Integer> getCurrentStep(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.findcurrentstep(studentId,courseId));
    }

    @GetMapping("/leaderboard/{courseId}")
    public ResponseEntity<List<Enrollement>> getLeaderboard(@PathVariable Long courseId) {
        List<Enrollement> students = enrollementService.getCourseLeaderboard(courseId);
        return ResponseEntity.ok(students);
    }

    @GetMapping("exists/{studentId}/{courseId}")
    public boolean enrollementExists(@PathVariable Long studentId,
            @PathVariable Long courseId) {
                if(enrollementService.getEnrollementByCourseIdAndStudentId( courseId, studentId) != null){
                    if(enrollementService.getEnrollStateByStudentIdAndCourseId(studentId, courseId).equalsIgnoreCase("cancelled")){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
    }

    @GetMapping("existsevencancelled/{studentId}/{courseId}")
    public boolean enrollementExistsEvenCancelled(@PathVariable Long studentId,
            @PathVariable Long courseId) {
                if(enrollementService.getEnrollementByCourseIdAndStudentId( courseId, studentId) != null){
                    return true;
                }else{
                    return false;
                }
    }


    @PatchMapping("/{studentId}/{courseId}")
    public ResponseEntity<Enrollement> updateEnrollementState(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Map<String, String> enrollementUpdates) {
        Enrollement existingEnrollement = enrollementService.getEnrollementByCourseIdAndStudentId(courseId, studentId);

        for (Map.Entry<String, String> entry : enrollementUpdates.entrySet()) {
            String newState = entry.getValue();
            existingEnrollement.setState(newState);
            if(newState.equalsIgnoreCase("cancelled")){
                existingEnrollement.setCurrentstep(courseService.getFirstStepOfFirstLevelInCourse(courseId).getId().intValue());
            }

        }

        return ResponseEntity.ok(enrollementService.updateEnrollement(existingEnrollement));
    }

    @GetMapping("/currentstepdetails/{studentId}/{courseId}")
    public ResponseEntity<Step> getCurrentStepDetails(@PathVariable Long studentId, @PathVariable Long courseId) {
        Long stepId = Long.valueOf(enrollementService.findcurrentstep(studentId,courseId));
        if(lessonService.getLessonById(stepId) != null){
            return ResponseEntity.ok(lessonService.getLessonById(stepId));
        }else{
            return ResponseEntity.ok(gameService.getGameById(stepId));
        }

    }

    @GetMapping("/count/{courseId}")
    public ResponseEntity<Integer> getenrollementCountByCourseId(@PathVariable Long courseId) {
        Integer count = enrollementService.getEnrollementCountByCourseId(courseId);
        return ResponseEntity.ok(count);
    }

    @PatchMapping("/currentstep/{studentId}/{courseId}")
    public ResponseEntity<Enrollement> updateEnrollementCurrentStep(@PathVariable Long studentId, @PathVariable Long courseId,
            @RequestBody Map<String, Integer> enrollementUpdates) {
        Enrollement existingEnrollement = enrollementService.getEnrollementByCourseIdAndStudentId(courseId, studentId);
        if(existingEnrollement.getState().equalsIgnoreCase("ongoing")){
            for (Map.Entry<String, Integer> entry : enrollementUpdates.entrySet()) {
                Integer newCurrentStep = entry.getValue();
                existingEnrollement.setCurrentstep(newCurrentStep);
            }
        }

        return ResponseEntity.ok(enrollementService.updateEnrollement(existingEnrollement));
    }

    @GetMapping("/correctanswers/{studentId}/{courseId}")
    public ResponseEntity<Integer> getCorrectAnswers(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.findcorrectanswers(studentId,courseId));
    }

    @GetMapping("/wronganswers/{studentId}/{courseId}")
    public ResponseEntity<Integer> getWrongAnswers(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.findwronganswers(studentId,courseId));
    }

    @GetMapping("/completedlessons/{studentId}/{courseId}")
    public ResponseEntity<Long> getCompletedlessons(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.findcompletedlessons(studentId,courseId));
    }

    @GetMapping("/totalcompletedlessons/{studentId}")
    public ResponseEntity<Long> getTotalCompletedlessons(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollementService.findTotalcompletedlessons(studentId));
    }

    @GetMapping("/playedgames/{studentId}/{courseId}")
    public ResponseEntity<Long> getPlayedgames(@PathVariable Long studentId, @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollementService.findplayedgames(studentId,courseId));
    }

    @GetMapping("/totalplayedgames/{studentId}")
    public ResponseEntity<Long> getTotalPlayedgames(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollementService.findTotalplayedgames(studentId));
    }

    @PutMapping("/playedgames/{studentId}/{courseId}")
    public ResponseEntity<Void> incrementPlayedgames(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollementService.incrementPlayedgames(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/completedlessons/{studentId}/{courseId}")
    public ResponseEntity<Void> incrementCompletedlessons(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollementService.incrementCompletedlessons(studentId, courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/progress/{studentId}/{courseId}")
    public ResponseEntity<Integer> getEnrollementProgress(@PathVariable Long studentId, @PathVariable Long courseId) {
        Enrollement enrollement = enrollementService.getEnrollementByCourseIdAndStudentId(courseId, studentId);
        Long currentStep = Long.valueOf(enrollement.getCurrentstep());
        int progress;
        if(currentStep==0){
            progress = 100;
        }else{
            List<Step> courseSteps = levelService.getCourseSortedSteps(courseId);
            int index = IntStream.range(0, courseSteps.size())
               .filter(i -> courseSteps.get(i).getId().equals(currentStep))
               .findFirst()
               .orElse(-1);
    
            progress = (index)*100/courseSteps.size();
            System.out.println("size:"+courseSteps.size()+" index:"+index+"progress:"+progress);
        }
        return ResponseEntity.ok(progress);
    }


    @PutMapping("/currentstep/{studentId}/{courseId}")
    public ResponseEntity<Void> incrementCurrentStep(@PathVariable Long studentId, @PathVariable Long courseId) {
        // Get the enrollment for the specified student and course
        Enrollement enrollement = enrollementService.getEnrollementByCourseIdAndStudentId(courseId, studentId);
    
        // Get the current step ID
        Integer currentStepId = enrollement.getCurrentstep();
    
        // Get the sorted list of steps for the course
        List<Step> courseSteps = levelService.getCourseSortedSteps(courseId);
    
        // Find the index of the current step in the list
        int currentIndex = -1;
        for (int i = 0; i < courseSteps.size(); i++) {
            if (courseSteps.get(i).getId().equals(currentStepId.longValue())) {
                currentIndex = i;
                break;
            }
        }
    
        // Determine the next step ID or reset to 0 if it's the last step
        Integer nextStepId;
        if (currentIndex == courseSteps.size() - 1) {
            nextStepId = 0;
            enrollement.setState("completed");
        }else if (currentIndex == -1) {
            return ResponseEntity.badRequest().build();
        } else {
            nextStepId = courseSteps.get(currentIndex + 1).getId().intValue();
        }
    
        // Update the current step in the enrollment
        enrollement.setCurrentstep(nextStepId);
        enrollementService.updateEnrollement(enrollement);
    
        return ResponseEntity.ok().build();
    }
}
