package gamified.gamified.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamified.gamified.Entities.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAllByStudentIdAndQuantityGreaterThan(Long studentId, Integer quantity);

    Inventory findByStudentIdAndItemId(Long studentId, Long itemId);

    void deleteByStudentIdAndItemId(Long studentId, Long itemId);

    @Modifying
    @Query(value="UPDATE Inventory SET quantity = quantity + 1 WHERE student_id = :studentId and item_id = :itemId", nativeQuery = true)
    void incrementQteById(@Param("studentId") Long studentId, @Param("itemId") Long itemId);

    @Query(value="SELECT EXISTS (SELECT 1 FROM inventory WHERE student_id = :studentId and item_id = :itemId)", nativeQuery = true)
    Integer itemInInventory(@Param("studentId") Long studentId, @Param("itemId") Long itemId);
    
    @Query("SELECT i.quantity FROM Inventory i WHERE i.student.id = :studentId AND i.item.id = :itemId")
    Integer findQuantityByStudentIdAndItemId(@Param("studentId") Long studentId, @Param("itemId") Long itemId);

    @Modifying
    @Query("UPDATE Inventory i SET i.quantity = i.quantity - 1 WHERE i.student.id = :studentId AND i.item.id = :itemId AND i.quantity > 0")
    void decreaseQuantityByOne(@Param("studentId") Long studentId, @Param("itemId") Long itemId);

}
