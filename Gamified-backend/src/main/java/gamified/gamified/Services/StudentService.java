package gamified.gamified.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gamified.gamified.Entities.LevelUtils;
import gamified.gamified.Entities.Student;
import gamified.gamified.Repositories.StudentRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long studentId) {
        return studentRepository.findById(studentId).orElse(null);
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
    }

    public List<Student> findByfirstNameOrlastName(String searchwith) {
        return studentRepository.findByFirstnameOrLastname(searchwith, searchwith);
    }

    public Long findHeartsByStudentId(Long studentId) {
        return studentRepository.findHeartsById(studentId);
    }

    public void decrementHeartsByStudentId(Long studentId) {
        studentRepository.decrementHeartsById(studentId);
    }

    public LocalDateTime findHeartsDecrementedAtByStudentId(Long studentId) {
        return studentRepository.findById(studentId).map(Student::getHeartsDecrementedAt)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void incrementHeartsByStudentId(Long studentId) {
        studentRepository.incrementHeartsById(studentId);
    }

    public void incrementScoreById(Long studentId, Long addscore) {
        studentRepository.incrementScoreById(studentId, addscore);
    }

    public void incrementXPById(Long studentId, Long addxp) {
        studentRepository.incrementXPById(studentId, addxp);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        int newLevel = LevelUtils.calculateLevel(student.getXp());
        // Update the student's level if it has changed
        if (student.getLevel() != newLevel) {
            student.setLevel(newLevel);
            // Calculate the gold increment based on the new level
            Long goldIncrement = calculateGoldIncrement(newLevel);
            student.setCoins(student.getCoins() + goldIncrement);
        }
        // Save the updated student entity back to the repository
        studentRepository.save(student);
    }
    private Long calculateGoldIncrement(int newLevel) {
        if (newLevel == 2) {
            return 300L;
        } else if (newLevel == 3) {
            return 400L;
        } else if (newLevel >= 4 && newLevel <= 9) {
            return 500L;
        } else if (newLevel >= 10 && newLevel <= 19) {
            return 600L;
        } else if (newLevel >= 20 && newLevel <= 49) {
            return 700L;
        } else if (newLevel >= 50 && newLevel <= 99) {
            return 800L;
        } else if (newLevel >= 100 && newLevel <= 299) {
            return 900L;
        } else {
            return 0L;
        }
    }
    public Long getXpRequiredForLevel(int level) {
        if (level == 1) {
            return 100L;
        } else if (level == 2) {
            return 150L;
        } else if (level >= 3 && level <= 9) {
            return 300L;
        } else if (level >= 10 && level <= 19) {
            return 400L;
        } else if (level >= 20 && level <= 49) {
            return 500L;
        } else if (level >= 50 && level <= 99) {
            return 700L;
        } else if (level >= 100 && level <= 299) {
            return 850L;
        } else {
            return 1000L; // Default XP for levels beyond 299
        }
    }
    
    public Long getXpToNextLevel(Long studentId) {
        // Find the student by ID
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Calculate the current level and the next level XP threshold
        int currentLevel = LevelUtils.calculateLevel(student.getXp());
        Long xpForNextLevel = LevelUtils.getXpForNextLevel(currentLevel);

        // Calculate the XP needed to reach the next level
        return xpForNextLevel - student.getXp();
    }

    public void incrementCoinsById(Long studentId, Long addcoins) {
        studentRepository.incrementCoinsById(studentId, addcoins);
    }

    public void decrementCoinsById(Long studentId, Long takecoins) {
        studentRepository.decrementCoinsById(studentId, takecoins);
    }

    public Long findCoinsByStudentId(Long studentId) {
        return studentRepository.findCoinsById(studentId);
    }

    public List<Student> getLeaderboard() {
        return studentRepository.getLeaderboard();
    }

    public Long countaccounts() {
        return studentRepository.count();
    }

    public Long countByStudyLevel(String stdlvl) {
        return studentRepository.countByStudyLevel(stdlvl);
    }

    // public List<Object[]> getStudentsByCourse(Long courseId) {
    // return studentRepository.findByCourseIdWithEnrollments(courseId);
    // }

    public void incrementBoughtitems(Long studentId) {
        studentRepository.incrementBoughtitemsById(studentId);
    }

    public Integer findBoughtitems(Long studentId){
        return studentRepository.findBoughtitems(studentId);
    }
}
