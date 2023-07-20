package com.example.reto2m2.Service;

import com.example.reto2m2.Model.Gadget;
import com.example.reto2m2.Repository.GadgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GadgetService {
    @Autowired
    private GadgetRepository gadgetRepository;
    
    public List<Gadget> getAll() {   //Metodo para listar usuarios
        return gadgetRepository.findAll();
    }

    public Gadget getGadget(int id) {   //Metodo para listar un usuario especifico
        Optional<Gadget> gadgetEncontrado = gadgetRepository.findById(id);
        if (gadgetEncontrado.isPresent()) {
            return gadgetEncontrado.get();
        } else {
            System.out.println("No se encontro el producto con el id: " + id);
            return new Gadget();
        }
    }

    public Gadget save(Gadget Gadget) { //Metodo para guardar usuario
        return gadgetRepository.save(Gadget);
    }

    public Gadget update(Gadget Gadget) { //Metodo para actualizar usuario
        if (Gadget.getId() != null) {
            Optional<Gadget> gadgetEncontrado = gadgetRepository.findById(Gadget.getId());
            if (gadgetEncontrado.isPresent()) {
                if (Gadget.getBrand() != null) {
                    gadgetEncontrado.get().setBrand(Gadget.getBrand());
                }
                if (Gadget.getCategory() != null) {
                    gadgetEncontrado.get().setCategory(Gadget.getCategory());
                }
                if (Gadget.getName() != null) {
                    gadgetEncontrado.get().setName(Gadget.getName());
                }
                if (Gadget.getDescription() != null) {
                    gadgetEncontrado.get().setDescription(Gadget.getDescription());
                }
                if (Gadget.getPrice() != null) {
                    gadgetEncontrado.get().setPrice(Gadget.getPrice());
                }
                if (Gadget.getAvailability() != null) {
                    gadgetEncontrado.get().setAvailability(Gadget.getAvailability());
                }
                if (Gadget.getQuantity() != null) {
                    gadgetEncontrado.get().setQuantity(Gadget.getQuantity());
                }
                if (Gadget.getPhotography() != null) {
                    gadgetEncontrado.get().setPhotography(Gadget.getPhotography());
                }
                return gadgetRepository.save(gadgetEncontrado.get());
            }
        } else {
            return Gadget;
        }
        return Gadget;
    }

    public boolean delete(int id){  //Metodo para eliminar usuario
        Boolean respuesta = gadgetRepository.findById(id).map(Gadget -> {
            gadgetRepository.delete(Gadget);
            return true;
        }) .orElse(false);
        return respuesta;
    }
    
}
