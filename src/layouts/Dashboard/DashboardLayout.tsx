import { Navbar } from "../../layout";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className='base-layout'>
      <Navbar />
      <div className='title'></div>
      <div className='graph'></div>
      <div className='container'>
        <div className='card1'></div>
        <div className='card2'></div>
        <div className='card3'></div>
        <div className='card4'></div>
        <div className='card5'></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
