package gamified.gamified.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import gamified.gamified.Entities.Inventory;
import gamified.gamified.Repositories.InventoryRepository;
import java.util.List;

@Service
@Transactional
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getStudentInventory(Long studentId) {
        return inventoryRepository.findAllByStudentIdAndQuantityGreaterThan(studentId, 0);
    }

    public Inventory getInventoryByStudentIdAndItemId(Long studentId, Long itemtId) {
        return inventoryRepository.findByStudentIdAndItemId(studentId, itemtId);
    }

    public Inventory addInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long studentId, Long itemtId) {
        inventoryRepository.deleteByStudentIdAndItemId(studentId, itemtId);
    }

    public void incrementQteById(Long studentId, Long itemId) {
        inventoryRepository.incrementQteById(studentId, itemId);
    }

    public Integer itemInInventory(Long studentId, Long itemId){
        return inventoryRepository.itemInInventory(studentId, itemId);
    }

    public Integer getquantity(Long studentId, Long itemtId){
        return inventoryRepository.findQuantityByStudentIdAndItemId(studentId,itemtId);
    }
    public void decreaseQuantityByOne(Long studentId, Long itemtId){
        inventoryRepository.decreaseQuantityByOne(studentId,itemtId);
    }
}
