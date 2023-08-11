import express from 'express'
const app = express()

import historicoInflacao from './dados/dados.js'
import { buscarIpcaPorAno, buscarPorId } from './funcoes/funcoes.js'

app.get('/historicoIPCA', (req, res) => {
  const anoIPCA = parseInt(req.query.ano)

  if (anoIPCA < 2015 || anoIPCA > 2023) {
    res.status(400).send({ erro: 'Nenhum histórico encontrado para esse ano!' })

  } else if (anoIPCA) {
    const ipcaPorAnoFiltrado = buscarIpcaPorAno(anoIPCA)
    res.json(ipcaPorAnoFiltrado)

  } else {
    res.json(historicoInflacao)
  }
})

app.get('/historicoIPCA/:idipca', (req, res) => {
  const ipca = buscarPorId(req.params.idipca)

  if (ipca) {
    res.json(ipca)
  } else if (isNaN(parseInt(req.params.idipca))) {
    res.status(400).send({ erro: 'Requisição Invalida!' })
  } else {
    res.status(404).send({ erro: 'ID não encontrado!' })
  }
})

app.get('/calculo', (req, res) => {
  const valor = req.query.valor
  const mesInicial = req.query.mesInicial
  const anoInicial = req.query.anoInicial
  const mesFinal = req.query.mesFinal
  const anoFinal = req.query.anoFinal

  
})

app.listen(8080, () => {
  const data = new Date()
  console.log(`Servidor iniciado em: ${data}`)
})
