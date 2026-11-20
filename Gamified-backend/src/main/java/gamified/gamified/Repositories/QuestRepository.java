package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import gamified.gamified.Entities.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {
    @Query("SELECT q.id FROM Quest q WHERE q.game.id = :gameId ORDER BY q.questorder")
    List<Long> getgamequests(Long gameId);
}
