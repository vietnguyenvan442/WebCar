package com.example.PTTK.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.BillPartnerDAO;
import com.example.PTTK.model.BillPartner;


@RestController
@CrossOrigin
public class BillPartnerController {

	@GetMapping("/listbillpartner/{date}")
	public List<BillPartner> getBillPartners(@PathVariable String date) {
		String[] day = date.split(",");
		Date st = Date.valueOf(day[0]);
		Date et = Date.valueOf(day[1]);
        
		BillPartnerDAO bpdao = new BillPartnerDAO();
		List<BillPartner> bps = bpdao.getBillPartners(st, et);
		return bps;
	}
}
