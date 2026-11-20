package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamified.gamified.Entities.Challenge_state;
import gamified.gamified.Entities.Enumeration.ChallengeType;

public interface ChallengeStateRepository extends JpaRepository<Challenge_state, Long>{
    List<Challenge_state> findAllByStudentId(Long studentId);

    @Query("Select c From Challenge_state c Where c.student.id = :studentId and c.challenge.type = :type")
    List<Challenge_state> findAllByStudentIdAndType(Long studentId, ChallengeType type);

    Challenge_state findByStudentIdAndChallengeId(Long studentId, Long challengeId);

    void deleteByStudentIdAndChallengeId(Long studentId, Long challengeId);

    @Modifying
    @Query(value = "UPDATE Challenge_state SET progress = progress + 1 WHERE student_id = :studentId And challenge_id = :challengeId", nativeQuery = true)
    void incrementProgress(@Param("studentId") Long studentId, @Param("challengeId") Long challengeId);
}
