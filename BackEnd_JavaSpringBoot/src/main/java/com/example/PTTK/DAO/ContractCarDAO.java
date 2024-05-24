package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.example.PTTK.model.ContractCar;

public class ContractCarDAO extends DAO{

	public void addContractCar(ContractCar c, int id) {
		try (Connection con=getConnection();
			PreparedStatement ps = con.prepareStatement("insert into tblcontractcar (price, cost, tblcarid, tblcontractpartnerid) value (?, ?, ?, ?)")){
			ps.setFloat(1, c.getPrice());
			ps.setFloat(2, c.getCost());
			ps.setInt(3, c.getCar().getId());
			ps.setInt(4, id);
			int rs1 = ps.executeUpdate();			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
