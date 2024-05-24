package com.example.PTTK.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.PartnerDAO;
import com.example.PTTK.model.Info;
import com.example.PTTK.model.Partner;

@RestController
@CrossOrigin
public class PartnerController {
	private PartnerDAO pdao = new PartnerDAO();

	@GetMapping("/listpartner")
	public List<Partner> getPartners() {
		List<Partner> partners = pdao.getListPartner();
		return partners;
	}

	@PostMapping("/partner/save/{id}")
	public ResponseEntity<String> addOrUpdatePartner(@PathVariable int id, @RequestBody Partner partner) {
		boolean check = pdao.checkPartner(partner.getCccd());
		if (!check) {
			if (id <= 0) {
				pdao.addPartner(partner);
			} else {
				pdao.updatePartner(partner);
			}
			return ResponseEntity.ok("Save complete");
		}
		return ResponseEntity.ok("Fail");
	}

	@DeleteMapping("/partner/delete/{id}")
	public ResponseEntity<String> deletePro(@PathVariable int id) {
		pdao = new PartnerDAO();
		pdao.DeletePartner(id);
		return ResponseEntity.ok("Product deleted with ID: " + id);
	}

}