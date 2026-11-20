package gamified.gamified.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamified.gamified.Entities.Specialist;
import gamified.gamified.Services.SpecialistService;

@RestController
@RequestMapping("/specialist")
@CrossOrigin("http://localhost:3000")
public class SpecialistController {
    @Autowired
    private SpecialistService specialistService;
    @Autowired
    private PasswordEncoder passwordEncoder;

      @GetMapping("/{specialistId}")
    public ResponseEntity<Specialist> getSpecialistById(@PathVariable Long specialistId) {
        return ResponseEntity.ok(specialistService.getSpecialistById(specialistId));
    }

    @GetMapping
    public ResponseEntity<List<Specialist>> getAllSpecialists() {
        List<Specialist> specialists = specialistService.getAllSpecialists();
        return ResponseEntity.ok(specialists);
    }

    @PostMapping
    public ResponseEntity<Specialist> addSpecialist(@RequestBody Specialist specialist) {
        String w = specialist.getPassword();
        specialist.setPassword(passwordEncoder.encode(w));
        return ResponseEntity.ok(specialistService.addSpecialist(specialist));
    }

    @PutMapping("/{specialistId}")
    public ResponseEntity<Specialist> updateSpecialist(@RequestBody Specialist specialist,
            @PathVariable Long specialistId) {
        Specialist existingSpecialist = specialistService.getSpecialistById(specialistId);
        specialist.setCourses(existingSpecialist.getCourses());
        specialist.setId(specialistId);
        return ResponseEntity.ok(specialistService.updateSpecialist(specialist));
    }

    @DeleteMapping("/{specialistId}")
    public ResponseEntity<Void> deleteSpecialist(@PathVariable Long specialistId) {
        specialistService.deleteSpecialist(specialistId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> countaccounts() { 
        return ResponseEntity.ok(specialistService.countaccounts());
    }
}
