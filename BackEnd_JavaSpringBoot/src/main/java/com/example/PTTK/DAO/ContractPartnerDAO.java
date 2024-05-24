package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.PTTK.model.ContractPartner;

public class ContractPartnerDAO extends DAO{

	public void addContractPartner(ContractPartner p) {
		try (Connection con=getConnection();
			PreparedStatement ps = con.prepareStatement("insert into tblcontractpartner (date, terms, tblPartnerid, tblManagerid) value (?, ?, ?, ?)")){
			ps.setDate(1, p.getDate());
			ps.setString(2, p.getTerms());
			ps.setInt(3, p.getPartner().getId());
			ps.setInt(4, p.getManager().getId());
			int rs = ps.executeUpdate();	
			
			PreparedStatement ps1 = con.prepareStatement("select * from tblContractPartner where date = ? and tblPartnerid = ?");
			ps1.setDate(1, p.getDate());
			ps1.setInt(2, p.getPartner().getId());
			ResultSet rs1 = ps1.executeQuery();
			rs1.next();
			p.setId(rs1.getInt("id"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
