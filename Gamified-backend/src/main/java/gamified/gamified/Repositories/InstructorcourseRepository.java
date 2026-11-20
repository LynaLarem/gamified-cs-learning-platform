package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gamified.gamified.Entities.Instructorcourse;

public interface InstructorcourseRepository extends JpaRepository<Instructorcourse, Long> {
    Instructorcourse findByInstructorIdAndCourseId(Long instructorId, Long courseId);
    void deleteByInstructorIdAndCourseId(Long instructorId, Long courseId);

     List<Instructorcourse> findByInstructorId(Long instructorId);

     void deleteByCourseIdAndInstructorId(Long courseId, Long instructorId);

}
