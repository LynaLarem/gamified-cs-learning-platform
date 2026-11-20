package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
