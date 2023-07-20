package com.example.reto2m2.Controller;

import com.example.reto2m2.Model.Gadget;
import com.example.reto2m2.Service.GadgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gadget")
public class GadgetController {

    @Autowired
    private GadgetService gadgetService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget save(@RequestBody Gadget gadget){  //Metodo para Guardar usuario
        return gadgetService.save(gadget);
    }

    @GetMapping("/all")
    public List<Gadget> getAll(){  //Metodo para traer todos los usuarios
        return gadgetService.getAll();
    }

    @GetMapping("/{id}")
    public Gadget getgadget(@PathVariable int id){  //Metodo para traer el usuario con el id
        return gadgetService.getGadget(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget update(@RequestBody Gadget gadget){   //Metodo para actualizar
        return gadgetService.update(gadget);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id){  //Metodo para eliminar usuario
        gadgetService.delete(id);
    }


}
