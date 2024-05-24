package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.Car;
import com.example.PTTK.model.CarError;
import com.example.PTTK.model.Error;
import com.example.PTTK.model.Partner;

public class CarErrorDAO extends DAO {

	public List<CarError> getListCarError(int id) {
		List<CarError> list = new ArrayList<>();
		try (Connection conn = getConnection();
				PreparedStatement ps = conn.prepareStatement("select * from tblcarerror where tblCarid = ?")) {
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				CarError error = new CarError();
				error.setId(rs.getInt("id"));
				error.setDate(rs.getDate("date"));
				error.setState(rs.getInt("state"));
				error.setPrice(rs.getFloat("price"));
				PreparedStatement ps2 = conn.prepareStatement("select * from tblError where id = ?");
				ps2.setInt(1, rs.getInt("tblErrorid"));
				ResultSet rs2 = ps2.executeQuery();
				rs2.next();
				error.setError(new Error(rs2.getInt("id"), rs2.getString("name")));
				list.add(error);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public void insertCarError(Car car) {
		try (Connection con = getConnection()) {
			for (CarError c : car.getListCarError()) {
				PreparedStatement ps1 = con.prepareStatement("select * from tblError where name = ?");
				ps1.setString(1, c.getError().getName());
				ResultSet rs1 = ps1.executeQuery();
				if (!rs1.next()) {
					ErrorDAO error = new ErrorDAO();
					error.addError(c.getError());
					rs1 = ps1.executeQuery();
					rs1.next();
				}
				PreparedStatement ps2 = con.prepareStatement("insert into tblcarError (date, state, tblErrorid, tblcarid) values (?, ?, ?, ?)");
				ps2.setDate(1, c.getDate());
				ps2.setInt(2, c.getState());
				ps2.setInt(3, rs1.getInt("id"));
				ps2.setInt(4, car.getId());
				int rs2 = ps2.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateCarError(CarError c) {
		try(Connection conn = getConnection(); 
				PreparedStatement ps = conn.prepareStatement("update tblCarError set date=?, state=?, price=? where id=?");){
			ps.setDate(1, c.getDate());
			ps.setInt(2, c.getState());
			ps.setFloat(3, c.getPrice());
			ps.setInt(4, c.getId());
			int rs=ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
