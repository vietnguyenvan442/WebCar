package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.PTTK.model.Info;

public class InfoDAO extends DAO{

	public Info getInfor(int id) {
		Info info = new Info();
		try (Connection con = getConnection();
			PreparedStatement ps = con.prepareStatement("select * from tblInfo where id = ?")){
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				info.setAddr(rs.getString("addr"));
				info.setBank(rs.getString("bank"));
				info.setBankID(rs.getString("bankID"));
				info.setCccd(rs.getString("cccd"));
				info.setDob(rs.getDate("dob"));
				info.setEmail(rs.getString("email"));
				info.setId(rs.getInt("id"));
				info.setName(rs.getString("name"));
				info.setSdt(rs.getString("sdt"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return info;
	}
	
}
