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

import gamified.gamified.Entities.Store;
import gamified.gamified.Services.StoreService;

@RestController
@RequestMapping("/store")
@CrossOrigin("http://localhost:3000")
public class StoreController {
    @Autowired
    private StoreService storeService;

    @GetMapping("/{storeId}")
    public ResponseEntity<Store> getStoreById(@PathVariable Long storeId) {
        return ResponseEntity.ok(storeService.getStoreById(storeId));
    }

    @GetMapping
    public ResponseEntity<List<Store>> getAllStores() {
        List<Store> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    @PostMapping
    public ResponseEntity<Store> addStore(@RequestBody Store store) {
        return ResponseEntity.ok(storeService.addStore(store));
    }

    @PutMapping("/{storeId}")
    public ResponseEntity<Store> updateStore(@RequestBody Store store,
            @PathVariable Long storeId) {
        Store existingStore = storeService.getStoreById(storeId);
        store.setItems(existingStore.getItems());
        store.setId(storeId);
        return ResponseEntity.ok(storeService.updateStore(store));
    }

    @DeleteMapping("/{storeId}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long storeId) {
        storeService.deleteStore(storeId);
        return ResponseEntity.ok().build();
    }
    
}
