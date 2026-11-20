package gamified.gamified.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamified.gamified.Entities.Game;
import gamified.gamified.Entities.Level;
import gamified.gamified.Services.GameService;
import gamified.gamified.Services.LevelService;

@RestController
@RequestMapping("/game")
@CrossOrigin("http://localhost:3000")
public class GameController {
    @Autowired
    private GameService gameService;

    @Autowired
    private LevelService levelService;

    @GetMapping("/{gameId}")
    public ResponseEntity<Game> getGameById(@PathVariable Long gameId) {
        return ResponseEntity.ok(gameService.getGameById(gameId));
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @PostMapping("/level/{levelId}")
    public ResponseEntity<Game> addGame(@PathVariable Long levelId, @RequestBody Game game) {
        Level level = levelService.getLevelById(levelId);
        game.setLevel(level);
        return ResponseEntity.ok(gameService.addGame(game));
    }

    @PutMapping("/{gameId}")
    public ResponseEntity<Game> updateGame(@RequestBody Game game,
            @PathVariable Long gameId) {
        Game existingGame = gameService.getGameById(gameId);
        game.setLevel(existingGame.getLevel());
        game.setQuests(existingGame.getQuests());
        game.setSteporder(existingGame.getSteporder());
        game.setSteptype(existingGame.getSteptype());
        game.setId(gameId);
        return ResponseEntity.ok(gameService.updateGame(game));
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long gameId) {
        gameService.deleteGame(gameId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/steporder/{gameId}")
    public ResponseEntity<Integer> findsteporder(@PathVariable Long gameId) {
        return ResponseEntity.ok(gameService.findsteporder(gameId));
    }
}
