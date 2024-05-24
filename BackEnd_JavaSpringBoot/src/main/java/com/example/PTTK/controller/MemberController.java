package com.example.PTTK.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.PTTK.DAO.MemberDAO;
import com.example.PTTK.model.Member;


@RestController
@CrossOrigin
public class MemberController {

	@PostMapping("/checkLogin")
	public ResponseEntity<Member> checkLogin(@RequestBody Member member) {
		MemberDAO mdao = new MemberDAO();
		if(mdao.checkLogin(member)) return ResponseEntity.ok(member);
		return ResponseEntity.notFound().build();
	}
}
