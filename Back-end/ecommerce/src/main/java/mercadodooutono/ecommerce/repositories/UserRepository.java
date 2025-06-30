package mercadodooutono.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import mercadodooutono.ecommerce.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);
}
