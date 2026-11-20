package gamified.gamified.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamified.gamified.Entities.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("SELECT g.steporder FROM Game g WHERE g.id = :gameId")
    Integer findsteporderById(@Param("gameId") Long gameId);
}
