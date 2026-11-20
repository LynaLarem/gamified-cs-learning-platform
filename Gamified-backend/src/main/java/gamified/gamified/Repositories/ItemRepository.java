package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import gamified.gamified.Entities.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
