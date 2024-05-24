package com.example.PTTK.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class DetailBill {
	private int id;
	private String method;
	private String bank;
	private String bankID;
	private float price;
	private Date date;
	private int state;
	private float cost;
	private float fine;
	private Date cusStart;
	private Date cusEnd;
	private int dealine;
	private List<CarError> listCarError;
	private Car car;
	private Customer customer;
	private int totalTime;
	private float totalCost;
	
	public int getTotalTime() {
		if(cusEnd!=null && cusStart!=null)
			return (int) ((cusEnd.getTime() - cusStart.getTime())/(60*60*24*1000));
		else return 0;
	}
	public float getTotalCost() {
		return cost+fine;
	}

//	public void setTotalTime() {
//		this.totalTime = (int) ((cusEnd.getTime() - cusStart.getTime())/(60*60*24*1000));
//	}

	public DetailBill() {
		listCarError = new ArrayList<CarError>();
	}
	
	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
	public String getBankID() {
		return bankID;
	}
	public void setBankID(String bankID) {
		this.bankID = bankID;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
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
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public float getFine() {
		return fine;
	}
	public void setFine(float fine) {
		this.fine = fine;
	}
	public Date getCusStart() {
		return cusStart;
	}
	public void setCusStart(Date cusStart) {
		this.cusStart = cusStart;
	}
	public Date getCusEnd() {
		return cusEnd;
	}
	public void setCusEnd(Date cusEnd) {
		this.cusEnd = cusEnd;
	}
	public int getDealine() {
		return dealine;
	}
	public void setDealine(int dealine) {
		this.dealine = dealine;
	}
	public List<CarError> getListCarError() {
		return listCarError;
	}
	public void setListCarError(List<CarError> listCarError) {
		this.listCarError = listCarError;
	}
	public Car getCar() {
		return car;
	}
	public void setCar(Car car) {
		this.car = car;
	}
	
}
