package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamified.gamified.Entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    Review findByCourseIdAndStudentId(Long courseId, Long studentId);

    List<Review> findByCourseId(Long courseId);

    void deleteByCourseIdAndStudentId(Long courseId, Long studentId);

    @Query(value = "SELECT AVG(rating) FROM Review WHERE course_id = :courseId", nativeQuery = true)
    Double findAverageRatingByCourseId(@Param("courseId") Long courseId);

}
