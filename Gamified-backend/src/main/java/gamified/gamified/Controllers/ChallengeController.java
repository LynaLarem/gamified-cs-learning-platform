package gamified.gamified.Controllers;

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

import gamified.gamified.Entities.Challenge;
import gamified.gamified.Services.ChallengeService;

@RestController
@RequestMapping("/challenge")
@CrossOrigin("http://localhost:3000")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @GetMapping("/{challengeId}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long challengeId) {
        return ResponseEntity.ok(challengeService.getChallengeById(challengeId));
    }

    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges() {
        List<Challenge> challenges = challengeService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    @PostMapping
    public ResponseEntity<Challenge> addChallenge(@RequestBody Challenge challenge) {
        return ResponseEntity.ok(challengeService.addChallenge(challenge));
    }

    @PutMapping("/{challengeId}")
    public ResponseEntity<Challenge> updateChallenge(@RequestBody Challenge challenge,
            @PathVariable Long challengeId) {
        Challenge existingChallenge = challengeService.getChallengeById(challengeId);
        challenge.setChallenges(existingChallenge.getChallenges());
        challenge.setId(challengeId);
        return ResponseEntity.ok(challengeService.updateChallenge(challenge));
    }

    @DeleteMapping("/{challengeId}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long challengeId) {
        challengeService.deleteChallenge(challengeId);
        return ResponseEntity.ok().build();
    }
}
