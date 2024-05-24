package com.example.PTTK.model;

import java.sql.Date;

public class CarError {
	private int id;
	private Date date;
	private int state;
	private float price;
	private Error error;
	public CarError() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CarError(int id, Date date, int state, float price, Error error) {
		super();
		this.id = id;
		this.date = date;
		this.state = state;
		this.price = price;
		this.error = error;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public Error getError() {
		return error;
	}
	public void setError(Error error) {
		this.error = error;
	}
	
}
