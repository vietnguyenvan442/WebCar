package com.example.PTTK.model;

public class Error {
	private int id;
	private String name;
	public Error() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Error(int id, String name) {
		super();
		this.id = id;
		this.name = name;
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
	
}
