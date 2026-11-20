package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamified.gamified.Entities.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findBySpecialistId(Long teacherId);

    List<Course> findByAvailable(byte available);
    List<Course> findByInstructorcourse_Instructor_Id(Long instructorId);
    List<Course> findByEnrollementsStudentId(Long studentId);

    List<Course> findByAvailableAndDifficulty(byte available, String difficulty);

   // Custom query to find courses available and sorted by name in ascending order
    @Query("SELECT c FROM Course c WHERE c.available = :available ORDER BY c.name")
    List<Course> getAvailableOrderByNameAsc(@Param("available") byte available);

    // Custom query to find courses available and sorted by name in descending order
    @Query("SELECT c FROM Course c WHERE c.available = :available ORDER BY c.name DESC")
    List<Course> getAvailableOrderByNameDesc(@Param("available") byte available);

    List<Course> findByNameContainingIgnoreCase(String searchTerm);
}
