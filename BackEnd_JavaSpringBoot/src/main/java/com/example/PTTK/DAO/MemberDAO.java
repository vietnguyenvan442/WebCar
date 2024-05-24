package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.PTTK.model.Info;
import com.example.PTTK.model.Member;

public class MemberDAO extends DAO{

	public boolean checkLogin(Member m) {
		boolean check = false;
		try(Connection conn = getConnection(); 
			PreparedStatement ps = conn.prepareStatement("select * from tblmember where username = ? and password = ?");){
			ps.setString(1, m.getUsername());
			ps.setString(2, m.getPassword());
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				check = true;
				InfoDAO inDAO = new InfoDAO();
				Info in = inDAO.getInfor(rs.getInt("tblMemberid"));
				m.setName(in.getName());
				m.setId(rs.getInt("tblMemberid"));
				m.setPosition(rs.getString("position"));
				
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return check;
	}
}
