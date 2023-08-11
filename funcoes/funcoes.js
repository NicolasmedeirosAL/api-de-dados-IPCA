import historicoInflacao from '../dados/dados.js'

export const buscarIpcaPorAno = anoIpca => {
  const anoFormatado = parseInt(anoIpca)
  const ipcaFiltrado = historicoInflacao.filter(ipca => ipca.ano === anoFormatado)
  return ipcaFiltrado
}

export const buscarPorId = idIpca => {
  const idFormatado = parseInt(idIpca)
  const idFiltrado = historicoInflacao.find(ipca => ipca.id === idFormatado)
  return idFiltrado
}
