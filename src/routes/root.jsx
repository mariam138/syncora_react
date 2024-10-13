import React from 'react'
import SignUpForm from '../pages/SignUpForm';
import TopNavbar from '../components/TopNavbar';
import SideBar from '../components/SideBar';


const root = () => {
  return (
    <>
      {/* <TopNavbar /> */}
      <div className='d-flex'>
        <SideBar />
        <SignUpForm />
      </div>
    </>
  );
}

export default root