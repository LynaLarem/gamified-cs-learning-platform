package gamified.gamified.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    
}
