package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.BillPartner;
import com.example.PTTK.model.Car;
import com.example.PTTK.model.CarError;
import com.example.PTTK.model.Customer;
import com.example.PTTK.model.DetailBill;
import com.example.PTTK.model.Error;

public class DetailBillDAO extends DAO {
	
	public void saveDetailBill(DetailBill detailBill) {
		try (Connection con = getConnection()){
			PreparedStatement ps = con.prepareStatement("update tbldetail_bill set cusEnd = ? where id = ?");
			ps.setDate(1, detailBill.getCusEnd());
			ps.setInt(2, detailBill.getId());
			int rs = ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateListDetailBill(BillPartner billPartner, String method, Date date) {
		try (Connection con = getConnection()) {
			PreparedStatement ps = con.prepareStatement(
					"UPDATE `tbldetail_bill` SET `method` = ?, `bank` = ?, `bankID` = ?, `date` = ? WHERE `id` = ?");
			for (DetailBill db : billPartner.getListDetailBill()) {
				ps.setString(1, method);
				ps.setString(2, billPartner.getPartner().getBank());
				ps.setString(3, billPartner.getPartner().getBankID());
				ps.setDate(4, date);
				ps.setInt(5, db.getId());
				int rs = ps.executeUpdate();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateDetailBill(BillPartner billPartner, DetailBill detailBill, String method, Date date) {
		try (Connection con = getConnection()) {
			PreparedStatement ps = con.prepareStatement(
					"UPDATE `tbldetail_bill` SET `method` = ?, `bank` = ?, `bankID` = ?, `date` = ? WHERE `id` = ?");
				ps.setString(1, method);
				ps.setString(2, billPartner.getPartner().getBank());
				ps.setString(3, billPartner.getPartner().getBankID());
				ps.setDate(4, date);
				ps.setInt(5, detailBill.getId());
				int rs = ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<DetailBill> getListStatCar(int id) {
		List<DetailBill> dbs = new ArrayList<DetailBill>();
		try (Connection con = getConnection()) {
			PreparedStatement ps = con.prepareStatement(
					"select tblcar.name as name, tblcar.bienSo as bienSo, tblcar.des as des, tblcar.id as id, "
							+ "sum(tbldetail_bill.price) as price, sum(tbldetail_bill.cost + tbldetail_bill.fine) as cost "
							+ "from tblcar, tbldetail_bill where tbldetail_bill.date is null and tbldetail_bill.tblcarid = tblcar.id and tbldetail_bill.tblbillPartnerid = ? group by id");
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				DetailBill db = new DetailBill();
				db.setCar(new Car());
				db.getCar().setId(rs.getInt("id"));
				db.getCar().setName(rs.getString("name"));
				db.getCar().setBienSo(rs.getString("bienSo"));
				db.getCar().setDes(rs.getString("des"));
				db.setPrice(rs.getFloat("price"));
				db.setCost(rs.getFloat("cost"));
				dbs.add(db);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dbs;
	}

	public List<DetailBill> getListDetailBillofCar(int idcar, int iddb) {
		List<DetailBill> dbs = new ArrayList<DetailBill>();
		try (Connection con = getConnection()) {
			PreparedStatement ps = con
					.prepareStatement("select * from tbldetail_bill where tblcarid = ? and tblBillPartnerid = ?");
			ps.setInt(1, idcar);
			ps.setInt(2, iddb);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				DetailBill db = new DetailBill();
				db.setId(rs.getInt("id"));
				db.setCusStart(rs.getDate("cusStat"));
				db.setCusEnd(rs.getDate("cusEnd"));
				db.setDealine(rs.getInt("deadline"));
				db.setCost(rs.getFloat("cost"));
				db.setFine(rs.getFloat("fine"));

				db.setCustomer(new Customer());
				PreparedStatement ps1 = con.prepareStatement("select tblInfo.name as name, tblInfo.cccd as cccd "
						+ "from tblContractCus, tbldetail_bill, tblcustomer, tblInfo "
						+ "where tbldetail_bill.id = ? and tbldetail_bill.tblcontractcusid = tblcontractcus.id and "
						+ "tblcustomer.tblCustomerid = tblcontractcus.tblcustomerid and tblInfo.id = tblcustomer.tblcustomerid");
				ps1.setInt(1, rs.getInt("id"));
				ResultSet rs1 = ps1.executeQuery();
				rs1.next();
				db.getCustomer().setName(rs1.getString("name"));
				db.getCustomer().setCccd(rs1.getString("cccd"));
				
				PreparedStatement ps2 = con.prepareStatement("select * from pttk.tblcarerror, pttk.tblerror "
						+ "where tblcarerror.tblcarid = ? and tblcarerror.tblerrorid = tblerror.id group by tblcarerror.id");
				ps2.setInt(1, rs.getInt("tblcarid"));
				ResultSet rs2 = ps2.executeQuery();
				List<CarError> ces = new ArrayList<CarError>();
				while (rs2.next()) {
					CarError ce = new CarError();
					ce.setId(rs2.getInt("id"));
					ce.setError(new Error());
					ce.getError().setName(rs2.getString("name"));
					ces.add(ce);
				}
				db.setListCarError(ces);
				
				dbs.add(db);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dbs;
	}
}
