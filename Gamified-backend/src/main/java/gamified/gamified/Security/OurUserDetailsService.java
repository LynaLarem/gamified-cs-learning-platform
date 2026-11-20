package gamified.gamified.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Account;
import gamified.gamified.Repositories.AccountRepository;

@Service
public class OurUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepo.findByemail(username).orElseThrow();
    }

    public Account addOurUsers(Account userr) {
        return accountRepo.save(userr);
    }

    public boolean existsByEmail(String email) {
        return accountRepo.existsByEmail(email);
    }

    public Long countaccounts(){
        return accountRepo.count();
    }
    
    public Long countByGender(String gendre){
        return accountRepo.countByGender(gendre);
    }
}
