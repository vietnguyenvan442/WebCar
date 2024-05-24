package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.Info;
import com.example.PTTK.model.Partner;


public class PartnerDAO extends DAO{

	public List<Partner> getListPartner() {
		List<Partner> partners = new ArrayList<>();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select * from tblPartner")){
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Partner partner = new Partner();
				InfoDAO inDAO = new InfoDAO();
				Info in = inDAO.getInfor(rs.getInt("tblPartnerid"));
				partner.setId(in.getId());
				partner.setAddr(in.getAddr());
				partner.setBank(in.getBank());
				partner.setBankID(in.getBankID());
				partner.setCccd(in.getCccd());
				partner.setDob(in.getDob());
				partner.setEmail(in.getEmail());
				partner.setName(in.getName());
				partner.setSdt(in.getSdt());
				partners.add(partner);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return partners;
	}
	
	public Partner getPartner(int id) {
		Partner partner = new Partner();
		try(Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement("select * from tblPartner where tblpartnerid = ?")){
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				InfoDAO inDAO = new InfoDAO();
				Info in = inDAO.getInfor(rs.getInt("tblPartnerid"));
				partner.setId(in.getId());
				partner.setAddr(in.getAddr());
				partner.setBank(in.getBank());
				partner.setBankID(in.getBankID());
				partner.setCccd(in.getCccd());
				partner.setDob(in.getDob());
				partner.setEmail(in.getEmail());
				partner.setName(in.getName());
				partner.setSdt(in.getSdt());
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return partner;
	}
	
	public boolean checkPartner(String cccd) {
		boolean check = false;
		try (Connection con = getConnection()) {
			PreparedStatement ps = con.prepareStatement("select * from tblInfo where cccd = ?");
			ps.setString(1, cccd);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) check = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return check;
	}
	
	public void addPartner(Partner partner) {
		try (Connection con=getConnection();
				PreparedStatement ps1 = con.prepareStatement("INSERT INTO `tblInfo` (`name`, `sdt`, `bank`, `bankID`, `addr`, `dob`, cccd, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
				PreparedStatement ps2 = con.prepareStatement("insert into tblPartner (tblPartnerid) values (?)")){
			ps1.setString(1, partner.getName());
			ps1.setString(2, partner.getSdt());
			ps1.setString(3, partner.getBank());
			ps1.setString(4, partner.getBankID());
			ps1.setString(5, partner.getAddr());
			ps1.setDate(6, partner.getDob());
			ps1.setString(7, partner.getCccd());
			ps1.setString(8, partner.getEmail());
			int rs1 = ps1.executeUpdate();
			
			PreparedStatement ps3 = con.prepareStatement("select * from tblInfo where cccd = ?");
			ps3.setString(1, partner.getCccd());
			ResultSet rs3 = ps3.executeQuery();
			rs3.next();
			
			ps2.setInt(1, rs3.getInt("id"));
			int rs2 = ps2.executeUpdate();
			
			partner.setId(rs3.getInt("id"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updatePartner(Partner partner) {
		try(Connection conn = getConnection(); 
				PreparedStatement ps = conn.prepareStatement("update tblInfo set name=?, sdt=?, bank=?, bankID=?, addr=?, dob=?, cccd=?, email=? where id=?");){
			ps.setString(1, partner.getName());
			ps.setString(2, partner.getSdt());
			ps.setString(3, partner.getBank());
			ps.setString(4, partner.getBankID());
			ps.setString(5, partner.getAddr());
			ps.setDate(6, partner.getDob());
			ps.setString(7, partner.getCccd());
			ps.setString(8, partner.getEmail());
			ps.setInt(9, partner.getId());
			int rs=ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void DeletePartner(int id) {
		try (Connection con = getConnection();
				PreparedStatement ps = con.prepareStatement("delete from tblpartner where tblPartnerid = ?");
				PreparedStatement ps2 = con.prepareStatement("delete from tblinfo where id = ?")){
			ps.setInt(1, id);
			ps2.setInt(1, id);
			int result = ps.executeUpdate();
			int rs = ps2.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
