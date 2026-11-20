package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamified.gamified.Entities.Admin;
import gamified.gamified.Repositories.AdminRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminService {
    @Autowired
    AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId).orElse(null);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}
