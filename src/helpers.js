// Separando ocorrências de palavras que se repetem mais de uma vez.
function filtraOcorrencias(paragrafo){
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
}
 // Montando a saida do arquivo.

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo,indice) => {
            const duplicadas = filtraOcorrencias(paragrafo).join(', ');
            if (duplicadas ) {
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1} : ${duplicadas} \n`;}
    })
    return textoFinal;
}

// Exportando
export {montaSaidaArquivo};