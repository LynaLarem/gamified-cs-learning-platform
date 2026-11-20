package gamified.gamified.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Inventory;
import gamified.gamified.Entities.Item;
import gamified.gamified.Entities.Student;
import gamified.gamified.Services.InventoryService;
import gamified.gamified.Services.ItemService;
import gamified.gamified.Services.StudentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inventory")
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Inventory>> getStudentInventory(@PathVariable Long studentId) {
        return ResponseEntity.ok(inventoryService.getStudentInventory(studentId));
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventories() {
        List<Inventory> inventorys = inventoryService.getAllInventories();
        return ResponseEntity.ok(inventorys);
    }

    @GetMapping("/quantity/{studentId}/{itemId}")
    public ResponseEntity<Integer> getquantity(@PathVariable Long studentId, @PathVariable Long itemId) {
        return ResponseEntity.ok(inventoryService.getquantity(studentId,itemId));
    }

    @PutMapping("/quantity/{studentId}/{itemId}")
    public ResponseEntity<Void> decreaseQuantityByOne(@PathVariable Long studentId, @PathVariable Long itemId) {
        inventoryService.decreaseQuantityByOne(studentId,itemId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{studentId}/{itemId}")
    public ResponseEntity<Inventory> addInventory(@PathVariable Long studentId, @PathVariable Long itemId,
            @RequestBody Inventory inventory) {
        Student student = studentService.getStudentById(studentId);
        Item item = itemService.getItemById(itemId);
        inventory.setStudent(student);
        inventory.setItem(item);
        inventory.setQuantity(1);
        return ResponseEntity.ok(inventoryService.addInventory(inventory));
    }

    @PutMapping("/{studentId}/{itemId}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long studentId, @PathVariable Long itemId,
            @RequestBody Inventory inventory) {
        Inventory existingInventory = inventoryService.getInventoryByStudentIdAndItemId(studentId, itemId);
        inventory.setStudent(existingInventory.getStudent());
        inventory.setItem(existingInventory.getItem());
        inventory.setId(existingInventory.getId());
        return ResponseEntity.ok(inventoryService.updateInventory(inventory));
    }

    @DeleteMapping("/{studentId}/{itemId}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long studentId, @PathVariable Long itemId) {
        inventoryService.deleteInventory(studentId, itemId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/quantityPlus/{studentId}/{itemId}")
    public ResponseEntity<Void> incrementQteById(@PathVariable Long studentId, @PathVariable Long itemId) {
        inventoryService.incrementQteById(studentId, itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exists/{studentId}/{itemId}")
    public Integer itemInInventoryExists(@PathVariable Long studentId, @PathVariable Long itemId) {
        return inventoryService.itemInInventory(studentId, itemId);
    }

    @PatchMapping("/active/{studentId}/{itemId}")
    public ResponseEntity<Inventory> updateActive(@PathVariable Long studentId, @PathVariable Long itemId,
            @RequestBody Map<String, Boolean> activeUpdate) {
       Inventory existingInventory= inventoryService.getInventoryByStudentIdAndItemId(studentId, itemId);
       byte newActive;
            for (Map.Entry<String, Boolean> entry : activeUpdate.entrySet()) {
                if(entry.getValue() == true){
                   newActive = 1;
 
                }else{
                    newActive = 0;
                }
                existingInventory.setActive(newActive);
            }
        
        return ResponseEntity.ok(inventoryService.updateInventory(existingInventory));
    }
}
