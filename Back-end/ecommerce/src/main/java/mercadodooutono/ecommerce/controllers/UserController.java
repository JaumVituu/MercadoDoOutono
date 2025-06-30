package mercadodooutono.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mercadodooutono.ecommerce.models.User;
import mercadodooutono.ecommerce.repositories.UserRepository;
import mercadodooutono.ecommerce.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    UserService userSvc;
    
    @GetMapping
    public String teste(){
        return "teste";
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User body){
        User temp = userRepo.findByEmail(body.getEmail()); 
        return userSvc.loginUser(temp, body);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUserIn(@RequestBody User body){
        User temp = userRepo.findByEmail(body.getEmail()); 
        if(userSvc.existingUser(temp)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já existe");
        }
        userRepo.save(body);
        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}
