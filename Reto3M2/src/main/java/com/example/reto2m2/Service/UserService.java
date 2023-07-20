package com.example.reto2m2.Service;

import com.example.reto2m2.Model.User;
import com.example.reto2m2.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.IllegalFormatCodePointException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {   //Metodo para listar usuarios
        return userRepository.findAll();
    }

    public User getUser(int id) {   //Metodo para listar un usuario especifico
        Optional<User> userEncontrado = userRepository.findById(id);
        if (userEncontrado.isPresent()) {
            return userEncontrado.get();
        } else {
            System.out.println("No se encontro el usuario con el id: " + id);
            return new User();
        }
    }

    public User save(User user) { //Metodo para guardar usuario
        return userRepository.save(user);
    }

    public User update(User user) { //Metodo para actualizar usuario
        if (user.getId() != null) {
            Optional<User> userEncontrado = userRepository.findById(user.getId());
            if (userEncontrado.isPresent()) {
                if (user.getIdentification() != null) {
                    userEncontrado.get().setName(user.getIdentification());
                }
                if (user.getName() != null) {
                    userEncontrado.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userEncontrado.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userEncontrado.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userEncontrado.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userEncontrado.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userEncontrado.get().setZone(user.getZone());
                }
                if (user.getType() != null) {
                    userEncontrado.get().setType(user.getType());
                }
                return userRepository.save(userEncontrado.get());
            }
        } else {
            return user;
        }
        return user;
    }

    public boolean delete(int id){  //Metodo para eliminar usuario
        Boolean respuesta = userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return true;
        }) .orElse(false);
        return respuesta;
    }

    public boolean emailExiste(String email){ //Meotodo para validar si el email existe
        Optional<User> userEncontrado = userRepository.getUserByEmail(email);
        return userEncontrado.isPresent();
    }

    public User authUser(String email, String password){  //Metodo para autentica el usuario
        Optional<User>  userEncontrado = userRepository.getUserByEmailAndPassword(email,password);
        if (userEncontrado.isPresent()){
            return userEncontrado.get();
        }else {
            return new User();  //se retorna un nuevo usuario con los artributos en null
        }
    }


    public User getZoneCoordinator(String zone){  //Obtener coordinador de zona
        Optional<User> coordEncontrado = userRepository.getUserByZoneAndType (zone, "COORD");
        if (coordEncontrado.isPresent()){
            return coordEncontrado.get();
        }else {
            return new User();
        }
    }

    public boolean zoneHasSalesMen(String zone){  // Encontrar asesores de una zona y con tipo asesor
        List<User> salesMen = userRepository.findAllByZoneAndType (zone, "ASE");
        return !salesMen.isEmpty();  //Se retorna si la lista esta vacia
    }




}

