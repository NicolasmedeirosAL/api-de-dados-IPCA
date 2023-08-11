import historicoInflacao from '../dados/dados.js'

export const buscarIpcaPorAno = anoIpca => {
  const ipcaFiltrado = historicoInflacao.filter(ipca => ipca.ano === anoIpca)
  return ipcaFiltrado
}

export const buscarPorId = idIpca => {
  const idFormatado = parseInt(idIpca)
  const idFiltrado = historicoInflacao.find(ipca => ipca.id === idFormatado)
  return idFiltrado
}
