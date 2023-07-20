package com.example.reto2m2.Service;

import com.example.reto2m2.Model.Order;
import com.example.reto2m2.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public Order getOrder(int id) {
        Optional<Order> orderEncontrado = orderRepository.findById(id);
        if (orderEncontrado.isPresent()) {
            return orderEncontrado.get();
        } else {
            System.out.println("No se encontro pedido con el id: " + id);
            return new Order();
        }
    }

    public Order save(Order order) { //Metodo para guardar usuario
        return orderRepository.save(order);
    }

    public Order update(Order order) {
        if (order.getId() != null) {
            Optional<Order> orderEncontrado = orderRepository.findById((order.getId()));
            if (orderEncontrado.isPresent()) {
                if (order.getRegisterDay() != null) {
                    orderEncontrado.get().setRegisterDay(order.getRegisterDay());
                }
                if (order.getStatus() != null) {
                        orderEncontrado.get().setStatus(order.getStatus());
                    }
                if (order.getSalesMan() != null) {
                        orderEncontrado.get().setSalesMan(order.getSalesMan());
                    }
                if (order.getProducts() != null) {
                        orderEncontrado.get().setProducts(order.getProducts());
                    }
                if (order.getQuantities() != null) {
                        orderEncontrado.get().setQuantities(order.getQuantities());
                    }
                return orderRepository.save(orderEncontrado.get());
            }
        } else {
            return order;
        }
        return order;
    }

        public boolean delete ( int id){  //Metodo para eliminar usuario
            Boolean respuesta = orderRepository.findById(id).map(order -> {
                orderRepository.delete(order);
                return true;
            }).orElse(false);
            return respuesta;
        }

        public List<Order> getOrdersByzone (String zone){  //Metodo para encontrar las ordenes por zona
        return orderRepository.findAllBySalesMan_Zone (zone);
    }


}