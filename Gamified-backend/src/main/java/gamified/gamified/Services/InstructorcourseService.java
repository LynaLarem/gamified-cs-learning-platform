package gamified.gamified.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamified.gamified.Entities.Instructorcourse;
import gamified.gamified.Repositories.InstructorcourseRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class InstructorcourseService {
    @Autowired
    InstructorcourseRepository instructorcourseRepository;
    public Instructorcourse getinstructorcourseId(Long instructorcourseId) {
        return instructorcourseRepository.findById(instructorcourseId).orElse(null);
    }

    public List<Instructorcourse> getAllinstructorcourses() {
        return instructorcourseRepository.findAll();
    }

    public Instructorcourse addinstructorcourse(Instructorcourse instructorcourseId) {
        return instructorcourseRepository.save(instructorcourseId);
    }

    public Instructorcourse updateinstructorcourse(Instructorcourse instructorcourseId) {
        return instructorcourseRepository.save(instructorcourseId);
    }

    public void deleteinstructorcourse(Long instructorId, Long courseId) {
        instructorcourseRepository.deleteByInstructorIdAndCourseId(instructorId,courseId);
    }

    public List<Instructorcourse> getInstructorTaughtCourses(Long instructorId) {
        return instructorcourseRepository.findByInstructorId(instructorId);
    }

    public Instructorcourse isTaught(Long instructorId, Long courseId) {
        return instructorcourseRepository.findByInstructorIdAndCourseId(instructorId, courseId);
    }

    public Instructorcourse addInstructorcourse(Instructorcourse instructorcourse) {
        return instructorcourseRepository.save(instructorcourse);
    }

    public void deleteInstructorcourseByCourseIdAndInstructorId(Long courseId, Long instructorId) {
        instructorcourseRepository.deleteByCourseIdAndInstructorId(courseId, instructorId);
    }
}
