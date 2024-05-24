package com.example.PTTK.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.DetailBillDAO;
import com.example.PTTK.model.BillPartner;
import com.example.PTTK.model.DetailBill;
import com.example.PTTK.model.payDTO;


@RestController
@CrossOrigin
public class DetailBillController {

	@PostMapping("/paysave/{method}")
	public void payBillPartner(@PathVariable String method, @RequestBody BillPartner billPartner) {
		String[] mess = method.split(",");
		Date date = Date.valueOf(mess[1]);
		DetailBillDAO dbdao = new DetailBillDAO();
		dbdao.updateListDetailBill(billPartner, mess[0], date);
	}
	
	
	@GetMapping("/statcar/{id}")
	public List<DetailBill> getListStatCar(@PathVariable int id){
		DetailBillDAO dbdao = new DetailBillDAO();
		return dbdao.getListStatCar(id);
	}
	
	@GetMapping("/statcus/{id}")
	public List<DetailBill> getListStatCar(@PathVariable String id){
		String[] mess = id.split(",");
		int idc = Integer.parseInt(mess[0]);
		int iddb = Integer.parseInt(mess[1]);
		DetailBillDAO dbdao = new DetailBillDAO();
		return dbdao.getListDetailBillofCar(idc, iddb);
	}
	
	@PostMapping("/paysave/detailbill/{method}")
	public void payDetailBill(@PathVariable String method, @RequestBody payDTO pay) {
		BillPartner billPartner = pay.getBillPartner();
		DetailBill detailBill = pay.getDetailBill();
		String[] mess = method.split(",");
		Date date = Date.valueOf(mess[1]);
		DetailBillDAO dbdao = new DetailBillDAO();
		dbdao.updateDetailBill(billPartner, detailBill, mess[0], date);
	}
}
