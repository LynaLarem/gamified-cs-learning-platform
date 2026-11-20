package gamified.gamified.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gamified.gamified.Entities.Student;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByFirstnameOrLastname(String fname, String lname);

    @Query("SELECT s.hearts FROM Student s WHERE s.id = :studentId")
    Long findHeartsById(@Param("studentId") Long studentId);

    @Modifying
    @Query("UPDATE Student s SET s.hearts = s.hearts - 1 WHERE s.id = :studentId")
    void decrementHeartsById(@Param("studentId") Long studentId);

    @Modifying
    @Query("UPDATE Student s SET s.hearts = s.hearts + 1 WHERE s.id = :studentId")
    void incrementHeartsById(@Param("studentId") Long studentId);

    @Modifying
    @Query("UPDATE Student s SET s.score = s.score + :addscore WHERE s.id = :studentId")
    void incrementScoreById(@Param("studentId") Long studentId, @Param("addscore") Long addscore);

    @Modifying
    @Query("UPDATE Student s SET s.xp = s.xp + :addxp WHERE s.id = :studentId")
    void incrementXPById(@Param("studentId") Long studentId, @Param("addxp") Long addxp);

    @Modifying
    @Query("UPDATE Student s SET s.coins = s.coins + :addcoins WHERE s.id = :studentId")
    void incrementCoinsById(@Param("studentId") Long studentId, @Param("addcoins") Long addcoins);

    @Modifying
    @Query("UPDATE Student s SET s.coins = s.coins - :takecoins WHERE s.id = :studentId")
    void decrementCoinsById(@Param("studentId") Long studentId, @Param("takecoins") Long takecoins);

    @Query("SELECT s.coins FROM Student s WHERE s.id = :studentId")
    Long findCoinsById(@Param("studentId") Long studentId);

    @Query("SELECT s FROM Student s ORDER BY s.score DESC")
    List<Student> getLeaderboard();

    @Query("SELECT COUNT(s) FROM Student s WHERE s.studylvl = :studyLevel")
    Long countByStudyLevel(@Param("studyLevel") String studyLevel);
    
    // @Query("SELECT s, e FROM Student s JOIN s.enrollments e WHERE e.course.id = :courseId")
    // List<Object[]> findByCourseIdWithEnrollments(Long courseId);

    @Query("SELECT s.itemsbought FROM Student s WHERE s.id = :studentId")
    Integer findBoughtitems(@Param("studentId") Long studentId);

    @Modifying
    @Query("UPDATE Student s SET s.itemsbought = s.itemsbought + 1 WHERE s.id = :studentId")
    void incrementBoughtitemsById(@Param("studentId") Long studentId);
    
}
