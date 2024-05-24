package com.example.PTTK.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.ErrorDAO;
import com.example.PTTK.model.Error;

@RestController
@CrossOrigin
public class ErrorController {

	@GetMapping("/listerror")
	public List<Error> getErrors(){
		ErrorDAO edao = new ErrorDAO();
		List<Error> ers = edao.getListError();
		return ers;
	}
}
