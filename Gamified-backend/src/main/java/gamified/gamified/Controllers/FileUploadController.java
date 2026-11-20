package gamified.gamified.Controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileUploadController {

   @PostMapping("/upload")
public String uploadFile(@RequestParam("file") MultipartFile file) {
    try {
        // Vérifiez si le fichier n'est pas vide
        if (!file.isEmpty()) {
            // Récupérez le nom du fichier
            String fileName = file.getOriginalFilename();

            // Sauvegardez le fichier dans le système de fichiers ou enregistrez-le en base de données
            // Exemple de sauvegarde dans le système de fichiers
            Files.copy(file.getInputStream(), Paths.get("C:\\Users\\j\\Desktop\\L3 GL\\semestre 2\\MEMOIRE\\implementation\\Gamified-frontend-main\\Gamified-frontend\\src\\Courses\\course images" + fileName), StandardCopyOption.REPLACE_EXISTING);

            // Retournez une réponse appropriée
            return "File uploaded successfully!";
        } else {
            return "Failed to upload file: File is empty!";
        }
    } catch (IOException e) {
        return "Failed to upload file: " + e.getMessage();
    }
}

}

