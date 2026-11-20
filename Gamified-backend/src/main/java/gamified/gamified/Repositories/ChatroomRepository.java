package gamified.gamified.Repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Chatroom;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long>{
    List<Chatroom> findAllByStudentId(Long studentId);

    List<Chatroom> findAllByInstructorId(Long instructorId);

    List<Chatroom> findByStudentIdAndCourseId(Long studentId, Long courseId);

    List<Chatroom> findByCourseId(Long courseId);

    void deleteByStudentIdAndCourseId(Long studentId, Long courseId);

    List<Chatroom> findByInstructorIdAndCourseId(Long instructorId, Long courseId);

    void deleteByInstructorIdAndCourseId(Long instructorId, Long courseId);

    Chatroom findByStudentIdAndCourseIdAndDate(Long studentId, Long coursetId, Date date);

    Chatroom findByInstructorIdAndCourseIdAndDate(Long instructorId, Long coursetId, Date date);
}
