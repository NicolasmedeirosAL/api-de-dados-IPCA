import express from 'express'
const app = express()

import {
  buscarHistorico,
  buscarHistoricoPorAno,
  buscarHistoricoPorId,
  validacaoErro,
  calculoDeReajuste
} from './funcoes/funcoes.js'

// rota Calculo
app.get('/historicoIPCA/calculo', (req, res) => {
  const valor = parseFloat(req.query.valor)
  const mesInicial = parseInt(req.query.mesInicial)
  const anoInicial = parseInt(req.query.anoInicial)
  const mesFinal = parseInt(req.query.mesFinal)
  const anoFinal = parseInt(req.query.anoFinal)

  if (validacaoErro(valor, mesInicial, anoInicial, mesFinal, anoFinal)) {
    res.status(400).send({ Erro: 'Parametros Invalidos' })
    return
  }
  const resultado = calculoDeReajuste(
    valor,
    mesInicial,
    anoInicial,
    mesFinal,
    anoFinal
  )
  res.json({ resultado: resultado })
})
// rota Historico e historico por ano
app.get('/historicoIPCA', (req, res) => {
  const ano = parseInt(req.query.ano)

  if (isNaN(ano)) {
    res.json(buscarHistorico())
  } else {
    const resultado = buscarHistoricoPorAno(ano)
    if (resultado.length > 0) {
      res.json({ resultado: resultado })
    } else {
      res
        .status(404)
        .send({ erro: 'Nenhum histórico encontrado para ano especificado!' })
    }
  }
})
// rota ID
app.get('/historicoIPCA/:id', (req, res) => {
  const ipca = buscarHistoricoPorId(req.params.id)

  if (ipca) {
    res.json(ipca)
  } else if (isNaN(parseInt(req.params.id))) {
    res.status(400).send({ erro: 'Requisição Invalida!' })
  } else {
    res.status(404).send({ erro: 'ID não encontrado!' })
  }
})

app.listen(8080, () => {
  const data = new Date()
  console.log(`Servidor iniciado em: ${data}`)
})
