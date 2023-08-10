import express from 'express'
const app = express()

import historicoInflacao from './dados/dados.js'

app.get('/historicoIPCA', (req, res) => {
  res.json(historicoInflacao)
})






app.listen(8080, () => {
  const data = new Date()
  console.log(`Servidor iniciado em: ${data}`)
})
