package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gamified.gamified.Entities.Specialist;
import gamified.gamified.Repositories.SpecialistRepository;

@Service
@Transactional
public class SpecialistService {
    @Autowired
    SpecialistRepository specialistRepository;

    public List<Specialist> getAllSpecialists() {
        return specialistRepository.findAll();
    }

    public Specialist getSpecialistById(Long specialistId) {
        return specialistRepository.findById(specialistId).orElse(null);
    }
    

    public Specialist addSpecialist(Specialist specialist) {
        return specialistRepository.save(specialist);
    }

    public Specialist updateSpecialist(Specialist specialist) {
        return specialistRepository.save(specialist);
    }

    public void deleteSpecialist(Long specialistId) {
        specialistRepository.deleteById(specialistId);
    }

    public Long countaccounts(){
        return specialistRepository.count();
    }
}
