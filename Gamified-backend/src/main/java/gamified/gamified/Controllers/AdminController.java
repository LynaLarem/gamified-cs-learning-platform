package gamified.gamified.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamified.gamified.Entities.Admin;
import gamified.gamified.Services.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/adminId")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long adminId) {
        return ResponseEntity.ok(adminService.getAdminById(adminId));
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @PostMapping
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        String w = admin.getPassword();
        admin.setPassword(passwordEncoder.encode(w));
        return ResponseEntity.ok(adminService.addAdmin(admin));
    }

    @PutMapping("/{adminId}")
    public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin,
            @PathVariable Long adminId) {
        Admin existingAdmin = adminService.getAdminById(adminId);
        admin.setItems(existingAdmin.getItems());
        admin.setChallenges(existingAdmin.getChallenges());
        admin.setId(adminId);
        return ResponseEntity.ok(adminService.updateAdmin(admin));
    }

    @DeleteMapping("/{adminId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long adminId) {
        adminService.deleteAdmin(adminId);
        return ResponseEntity.ok().build();
    }
    
}
