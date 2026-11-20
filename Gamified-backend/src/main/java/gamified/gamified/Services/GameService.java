package gamified.gamified.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Game;
import gamified.gamified.Repositories.GameRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class GameService {
    @Autowired
    GameRepository gameRepository;

    public Game getGameById(Long gameId) {
        return gameRepository.findById(gameId).orElse(null);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    public void deleteGame(Long gameId) {
        gameRepository.deleteById(gameId);
    }

    public Integer findsteporder(Long gameId) {
        return gameRepository.findsteporderById(gameId);
    }
}
