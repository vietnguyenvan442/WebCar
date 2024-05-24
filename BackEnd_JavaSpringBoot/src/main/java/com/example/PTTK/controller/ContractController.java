package com.example.PTTK.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.CarDAO;
import com.example.PTTK.DAO.ContractCarDAO;
import com.example.PTTK.DAO.ContractPartnerDAO;
import com.example.PTTK.DAO.PartnerDAO;
import com.example.PTTK.model.ContractCar;
import com.example.PTTK.model.ContractPartner;

@RestController
@CrossOrigin
public class ContractController {

	@PostMapping("/contractpartner")
	public void savePartner(@RequestBody ContractPartner contractPartner) {
		PartnerDAO pdao = new PartnerDAO();
		if (contractPartner.getPartner().getId() <= 0) {
			pdao.addPartner(contractPartner.getPartner());
		} else {
			pdao.updatePartner(contractPartner.getPartner());
		}
		
		ContractPartnerDAO cpdao = new ContractPartnerDAO();
		cpdao.addContractPartner(contractPartner);
		
		CarDAO cdao = new CarDAO();		
		ContractCarDAO ccdao = new ContractCarDAO();
		for(ContractCar c: contractPartner.getListContractCar()) {
			if(c.getCar().getId()<=0) cdao.insertCar(c.getCar());
			ccdao.addContractCar(c, contractPartner.getId());
		}
	}

}
