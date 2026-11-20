package gamified.gamified.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import gamified.gamified.Entities.Instructor;
import gamified.gamified.Repositories.InstructorRepository;
import java.util.List;

@Service
@Transactional
public class InstructorService {
    @Autowired
    InstructorRepository instructorRepository;

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructorById(Long instructorId) {
        return instructorRepository.findById(instructorId).orElse(null);
    }

    public Instructor addInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }

    public void deleteInstructor(Long instructorId) {
        instructorRepository.deleteById(instructorId);
    }

    public List<Instructor> findByfirstNameOrlastName(String searchwith) {
        return instructorRepository.findByFirstnameOrLastname(searchwith, searchwith);
    }

    public Long countaccounts(){
        return instructorRepository.count();
    }
}
