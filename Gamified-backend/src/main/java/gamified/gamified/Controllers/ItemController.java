package gamified.gamified.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gamified.gamified.Entities.Item;
import gamified.gamified.Services.CategoryService;
import gamified.gamified.Services.ItemService;
import java.util.List;

@RestController
@RequestMapping("/item")
@CrossOrigin("http://localhost:3000")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{category_id}")
    public ResponseEntity<Item> addItem(@PathVariable Long category_id,@RequestBody Item item) {
        item.setCategory(categoryService.getCategoryById(category_id));
        return ResponseEntity.ok(itemService.addItem(item));
    }

    @PutMapping("/{itemId}/{category_id}")
    public ResponseEntity<Item> updateItem(@RequestBody Item item,@PathVariable Long category_id,
            @PathVariable Long itemId) {
        Item existingItem = itemService.getItemById(itemId);
        item.setAdmin(existingItem.getAdmin());
        item.setCategory(categoryService.getCategoryById(category_id));
        item.setInventory(existingItem.getInventory());
        item.setId(itemId);
        return ResponseEntity.ok(itemService.updateItem(item));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.ok().build();
    }
}
