package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.Error;

public class ErrorDAO extends DAO{
	
	
	public ErrorDAO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<Error> getListError() {
		List<Error> errors = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select * from tblerror")){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Error e = new Error();
				e.setId(rs.getInt("id"));
				e.setName(rs.getString("name"));
				errors.add(e);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return errors;
	}

	public void addError(com.example.PTTK.model.Error error) {
		try (Connection con=getConnection();
			PreparedStatement ps = con.prepareStatement("insert into tblerror name value ?")){
			ps.setString(1, error.getName());
			int rs1 = ps.executeUpdate();			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
