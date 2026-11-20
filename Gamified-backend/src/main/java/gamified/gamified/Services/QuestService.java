package gamified.gamified.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import gamified.gamified.Entities.Quest;
import gamified.gamified.Repositories.QuestRepository;

@Service
@Transactional
public class QuestService {
    @Autowired
    QuestRepository questRepository;

    public Quest getQuestById(Long questId) {
        return questRepository.findById(questId).orElse(null);
    }

    public List<Quest> getAllQuests() {
        return questRepository.findAll();
    }

    public Quest addQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public Quest updateQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public void deleteQuest(Long questId) {
        questRepository.deleteById(questId);
    }

    public List<Long> getgamequests(Long questId) {
        return questRepository.getgamequests(questId);
    }
}
