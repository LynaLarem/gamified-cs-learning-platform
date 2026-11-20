package gamified.gamified.Repositories;

import gamified.gamified.Entities.Account;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByemail(String username);

    boolean existsByEmail(String email);
        @Query("SELECT COUNT(a) FROM Account a WHERE a.gender = :gender")
    Long countByGender(@Param("gender") String gender);
}
