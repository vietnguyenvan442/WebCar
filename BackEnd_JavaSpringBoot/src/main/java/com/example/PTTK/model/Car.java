package com.example.PTTK.model;

import java.util.ArrayList;
import java.util.List;

public class Car {
	private int id;
	private String name;
	private String bienSo;
	private String des;
	private List<CarError> listCarError;
	public Car() {
		listCarError = new ArrayList<CarError>();
	}
	public Car(int id, String name, String bienSo, String des, List<CarError> listCarError) {
		super();
		this.id = id;
		this.name = name;
		this.bienSo = bienSo;
		this.des = des;
		this.listCarError = listCarError;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBienSo() {
		return bienSo;
	}
	public void setBienSo(String bienSo) {
		this.bienSo = bienSo;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public List<CarError> getListCarError() {
		return listCarError;
	}
	public void setListCarError(List<CarError> listCarError) {
		this.listCarError = listCarError;
	}
	
}
