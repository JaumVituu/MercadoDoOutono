package mercadodooutono.ecommerce.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import mercadodooutono.ecommerce.models.User;

@Service
public class UserService {
    public ResponseEntity<String> loginUser(User user, User body){
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não encontrado");
        if (!user.getPassword().equals(body.getPassword())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        return ResponseEntity.ok("ok");
    }

    public boolean existingUser(User user){
        if(user != null) return true;
        return false;
    }
}
