import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

const BarChart = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://apirest-cip5r1lpe-jonanoguerales.vercel.app/api/posts')
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  const postCat = posts.map((postCat) => postCat.categories)

  const animeLength = postCat.filter(postCat => postCat === 'Anime')
  const viajesLength = postCat.filter(postCat => postCat === 'Viajes')
  const terrorLength = postCat.filter(postCat => postCat === 'Terror')
  const interesantesLength = postCat.filter(postCat => postCat === 'Interesantes')
  const musicaLength = postCat.filter(postCat => postCat === 'Música')
  const comediaLength = postCat.filter(postCat => postCat === 'Comedia')
  const misteriososLength = postCat.filter(postCat => postCat === 'Misteriosos')
  const videojuegosLength = postCat.filter(postCat => postCat === 'Videojuegos')
  const romanceLength = postCat.filter(postCat => postCat === 'Romance')
  const belicaLength = postCat.filter(postCat => postCat === 'Bélica')

  const dataCat = [
    {
      name: 'Terror',
      cats: terrorLength.length
    },
    {
      name: 'Música',
      cats: musicaLength.length
    },
    {
      name: 'Viajes',
      cats: viajesLength.length
    },
    {
      name: 'Comedia',
      cats: comediaLength.length
    },
    {
      name: 'Interesantes',
      cats: interesantesLength.length
    },
    {
      name: 'Misteriosos',
      cats: misteriososLength.length
    },
    {
      name: 'Videojuegos',
      cats: videojuegosLength.length
    },
    {
      name: 'Romance',
      cats: romanceLength.length
    },
    {
      name: 'Anime',
      cats: animeLength.length
    },
    {
      name: 'Bélica',
      cats: belicaLength.length
    }
  ]

  const cat = {
    labels: dataCat.map((data) => data.name),
    datasets: [{
      label: 'CATEGORIAS',
      data: dataCat.map((data) => data.cats),
      backgroundColor: ['black', 'tomato', 'cyan', '#7451f8', '#f8bb51', '#c61d94', '#c6bb1d', '#4fffc0', '#82a711b5', '#ee647e']
    }]
  }
  return (
    <Bar data={cat} />
  )
}

export default BarChart
