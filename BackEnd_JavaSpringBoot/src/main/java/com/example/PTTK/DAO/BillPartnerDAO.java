package com.example.PTTK.DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.example.PTTK.model.BillPartner;
import com.example.PTTK.model.DetailBill;

public class BillPartnerDAO extends DAO{

	public List<BillPartner> getBillPartners(Date start, Date end){
		List<BillPartner> listBP = new ArrayList<BillPartner>();
		try (Connection con = getConnection()){
			PreparedStatement ps = con.prepareStatement("select tblbillpartner.id as id, sum(tbldetail_bill.price) as price, "
					+ "sum(tbldetail_bill.cost + tbldetail_bill.fine) as cost, tblbillpartner.tblpartnerid as partnerid "
					+ "from tblbillpartner, tbldetail_bill "
					+ "where tblbillpartner.id = tbldetail_bill.tblbillpartnerid and tbldetail_bill.date is NULL and (tbldetail_bill.cusStat >= ? and tbldetail_bill.cusEnd <= ?)"
					+ "group by tblbillpartner.id");
			ps.setDate(1, start);
			ps.setDate(2, end);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				BillPartner b = new BillPartner();
				b.setId(rs.getInt("id"));
				b.setTotalRent(rs.getFloat("price"));
				b.setTotalCost(rs.getFloat("cost"));
				b.setPartner(new PartnerDAO().getPartner(rs.getInt("partnerid")));
				
				PreparedStatement ps1 = con.prepareStatement("select * from tbldetail_Bill where tblbillPartnerid = ?");
				ps1.setInt(1, b.getId());
				ResultSet rs1 = ps1.executeQuery();
				List<DetailBill> dbs = new ArrayList<DetailBill>();
				while (rs1.next()) {
					DetailBill db = new DetailBill();
					db.setId(rs1.getInt("id"));
					dbs.add(db);
				}
				b.setListDetailBill(dbs);
				
				listBP.add(b);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listBP;
	}
}
