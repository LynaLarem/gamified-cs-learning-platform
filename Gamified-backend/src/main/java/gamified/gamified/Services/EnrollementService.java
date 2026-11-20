package gamified.gamified.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Enrollement;
import gamified.gamified.Repositories.EnrollementRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EnrollementService {
    @Autowired
    EnrollementRepository enrollementRepository;

    public Enrollement getEnrollementByCourseIdAndStudentId(Long courseId, Long studentId) {
        return enrollementRepository.findByCourseIdAndStudentId(courseId, studentId);
    }

    public List<Enrollement> getAllEnrollement() {
        return enrollementRepository.findAll();
    }

    public List<Enrollement> getStudentNonCancelledEnrollements(Long studentId) {
        return enrollementRepository.findByStudentIdAndStateNot(studentId, "cancelled");
    }
    
    public List<Enrollement> getCourseEnrollements(Long courseId) {
        return enrollementRepository.findByCourseId(courseId);
    }

    public List<Enrollement> getStudentOnGoingEnrollements(Long studentId) {
        return enrollementRepository.findByStudentIdAndState(studentId, "ongoing");
    }

    public List<Enrollement> getStudentCompletedEnrollements(Long studentId) {
        return enrollementRepository.findByStudentIdAndState(studentId, "completed");
    }

    public List<Enrollement> getStudentCancelledEnrollements(Long studentId) {
        return enrollementRepository.findByStudentIdAndState(studentId, "cancelled");
    }

    public Enrollement addEnrollement(Enrollement enrollement) {
        return enrollementRepository.save(enrollement);
    }

    public Enrollement updateEnrollement(Enrollement enrollement) {
        return enrollementRepository.save(enrollement);
    }

    public void deleteEnrollementByCourseIdAndStudentId(Long courseId, Long studentId) {
        enrollementRepository.deleteByCourseIdAndStudentId(courseId, studentId);
    }

    // public void deleteEnrollement(Long studentId, Long courseId) {
    // enrollementRepository.deleteByCourseIdAndStudentId(courseId,studentId);
    // }

    // public void deleteEnrollementByStudentId(Long studentId) {
    // enrollementRepository.deleteByStudentId(studentId);
    // }

    // public void deleteEnrollementByCourseId(Long courseId) {
    // enrollementRepository.deleteByCourseId(courseId);
    // }

    public String getEnrollStateByStudentIdAndCourseId(Long studentId, Long courseId) {
        return enrollementRepository.getStateByStudentIdAndCourseId(studentId, courseId);
    }

    public List<Enrollement> getCourseLeaderboard(Long courseId) {
        return enrollementRepository.getCourseLeaderboard(courseId);
    }

    public void incrementcorrectanswers(Long studentId, Long courseId) {
        enrollementRepository.incrementcorrectanswersById(studentId, courseId);
    }

    public void incrementcurrentstep(Long studentId, Long courseId) {
        enrollementRepository.incrementcurrentstepById(studentId, courseId);
    }

    public void incrementwronganswers(Long studentId, Long courseId) {
        enrollementRepository.incrementwronganswersById(studentId, courseId);
    }

    public void incrementCompletedlessons(Long studentId, Long courseId) {
        enrollementRepository.incrementCompletedlessonsById(studentId, courseId);
    }

    public void incrementPlayedgames(Long studentId, Long courseId) {
        enrollementRepository.incrementPlayedgamesById(studentId, courseId);
    }

    public Integer findcurrentstep(Long studentId, Long courseId){
        return enrollementRepository.findcurrentstep(studentId, courseId);
    }

    public Long findcompletedlessons(Long studentId, Long courseId){
        return enrollementRepository.findcompletedlessons(studentId, courseId);
    }

    public Long findTotalcompletedlessons(Long studentId){
        return enrollementRepository.findTotalcompletedlessons(studentId);
    }

    public Long findplayedgames(Long studentId, Long courseId){
        return enrollementRepository.findplayedgames(studentId, courseId);
    }

    public Long findTotalplayedgames(Long studentId){
        return enrollementRepository.findTotalplayedgames(studentId);
    }

    // public Integer findTotalcompletedlessons(Long studentId){
    //     return enrollementRepository.findTotalcompletedlessons(studentId);
    // }

    // public Integer findTotalplayedgames(Long studentId){
    //     return enrollementRepository.findTotalplayedgames(studentId);
    // }

    public Integer getEnrollementCountByCourseId(Long courseId) {
        return enrollementRepository.findEnrollementCountByCourseId(courseId);
    }

    public Integer findcorrectanswers(Long studentId, Long courseId){
        return enrollementRepository.findcorrectanswers(studentId, courseId);
    }

    public Integer findwronganswers(Long studentId, Long courseId){
        return enrollementRepository.findwronganswers(studentId, courseId);
    }
}
