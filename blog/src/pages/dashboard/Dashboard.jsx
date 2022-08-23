import React from 'react'
import './dashboard.scss'
import SidebarDash from '../../components/dashSidebar/SidebarDash'

const Dashboard = () => {
  return (
    <div className='dashboardHome'>
      <SidebarDash />
      <div className='homeContainer' />
    </div>
  )
}
export default Dashboard
