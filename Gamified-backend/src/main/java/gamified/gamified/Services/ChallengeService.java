package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamified.gamified.Entities.Challenge;
import gamified.gamified.Repositories.ChallengeRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ChallengeService {
    @Autowired
    ChallengeRepository challengeRepository;

    public Challenge getChallengeById(Long challengeId) {
        return challengeRepository.findById(challengeId).orElse(null);
    }

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    public Challenge addChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public Challenge updateChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public void deleteChallenge(Long challengeId) {
        challengeRepository.deleteById(challengeId);
    }
    
}
