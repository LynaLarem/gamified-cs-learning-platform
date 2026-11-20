package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long>{
    
}
