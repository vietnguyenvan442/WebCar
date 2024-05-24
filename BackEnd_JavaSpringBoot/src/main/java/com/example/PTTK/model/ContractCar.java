package com.example.PTTK.model;


public class ContractCar {
	private int id;
	private float price;
	private float cost;
	private Car car;
	public ContractCar() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ContractCar(int id, float price, float cost, Car car) {
		super();
		this.id = id;
		this.price = price;
		this.cost = cost;
		this.car = car;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public Car getCar() {
		return car;
	}
	public void setCar(Car car) {
		this.car = car;
	}
	
}
