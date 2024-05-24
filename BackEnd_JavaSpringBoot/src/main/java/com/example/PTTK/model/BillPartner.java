package com.example.PTTK.model;

import java.util.ArrayList;
import java.util.List;

public class BillPartner {
	private int id;
	private float totalRent;
	private float totalCost;
	private Manager manager;
	private Partner partner;
	private List<DetailBill> listDetailBill;
	public BillPartner() {
		listDetailBill = new ArrayList<DetailBill>();
	}
	public BillPartner(int id, float totalRent, float totalCost, Manager manager, Partner partner,
			List<DetailBill> listDetailBill) {
		super();
		this.id = id;
		this.totalRent = totalRent;
		this.totalCost = totalCost;
		this.manager = manager;
		this.partner = partner;
		this.listDetailBill = listDetailBill;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getTotalRent() {
		return totalRent;
	}
	public void setTotalRent(float totalRent) {
		this.totalRent = totalRent;
	}
	public float getTotalCost() {
		return totalCost;
	}
	public void setTotalCost(float totalCost) {
		this.totalCost = totalCost;
	}
	public Manager getManager() {
		return manager;
	}
	public void setManager(Manager manager) {
		this.manager = manager;
	}
	public Partner getPartner() {
		return partner;
	}
	public void setPartner(Partner partner) {
		this.partner = partner;
	}
	public List<DetailBill> getListDetailBill() {
		return listDetailBill;
	}
	public void setListDetailBill(List<DetailBill> listDetailBill) {
		this.listDetailBill = listDetailBill;
	}
	
}
