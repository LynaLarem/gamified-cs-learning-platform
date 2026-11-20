package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import gamified.gamified.Entities.Store;

public interface StoreRepository extends JpaRepository<Store, Long>{
    
}
