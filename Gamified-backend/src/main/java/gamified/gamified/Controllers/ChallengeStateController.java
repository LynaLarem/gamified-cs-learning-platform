package gamified.gamified.Controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import gamified.gamified.Entities.Challenge_state;
import gamified.gamified.Entities.Enrollement;
import gamified.gamified.Entities.Challenge;
import gamified.gamified.Entities.Student;
import gamified.gamified.Entities.Enumeration.ChallengeType;
import gamified.gamified.Services.ChallengeStateService;
import gamified.gamified.Services.ChallengeService;
import gamified.gamified.Services.StudentService;

@RestController
@RequestMapping("/challengestate")
@CrossOrigin("http://localhost:3000")
public class ChallengeStateController {
    @Autowired
    private ChallengeStateService challengestateService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ChallengeService challengeService;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Challenge_state>> getStudentChallenge_state(@PathVariable Long studentId) {
        return ResponseEntity.ok(challengestateService.getStudentChallenge_state(studentId));
    }

    @GetMapping("/oneChallenge/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> getChallenge_stateByStudentIdAndChallengeId(@PathVariable Long studentId, @PathVariable Long challengeId) {
        return ResponseEntity.ok(challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId));
    }

    @GetMapping("/achievement/{studentId}")
    public ResponseEntity<List<Challenge_state>> getStudentAchievements(@PathVariable Long studentId) {
        ChallengeType type = ChallengeType.ACHIEVEMENT;
        return ResponseEntity.ok(challengestateService.getStudentChallenge_stateByType(studentId, type));
    }

   @GetMapping("/daily/{studentId}")
    public ResponseEntity<List<Challenge_state>> getStudentDaily(@PathVariable Long studentId) {
        LocalDate currentDate = LocalDate.now();
        System.out.println(currentDate);
        List<Challenge_state> dailyChallenges = challengestateService.getStudentChallenge_stateByType(studentId, ChallengeType.DAILY);
        byte value = 0;
        dailyChallenges.forEach(challenge -> {
            Date sqlDateFromEntity = challenge.getDate();
            LocalDate localDateFromEntity = sqlDateFromEntity.toLocalDate();
            if (!localDateFromEntity.equals(currentDate)) {
                challenge.setCompleted(value);
                challenge.setRewardtaken(value);
                // Save the updated challenge to trigger the update in the database
                challengestateService.updateChallenge_state(challenge);
            }
        });
        
        return ResponseEntity.ok(dailyChallenges);
    }

    // @PutMapping("/updatedaily/{studentId}/{challengeId}")
    //     public ResponseEntity<Challenge_state> updateDailyChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId,
    //             @RequestBody Challenge_state challengestate) {
    //         byte value = 0;
    //         Challenge_state existingChallenge_state = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId);
    //         challengestate.setStudent(existingChallenge_state.getStudent());
    //         challengestate.setChallenge(existingChallenge_state.getChallenge());
    //         challengestate.setId(existingChallenge_state.getId());
    //         challengestate.setCompleted(value);
    //         challengestate.setDate(Date.valueOf(LocalDate.now()));
    //         return ResponseEntity.ok(challengestateService.updateChallenge_state(challengestate));
    //     }

    // @PatchMapping("/updatedaily/{studentId}/{challengeId}")
    // public ResponseEntity<Challenge_state> updateDailyChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId,
    //         @RequestBody Map<String, Date> challengeUpdates) {
    //     Challenge_state existingChallenge_state = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId);
    //     byte value= 0;
    //     for (Map.Entry<String, Date> entry : challengeUpdates.entrySet()) {
    //         Date newDate = entry.getValue();
    //         existingChallenge_state.setDate(newDate);
    //         existingChallenge_state.setCompleted(value);   
    //     }
        
    //     return ResponseEntity.ok(challengestateService.updateChallenge_state(existingChallenge_state));
    // }

    @PutMapping("/updatedaily/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> updateDailyChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId) {
        Challenge_state existingChallenge_state = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId);
        byte value= 1;
        if(existingChallenge_state.getRewardtaken() == 0){
            existingChallenge_state.setCompleted(value);
            existingChallenge_state.setDate(Date.valueOf(LocalDate.now())); 
            existingChallenge_state.setRewardtaken(value);
            studentService.incrementCoinsById(studentId, 200l);
        }
        return ResponseEntity.ok(challengestateService.updateChallenge_state(existingChallenge_state));
    }

    @GetMapping
    public ResponseEntity<List<Challenge_state>> getAllInventories() {
        List<Challenge_state> challengestates = challengestateService.getAllInventories();
        return ResponseEntity.ok(challengestates);
    }

    @PostMapping("/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> addChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId,
            @RequestBody Challenge_state challengestate) {
        Student student = studentService.getStudentById(studentId);
        Challenge challenge = challengeService.getChallengeById(challengeId);
        challengestate.setStudent(student);
        challengestate.setChallenge(challenge);
        return ResponseEntity.ok(challengestateService.addChallenge_state(challengestate));
    }

    @PutMapping("/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> updateChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId,
            @RequestBody Challenge_state challengestate) {
        Challenge_state existingChallenge_state = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId);
        challengestate.setStudent(existingChallenge_state.getStudent());
        challengestate.setChallenge(existingChallenge_state.getChallenge());
        challengestate.setId(existingChallenge_state.getId());
        return ResponseEntity.ok(challengestateService.updateChallenge_state(challengestate));
    }

    @DeleteMapping("/{studentId}/{challengeId}")
    public ResponseEntity<Void> deleteChallenge_state(@PathVariable Long studentId, @PathVariable Long challengeId) {
        challengestateService.deleteChallenge_state(studentId, challengeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/progress/{studentId}/{challengeId}")
    public ResponseEntity<Long> getStudentChallenge_stateProgress(@PathVariable Long studentId, @PathVariable Long challengeId) {
        return ResponseEntity.ok(challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId, challengeId).getProgress());
    }

    @PutMapping("/progress/{studentId}/{element}")
    public ResponseEntity<Void> incrementProgressByElement(@PathVariable Long studentId, @PathVariable String element) {
        List<Challenge_state> challenges = challengestateService.getStudentChallenge_state(studentId);
        for(Challenge_state challenge: challenges){
            if(challenge.getChallenge().getElement().equalsIgnoreCase(element)){
                challengestateService.incrementProgress(studentId, challenge.getChallenge().getId());
            }
        }
        return ResponseEntity.ok().build();
    }


    @PatchMapping("/completed/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> updateChallengeStateCompleted(@PathVariable Long studentId, @PathVariable Long challengeId,
            @RequestBody Map<String, Byte> stateUpdates) {
        Challenge_state existingState = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId,challengeId);
            for (Map.Entry<String, Byte> entry : stateUpdates.entrySet()) {
                Byte newCompleted = entry.getValue();
                existingState.setCompleted(newCompleted);
            }
        
        return ResponseEntity.ok(challengestateService.updateChallenge_state(existingState));
    }

    @PatchMapping("/rewardtaken/{studentId}/{challengeId}")
    public ResponseEntity<Challenge_state> updateChallengeStateRewardAch(@PathVariable Long studentId, @PathVariable Long challengeId,
            @RequestBody Map<String, Byte> stateUpdates) {
        Challenge_state existingState = challengestateService.getChallenge_stateByStudentIdAndChallengeId(studentId,challengeId);
            for (Map.Entry<String, Byte> entry : stateUpdates.entrySet()) {
                Byte newCompleted = entry.getValue();
                existingState.setRewardtaken(newCompleted);
                
            }
                studentService.incrementCoinsById(studentId, 200l);
            
        
        return ResponseEntity.ok(challengestateService.updateChallenge_state(existingState));
    }


}
