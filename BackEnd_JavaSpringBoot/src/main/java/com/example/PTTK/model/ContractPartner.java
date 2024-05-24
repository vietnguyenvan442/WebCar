package com.example.PTTK.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ContractPartner {
	private int id;
	private Date date;
	private String terms;
	private Manager manager;
	private Partner partner;
	private List<ContractCar> listContractCar;
	public ContractPartner() {
		listContractCar = new ArrayList<ContractCar>();
	}
	public ContractPartner(int id, Date date, String terms, Manager manager, Partner partner,
			List<ContractCar> listContractCar) {
		super();
		this.id = id;
		this.date = date;
		this.terms = terms;
		this.manager = manager;
		this.partner = partner;
		this.listContractCar = listContractCar;
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
	public String getTerms() {
		return terms;
	}
	public void setTerms(String terms) {
		this.terms = terms;
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
	public List<ContractCar> getListContractCar() {
		return listContractCar;
	}
	public void setListContractCar(List<ContractCar> listContractCar) {
		this.listContractCar = listContractCar;
	}
	
}
