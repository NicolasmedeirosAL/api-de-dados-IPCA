import historicoInflacao from '../dados/dados.js'

// funcao para historico
export const buscarHistorico = () => {
  return historicoInflacao
}

// funcao para historico por ano
export const buscarHistoricoPorAno = ano => {
  const anoHistorico = parseInt(ano)
  const historico = historicoInflacao.filter(
    historico => historico.ano === anoHistorico
  )
  return historico
}
// funcao para historico por id
export const buscarHistoricoPorId = id => {
  const idHistorico = parseInt(id)
  const historico = historicoInflacao.find(
    historico => historico.id === idHistorico
  )
  return historico
}

// funcao para calculo do reajuste
export const calculoDeReajuste = (
  valor,
  mesInicial,
  anoInicial,
  mesFinal,
  anoFinal
) => {
  const historicoFiltrado = historicoInflacao.filter(historico => {
    if (anoInicial === anoFinal) {
      return (
        historico.ano === anoInicial &&
        historico.mes >= mesInicial &&
        historico.mes <= mesFinal
      )
    } else {
      return (
        (historico.ano === anoInicial && historico.mes >= mesInicial) ||
        (historico.ano > anoInicial && historico.ano < anoFinal) ||
        (historico.ano === anoFinal && historico.mes <= mesFinal)
      )
    }
  })

  let taxasMensais = 1
  for (const elemento of historicoFiltrado) {
    taxasMensais *= elemento.ipca / 100 + 1
  }
  const resultado = valor * taxasMensais
  return parseFloat(resultado.toFixed(2))
}

// funcao para validação de erros
export const validacaoErro = (
  valor,
  mesInicial,
  anoInicial,
  mesFinal,
  anoFinal
) => {
  const anoLimiteFinal = historicoInflacao[historicoInflacao.length - 1].ano
  const anoLimiteInicial = historicoInflacao[0].ano
  const mesLimiteFinal = historicoInflacao[historicoInflacao.length - 1].mes

  if (
    isNaN(valor) ||
    isNaN(mesInicial) ||
    isNaN(anoInicial) ||
    isNaN(mesFinal) ||
    isNaN(anoFinal) ||
    mesInicial < 1 ||
    mesInicial > 12 ||
    anoInicial < anoLimiteInicial ||
    anoInicial > anoLimiteFinal ||
    mesFinal < 1 ||
    mesFinal > 12 ||
    anoFinal < anoLimiteInicial ||
    anoFinal > anoLimiteFinal ||
    (anoFinal === anoLimiteFinal && mesFinal > mesLimiteFinal) ||
    anoFinal < anoInicial ||
    (anoFinal == anoInicial && mesFinal < mesInicial)
  ) {
    return true
  } else {
    return false
  }
}
