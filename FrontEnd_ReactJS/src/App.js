import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/QuanLyDoiTac/Login';
import Home from './components/Home';
import ListPartner from './components/QuanLyDoiTac/ListPartner';
import Partner from './components/QuanLyDoiTac/Partner';
import ListCar from './components/KyHopDong/ContractCarOld';
import ContractCar from './components/KyHopDong/ContractCar';
import Contract from './components/KyHopDong/Contract';
import ContractPartner from './components/KyHopDong/ContractPartner';
import ContractPartnerOld from './components/KyHopDong/ContractPartnerOld';
import ContractCarOld from './components/KyHopDong/ContractCarOld';
import Error from './components/KyHopDong/Error';
import ContractTerms from './components/KyHopDong/ContractTerms';
import Confirm from './components/KyHopDong/Confirm';
import Payment from './components/ThanhToanChoDoiTac/Payment';
import PaymentMonth from './components/ThanhToanChoDoiTac/PaymentMonth';
import DetailPartner from './components/ThanhToanChoDoiTac/DetailPartner';
import PaymentMethod from './components/ThanhToanChoDoiTac/PaymentMethod';
import BankTranfer from './components/ThanhToanChoDoiTac/BankTranfer';
import ConfirmDirectPayment from './components/ThanhToanChoDoiTac/ConfirmDirectPayment';
import StatCar from './components/ThanhToanChoDoiTac/StatCar';
import StatCustomer from './components/ThanhToanChoDoiTac/StatCustomer';
import EditStatCus from './components/ThanhToanChoDoiTac/EditStatCus';
import ErrorCus from './components/ThanhToanChoDoiTac/ErrorCus';

function App() {
  const user = JSON.parse(localStorage.getItem('member'));

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home user = {user}/>}/>
        <Route path='/listpartner' element={<ListPartner/>}/>
        <Route path='/partner/:id' element={<Partner/>}/>

        <Route path='/contract' element={<Contract/>}/>
        <Route path='/contractpartner' element={<ContractPartner/>}/>
        <Route path='/listcar' element={<ListCar/>}/>
        <Route path='/contractpartner/selectpartner' element={<ContractPartnerOld/>}/>
        <Route path='/Contractcar' element={<ContractCar/>}/>
        <Route path='/contractcar/selectcar' element={<ContractCarOld/>}/>
        <Route path='/contractcar/error' element={<Error/>}/>
        <Route path='/contractterms' element={<ContractTerms/>}/>
        <Route path='/contractconfirm' element={<Confirm user={user}/>}/>

        <Route path='/payment' element={<Payment/>}/>
        <Route path='/paymentmonth' element={<PaymentMonth/>}/>
        <Route path='/paymentmonth/detailpartner' element={<DetailPartner/>}/>
        <Route path='/paymentmonth/paymentmethod' element={<PaymentMethod/>}/>
        <Route path='/paymentmonth/banktranfer' element={<BankTranfer/>}/> 
        <Route path='/paymentmonth/directpayment' element={<ConfirmDirectPayment/>}/>
        <Route path='/paymentmonth/statcar/:idbp' element={<StatCar/>}/>
        <Route path='/paymentmonth/statcustomer/:id' element={<StatCustomer/>}/>
        <Route path='/paymentmonth/editstatcus' element={<EditStatCus/>}/>
        <Route path='/paymentmonth/errorcus' element={<ErrorCus/>}/>
      </Routes>
    </div>
  );
}

export default App;
