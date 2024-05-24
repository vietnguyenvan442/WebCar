package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.Car;
import com.example.PTTK.model.CarError;

public class CarDAO extends DAO{

	public List<Car> getListCar() {
		List<Car> cars = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select * from tblCar")){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Car car = new Car();
				car.setId(rs.getInt("id"));
				car.setBienSo(rs.getString("bienSo"));
				car.setDes(rs.getString("des"));
				car.setName(rs.getString("name"));
				car.setListCarError(new CarErrorDAO().getListCarError(car.getId()));
				cars.add(car);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return cars;
	}
	
	public void insertCar(Car car) {
		try (Connection con=getConnection();
				PreparedStatement ps1 = con.prepareStatement("INSERT INTO `tblcar` (`name`, `bienSo`, `des`) VALUES (?, ?, ?)");){
			ps1.setString(1, car.getName());
			ps1.setString(2, car.getBienSo());
			ps1.setString(3, car.getDes());
			int rs1 = ps1.executeUpdate();
			
			PreparedStatement ps2 = con.prepareStatement("select * from tblcar where bienSo = ?");
			ps2.setString(1, car.getBienSo());
			ResultSet rs2 = ps2.executeQuery();
			rs2.next();
			car.setId(rs2.getInt("id"));
			CarErrorDAO c = new CarErrorDAO();
			c.insertCarError(car);			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
