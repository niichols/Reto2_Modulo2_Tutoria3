package com.example.reto2m2.Repository;

import com.example.reto2m2.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Integer> {

    public List<Order> findAllBySalesMan_Zone (String zone);  //Metodo para filtrar las ordenes por zona.

}
