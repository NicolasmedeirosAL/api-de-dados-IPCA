import historicoInflacao from '../dados/dados.js'

// segunda Rota
export const buscarIpcaPorAno = anoIpca => {
  const ipcaFiltrado = historicoInflacao.filter(ipca => ipca.ano === anoIpca)
  return ipcaFiltrado
}
// terceira Rota
export const buscarPorId = idIpca => {
  const idFormatado = parseInt(idIpca)
  const idFiltrado = historicoInflacao.find(ipca => ipca.id === idFormatado)
  return idFiltrado
}

// quarta Rota
export const calculoDeReajuste = (
  valor,
  mesInicial,
  anoInicial,
  mesFinal,
  anoFinal
) => {
  const colecaoFiltrada = historicoInflacao.filter(
    elementoDaColecao =>
      elementoDaColecao.mes >= mesInicial &&
      elementoDaColecao.mes <= mesFinal &&
      elementoDaColecao.ano >= anoInicial &&
      elementoDaColecao.ano <= anoFinal
  )

  let resultado = 0
  for (const item of colecaoFiltrada) {
    resultado = valor *= 1 + item.ipca / 100
  }

  if(!valor) {
    return colecaoFiltrada
  }else {
    return resultado.toFixed(2)
  }
 
    
  
}
