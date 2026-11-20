package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gamified.gamified.Entities.Store;
import gamified.gamified.Repositories.StoreRepository;

@Service
@Transactional
public class StoreService {
    @Autowired
    StoreRepository storeRepository;

    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store getStoreById(Long storeId) {
        return storeRepository.findById(storeId).orElse(null);
    }

    public Store addStore(Store store) {
        return storeRepository.save(store);
    }

    public Store updateStore(Store store) {
        return storeRepository.save(store);
    }

    public void deleteStore(Long storeId) {
        storeRepository.deleteById(storeId);
    }
    
}
