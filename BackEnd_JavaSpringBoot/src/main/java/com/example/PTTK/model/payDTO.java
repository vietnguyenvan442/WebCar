package com.example.PTTK.model;

public class payDTO {

	private BillPartner billPartner;
	private DetailBill detailBill;
	
	public payDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public payDTO(BillPartner billPartner, DetailBill detailBill) {
		super();
		this.billPartner = billPartner;
		this.detailBill = detailBill;
	}
	public BillPartner getBillPartner() {
		return billPartner;
	}
	public void setBillPartner(BillPartner billPartner) {
		this.billPartner = billPartner;
	}
	public DetailBill getDetailBill() {
		return detailBill;
	}
	public void setDetailBill(DetailBill detailBill) {
		this.detailBill = detailBill;
	}
	
}
