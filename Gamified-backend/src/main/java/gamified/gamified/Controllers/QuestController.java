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
import gamified.gamified.Entities.Quest;
import gamified.gamified.Services.GameService;
import gamified.gamified.Services.QuestService;

@RestController
@RequestMapping("/quest")
@CrossOrigin("http://localhost:3000")
public class QuestController {
    @Autowired
    private QuestService questService;

    @Autowired
    private GameService gameService;

    @GetMapping("/{questId}")
    public ResponseEntity<Quest> getQuestbyid(@PathVariable Long questId) {
        return ResponseEntity.ok(questService.getQuestById(questId));
    }

    @GetMapping
    public ResponseEntity<List<Quest>> getAllQuests() {
        List<Quest> quests = questService.getAllQuests();
        return ResponseEntity.ok(quests);
    }

    @GetMapping("/gamequests/{gameId}")
    public ResponseEntity<List<Long>> getgamequests(@PathVariable Long gameId) {
        return ResponseEntity.ok( questService.getgamequests(gameId));
    }

    @PostMapping("/game/{gameId}")
    public ResponseEntity<Quest> addQuest(@PathVariable Long gameId, @RequestBody Quest quest) {
        Game game = gameService.getGameById(gameId);
        quest.setGame(game);
        return ResponseEntity.ok(questService.addQuest(quest));
    }

    @PutMapping("/{questId}")
    public ResponseEntity<Quest> updateQuest(@RequestBody Quest quest,
            @PathVariable Long questId) {
        Quest existingQuest = questService.getQuestById(questId);
        quest.setGame(existingQuest.getGame());
        quest.setId(questId);
        return ResponseEntity.ok(questService.updateQuest(quest));
    }

    @DeleteMapping("/{questId}")
    public ResponseEntity<Void> deleteQuest(@PathVariable Long questId) {
        questService.deleteQuest(questId);
        return ResponseEntity.ok().build();
    }
}
