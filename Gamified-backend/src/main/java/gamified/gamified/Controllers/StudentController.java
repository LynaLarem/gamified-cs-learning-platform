package gamified.gamified.Controllers;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import gamified.gamified.Entities.Inventory;
import gamified.gamified.Entities.Item;
import gamified.gamified.Entities.Student;
import gamified.gamified.Entities.Challenge;
import gamified.gamified.Entities.Challenge_state;
import gamified.gamified.Services.InventoryService;
import gamified.gamified.Services.ItemService;
import gamified.gamified.Services.StudentService;
import gamified.gamified.Services.ChallengeService;
import gamified.gamified.Services.ChallengeStateService;
import java.util.concurrent.locks.Lock;

@RestController
@RequestMapping("/student")
@CrossOrigin("http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;
    private final Lock recoveryLock = new ReentrantLock();

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ItemService itemService;
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private ChallengeService challengeService;
    @Autowired
    private ChallengeStateService challengeStateService;


    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getStudentById(studentId));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    // @GetMapping("/course/{courseId}")
    // public ResponseEntity<List<Object[]>> getStudentsByCourse(@PathVariable Long
    // courseId) {
    // return ResponseEntity.ok(studentService.getStudentsByCourse(courseId));
    // }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        String w = student.getPassword();
        student.setPassword(passwordEncoder.encode(w));
        Student addedStudent = studentService.addStudent(student);
        List<Item> items = itemService.getAllItems();
        List<Challenge> challenges = challengeService.getAllChallenges();
        byte value = 0 ;
        // Create inventory entries for each item for the new student
        for (Item item : items) {
            Inventory inventoryItem = new Inventory();
            inventoryItem.setStudent(addedStudent);
            inventoryItem.setItem(item);
            inventoryItem.setQuantity(0);
            inventoryItem.setActive(value);
            // Add the inventory entry
            inventoryService.addInventory(inventoryItem);
        }

        for (Challenge challenge : challenges) {
            Challenge_state challengestate = new Challenge_state();
            challengestate.setStudent(addedStudent);
            challengestate.setChallenge(challenge);
            challengestate.setCompleted(value);
            challengestate.setRewardtaken(value);
            challengestate.setProgress(0l);
            challengestate.setDate(java.sql.Date.valueOf("2000-01-01"));
            challengeStateService.addChallenge_state(challengestate);
        }

        return ResponseEntity.ok(addedStudent);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student,
            @PathVariable Long studentId) {
        Student existingStudent = studentService.getStudentById(studentId);
        student.setEnrollments(existingStudent.getEnrollments());
        student.setInventory(existingStudent.getInventory());
        student.setChatroom(existingStudent.getChatroom());
        student.setChallenges(existingStudent.getChallenges());
        student.setReviews(existingStudent.getReviews());
        student.setId(studentId);
        return ResponseEntity.ok(studentService.updateStudent(student));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hearts/{studentId}")
    public ResponseEntity<Long> findHeartsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.findHeartsByStudentId(studentId));
    }

    @PutMapping("/hearts/{studentId}")
    public ResponseEntity<Long> decrementHeartsByStudentId(@PathVariable Long studentId) {
        studentService.decrementHeartsByStudentId(studentId);
        // Schedule the call to incrementHeartsByStudentId after 5 minutes
        scheduleIncrementHearts(studentId);
        return ResponseEntity.ok(studentService.findHeartsByStudentId(studentId));
    }

    @GetMapping("/hearts/time-left/{studentId}")
    public ResponseEntity<Long> getTimeLeftForHeartRecovery(@PathVariable Long studentId) {
        LocalDateTime heartsDecrementedAt = studentService.findHeartsDecrementedAtByStudentId(studentId);
        long timeElapsed = ChronoUnit.MILLIS.between(heartsDecrementedAt, LocalDateTime.now());
        long timeLeft = 300000 - timeElapsed;
        return ResponseEntity.ok(Math.max(timeLeft, 0)); // Ensure no negative values
    }

    public CompletableFuture<Void> scheduleIncrementHearts(Long studentId) {
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            try {
                // Acquire the lock to ensure only one heart recovers at a time
                recoveryLock.lock();
                Student student = studentService.getStudentById(studentId);
                student.setHeartsDecrementedAt(LocalDateTime.now());
                studentService.addStudent(student);
                // Sleep for 5 minutes (300,000 milliseconds)
                TimeUnit.MILLISECONDS.sleep(300000);
                // Call incrementHeartsByStudentId after 5 minutes
                studentService.incrementHeartsByStudentId(studentId);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                // Release the lock
                recoveryLock.unlock();
            }
        });
        return future;
    }

    @PutMapping("/score/{studentId}/{addscore}")
    public ResponseEntity<Void> incrementScoreById(@PathVariable Long studentId, @PathVariable Long addscore) {
        studentService.incrementScoreById(studentId, addscore);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/xp/{studentId}/{addxp}")
    public ResponseEntity<Void> incrementXPById(@PathVariable Long studentId, @PathVariable Long addxp) {
        studentService.incrementXPById(studentId, addxp);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/xp/nextlevel/{studentId}")
    public ResponseEntity<Long> getProgressToNextLevel(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId);
        int currentLevel = student.getLevel();
        Long xpToNextLevel = studentService.getXpToNextLevel(studentId);
        Long xpRequiredForNextLevel = studentService.getXpRequiredForLevel(currentLevel);
        xpToNextLevel=xpRequiredForNextLevel-xpToNextLevel;
        return ResponseEntity.ok(xpToNextLevel*100/xpRequiredForNextLevel);
    }

    @PutMapping("/coins/{studentId}/{addcoins}")
    public ResponseEntity<Void> incrementCoinsById(@PathVariable Long studentId, @PathVariable Long addcoins) {
        studentService.incrementCoinsById(studentId, addcoins);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/coinsMinus/{studentId}/{takecoins}")
    public ResponseEntity<Void> decrementCoinsById(@PathVariable Long studentId, @PathVariable Long takecoins) {
        studentService.decrementCoinsById(studentId, takecoins);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/coins/{studentId}")
    public ResponseEntity<Long> findCoinsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.findCoinsByStudentId(studentId));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Student>> getLeaderboard() {
        List<Student> students = studentService.getLeaderboard();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/dashboard/leaderboard/{studentId}")
    public ResponseEntity<List<Object[]>> getDashboardLeaderboard(@PathVariable Long studentId) {
        List<Student> students = studentService.getLeaderboard();

        int index = IntStream.range(0, students.size())
               .filter(i -> students.get(i).getId().equals(studentId))
               .findFirst()
               .orElse(-1);

        List<Object[]> leaderboardEntries = IntStream.range(0, students.size())
               .mapToObj(i -> new Object[]{i+1, students.get(i)})
               .collect(Collectors.toList());

        if (index <= 4) {
            System.out.println("First 4");
            return ResponseEntity.ok(leaderboardEntries.subList(0, 4));
        } else {
            if (index >= students.size() - 4) {
                System.out.println("Last 4");
                return ResponseEntity.ok(leaderboardEntries.subList(students.size() - 4, students.size()));
            } else {
                System.out.println("In the middle");
                return ResponseEntity.ok(leaderboardEntries.subList(index, index + 5)); // Adjusted to include the current index
            }
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countaccounts() {
        return ResponseEntity.ok(studentService.countaccounts());
    }

    @GetMapping("/countstdlvl/{stdlvl}")
    public ResponseEntity<Long> countaccounts(@PathVariable String stdlvl) {
        return ResponseEntity.ok(studentService.countByStudyLevel(stdlvl));
    }

    @PatchMapping("/hearts/{studentId}")
    public ResponseEntity<Student> updateHearts(@PathVariable Long studentId,
            @RequestBody Map<String, Long> heartsUpdate) {
        Student existingStudent= studentService.getStudentById(studentId);
            for (Map.Entry<String, Long> entry : heartsUpdate.entrySet()) {
                Long newHearts = entry.getValue();
                existingStudent.setHearts(newHearts);
            }
        
        return ResponseEntity.ok(studentService.updateStudent(existingStudent));
    }

    @GetMapping("/itemsbought/{studentId}")
    public ResponseEntity<Integer> getBoughtitems(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.findBoughtitems(studentId));
    }

    @PutMapping("/itemsbought/{studentId}")
    public ResponseEntity<Void> incrementBoughtitems(@PathVariable Long studentId) {
        studentService.incrementBoughtitems(studentId);
        return ResponseEntity.ok().build();
    }
}
