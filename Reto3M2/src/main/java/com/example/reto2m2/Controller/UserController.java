package com.example.reto2m2.Controller;

import com.example.reto2m2.Model.User;
import com.example.reto2m2.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user){  //Metodo para Guardar usuario
        return userService.save(user);
    }

    @GetMapping("/all")
    public List<User> getAll(){  //Metodo para traer todos los usuarios
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id){  //Metodo para traer el usuario con el id
        return userService.getUser(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){   //Metodo para actualizar
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id){  //Metodo para eliminar usuario
        userService.delete(id);
    }

    @GetMapping("/emailexist/{email}")
    public boolean emailExist(@PathVariable String email){  //Metodo para validar si existe
        return userService.emailExiste(email);
    }

    @GetMapping("/{email}/{password}")
    public User authUser (@PathVariable String email, @PathVariable String password){ //Metodo para autenticarse
        return userService.authUser(email, password);
    }



}
