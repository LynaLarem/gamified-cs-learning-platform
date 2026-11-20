package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import gamified.gamified.Entities.Enrollement;

import java.util.List;

public interface EnrollementRepository extends JpaRepository<Enrollement, Long> {

    Enrollement findByCourseIdAndStudentId(Long courseId, Long studentId);

    List<Enrollement> findByStudentIdAndState(Long studentId, String state);

    List<Enrollement> findByStudentId(Long studentId);

    List<Enrollement> findByCourseId(Long courseId);

    void deleteByCourseIdAndStudentId(Long courseId, Long studentId);

    @Query(value = "SELECT state FROM Enrollement WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    String getStateByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query(value="SELECT * FROM Enrollement e WHERE course_id = :courseId and state = 'ongoing' ORDER BY correctanswers DESC", nativeQuery=true)
    List<Enrollement> getCourseLeaderboard(@Param("courseId") Long courseId);
    @Modifying
    @Query(value = "UPDATE Enrollement SET correctanswers = correctanswers + 1 WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    void incrementcorrectanswersById(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Modifying
    @Query(value = "UPDATE Enrollement SET currentstep = currentstep + 1 WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    void incrementcurrentstepById(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Modifying
    @Query(value = "UPDATE Enrollement SET wronganswers = wronganswers + 1 WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    void incrementwronganswersById(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query("SELECT e.currentstep FROM Enrollement e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    Integer findcurrentstep(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query(value = "SELECT COUNT(*) FROM Enrollement WHERE course_id = :courseId", nativeQuery = true)
    Integer findEnrollementCountByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT e.correctanswers FROM Enrollement e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    Integer findcorrectanswers(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query("SELECT e.wronganswers FROM Enrollement e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    Integer findwronganswers(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query("SELECT e FROM Enrollement e WHERE e.student.id = :studentId AND e.state != :state")
    List<Enrollement> findByStudentIdAndStateNot(Long studentId, String state);

    @Query("SELECT e.completedlessons FROM Enrollement e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    Long findcompletedlessons(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query("SELECT SUM(e.completedlessons) FROM Enrollement e WHERE e.student.id = :studentId")
    Long findTotalcompletedlessons(@Param("studentId") Long studentId);

    @Query("SELECT e.playedgames FROM Enrollement e WHERE e.student.id = :studentId AND e.course.id = :courseId")
    Long findplayedgames(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
////////////////////////////////////////////////////////
    @Query("SELECT SUM(e.playedgames) FROM Enrollement e WHERE e.student.id = :studentId")
    Long findTotalplayedgames(@Param("studentId") Long studentId);

    @Modifying
    @Query(value = "UPDATE Enrollement SET playedgames = playedgames + 1 WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    void incrementPlayedgamesById(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Modifying
    @Query(value = "UPDATE Enrollement SET completedlessons = completedlessons + 1 WHERE student_id = :studentId and course_id = :courseId", nativeQuery = true)
    void incrementCompletedlessonsById(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
}
