package com.example.reto2m2.Repository;

import com.example.reto2m2.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByEmailAndPassword (String email, String password);

    Optional<User> getUserByZoneAndType (String zone, String type);  //Traer los usuarios por zona y tipo (para los COOR)

    List<User> findAllByZoneAndType (String zone, String type);  // Trae Usuarios por zona y por tipo (para los ASE)

}
