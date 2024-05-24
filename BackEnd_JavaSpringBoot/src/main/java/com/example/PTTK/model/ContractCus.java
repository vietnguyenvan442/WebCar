package com.example.PTTK.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ContractCus {
	private int id;
	private Date date;
	private Customer customer;
	private Manager manager;
	private List<DetailBill> listDetailBill;
	public ContractCus() {
		listDetailBill = new ArrayList<DetailBill>();
	}
	public ContractCus(int id, Date date, Customer customer, Manager manager, List<DetailBill> listDetailBill) {
		super();
		this.id = id;
		this.date = date;
		this.customer = customer;
		this.manager = manager;
		this.listDetailBill = listDetailBill;
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
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Manager getManager() {
		return manager;
	}
	public void setManager(Manager manager) {
		this.manager = manager;
	}
	public List<DetailBill> getListDetailBill() {
		return listDetailBill;
	}
	public void setListDetailBill(List<DetailBill> listDetailBill) {
		this.listDetailBill = listDetailBill;
	}
	
}
