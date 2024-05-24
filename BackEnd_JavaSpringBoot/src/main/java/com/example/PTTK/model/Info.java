package com.example.PTTK.model;

import java.sql.Date;

public class Info {
	private int id;
	private String name;
	private Date dob;
	private String sdt;
	private String cccd;
	private String email;
	private String addr;
	private String bank;
	private String bankID;
	public Info() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Info(int id, String name, Date dob, String sdt, String cccd, String email, String addr, String bank,
			String bankID) {
		super();
		this.id = id;
		this.name = name;
		this.dob = dob;
		this.sdt = sdt;
		this.cccd = cccd;
		this.email = email;
		this.addr = addr;
		this.bank = bank;
		this.bankID = bankID;
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
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getSdt() {
		return sdt;
	}
	public void setSdt(String sdt) {
		this.sdt = sdt;
	}
	public String getCccd() {
		return cccd;
	}
	public void setCccd(String cccd) {
		this.cccd = cccd;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
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
	
}
