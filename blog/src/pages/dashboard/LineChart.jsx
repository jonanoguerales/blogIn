import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

const LineChart = () => {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    const fetchVisits = async () => {
      const res = await axios.get('http://localhost:3001/api/visitas')
      setVisits(res.data)
    }
    fetchVisits()
  }, [])

  const visitasAño = visits.map((visitas) => visitas.totalAño)
  const visitasDia = visits.map((visitas) => visitas.totalDia)
  const visitasMes = visits.map((visitas) => visitas.totalMes)
  const visitasTotal = visitasDia[0] + visitasMes[0] + visitasAño[0]

  const dataVisit = [
    {
      name: 'Visitas Dia',
      visitas: visitasDia[0]
    },
    {
      name: 'Visitas Mes',
      visitas: visitasMes[0]
    },
    {
      name: 'Visitas Año',
      visitas: visitasAño[0]
    },
    {
      name: 'Visitas Año',
      visitas: visitasTotal
    }
  ]

  const vis = {
    labels: dataVisit.map((data) => data.name),
    datasets: [{
      label: 'VISITAS',
      data: dataVisit.map((data) => data.visitas),
      backgroundColor: ['#f8bb51', '#c61d94', '#c6bb1d']
    }]
  }

  return (
    <Line data={vis} />
  )
}

export default LineChart
