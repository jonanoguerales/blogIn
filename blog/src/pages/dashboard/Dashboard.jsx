import React from 'react'
import './dashboard.scss'
import BarChart from './BarChart'
import SidebarDash from '../../components/dashSidebar/SidebarDash'
import LineChart from './LineChart'
import ChartUsers from './ChartUsers'

const Dashboard = () => {
  return (
    <div className='dashboardHome'>
      <SidebarDash />
      <div className='homeContainer'>
        <div className='centerItems'>
          <div className='charts'>
            <LineChart />
          </div>
          <div className='charts'>
            <BarChart />
          </div>
          <div className='charts'>
            <ChartUsers />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
