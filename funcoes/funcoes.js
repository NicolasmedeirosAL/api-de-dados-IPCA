import historicoInflacao from '../dados/dados.js'

export const buscarIpcaPorAno = anoIPCA => {
  const anoFormatado = parseInt(anoIPCA)
  const ipcaFiltrado = historicoInflacao.filter(ipca => ipca.ano === anoFormatado)
  return ipcaFiltrado
}

export const buscarPorId = idipca => {
  const idFormatado = parseInt(idipca)
  const idFiltrado = historicoInflacao.find(ipca => ipca.id === idFormatado)
  return idFiltrado
}
