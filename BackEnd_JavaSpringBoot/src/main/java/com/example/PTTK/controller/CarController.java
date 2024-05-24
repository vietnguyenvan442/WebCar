package com.example.PTTK.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.CarDAO;
import com.example.PTTK.model.Car;

@RestController
@CrossOrigin
public class CarController {

	@GetMapping("/listcar")
	public List<Car> getPartners() {
		CarDAO cdao = new CarDAO();
		List<Car> cars = cdao.getListCar();
		return cars;
	}
}
