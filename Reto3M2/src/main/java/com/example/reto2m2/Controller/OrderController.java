package com.example.reto2m2.Controller;

import com.example.reto2m2.Model.Order;
import com.example.reto2m2.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order save(@RequestBody Order order){
        return orderService.save(order);
    }

    @GetMapping("/all")
    public List<Order> getAll(){  //Metodo para traer todas las ordenes
        return orderService.getAll();
    }

    @GetMapping("/{id}")
    public Order getOrder (@PathVariable int id){
        return orderService.getOrder(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order){
        return orderService.update(order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        orderService.delete(id);
    }

    @GetMapping("/zona/{zone}")
    public List<Order> getOrdersByZone(@PathVariable String zone){
        return orderService.getOrdersByzone(zone);
    }

}
