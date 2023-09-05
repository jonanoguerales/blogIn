import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'

const ChartUsers = () => {
  const [dates, setDates] = useState([])

  useEffect(() => {
    const fetchDates = async () => {
      const res = await axios.get('https://apirest-cip5r1lpe-jonanoguerales.vercel.app/api/users')
      setDates(res.data)
    }
    fetchDates()
  }, [])

  const datesTotales = dates.map((date) => new Date(date.createdAt).toDateString())
  const datesTotales2 = dates.map((date) => new Date(date.createdAt).getMonth())
  const datesTotales3 = dates.map((date) => new Date(date.createdAt).getFullYear())
  const hoy = new Date().toDateString()
  const mesNumero = new Date().getMonth()
  const anoNumero = new Date().getFullYear()

  const registradosHoy = datesTotales.filter(datesTotales => datesTotales === hoy)
  const registradosMes = datesTotales2.filter(datesTotales2 => datesTotales2 === mesNumero)
  const registradosAño = datesTotales3.filter(datesTotales3 => datesTotales3 === anoNumero)

  const dataUsers = [
    {
      name: 'Usuarios por Dia',
      visitas: registradosHoy.length
    },
    {
      name: 'Usuarios por Mes',
      visitas: registradosMes.length
    },
    {
      name: 'Usuarios por Año',
      visitas: registradosAño.length
    }
  ]

  const cat = {
    labels: dataUsers.map((data) => data.name),
    datasets: [{
      label: 'CATEGORIAS',
      data: dataUsers.map((data) => data.visitas),
      backgroundColor: ['tomato', 'cyan', '#7451f8']
    }]
  }
  return (
    <Pie data={cat} />
  )
}

export default ChartUsers
