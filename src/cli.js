import fs from 'fs';
import {trataErros} from "./erros/funcoesErros.js";
import {contaPalavras}  from "./index.js";

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const linkEndereco = caminhoArquivo[3];
fs.readFile(link
    , 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado,linkEndereco );
    } catch(erro) {
        trataErros(erro);
    }
})

// Salvando os dados em um arquivo.
//Usando async & await:
async function criaESalvaArquivo(listaPalavras, caminho) {
    const arquivoNovo = `${caminho}/resultado.txt`;
    const textoPalavra = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavra);
        console.log('Arquivo criado.')
    }catch (erro){
        throw erro;

    }
}