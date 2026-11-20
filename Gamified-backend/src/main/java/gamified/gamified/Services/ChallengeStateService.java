package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gamified.gamified.Entities.Challenge_state;
import gamified.gamified.Entities.Enumeration.ChallengeType;
import gamified.gamified.Repositories.ChallengeStateRepository;

@Service
@Transactional
public class ChallengeStateService {
    @Autowired
    ChallengeStateRepository challengestateRepository;

    public List<Challenge_state> getAllInventories() {
        return challengestateRepository.findAll();
    }

    public List<Challenge_state> getStudentChallenge_state(Long studentId) {
        return challengestateRepository.findAllByStudentId(studentId);
    }

    public List<Challenge_state> getStudentChallenge_stateByType(Long studentId, ChallengeType type) {
        return challengestateRepository.findAllByStudentIdAndType(studentId, type);
    }

    public Challenge_state getChallenge_stateByStudentIdAndChallengeId(Long studentId, Long challengetId) {
        return challengestateRepository.findByStudentIdAndChallengeId(studentId, challengetId);
    }

    public Challenge_state addChallenge_state(Challenge_state challengestate) {
        return challengestateRepository.save(challengestate);
    }

    public Challenge_state updateChallenge_state(Challenge_state challengestate) {
        return challengestateRepository.save(challengestate);
    }

    public void deleteChallenge_state(Long studentId, Long challengetId) {
        challengestateRepository.deleteByStudentIdAndChallengeId(studentId, challengetId);
    }

    public void incrementProgress(Long studentId, Long challengetId) {
        challengestateRepository.incrementProgress(studentId, challengetId);
    }
}
