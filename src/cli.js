import fs from 'fs';
import path from 'path';  // gerenciamento de caminho relativo e absoluto
import {trataErros} from "./erros/funcoesErros.js";
import {contaPalavras}  from "./index.js";
import {montaSaidaArquivo}  from "./helpers.js";
import {Command} from 'commander';



// Usando a biblioteca de terceiros Command.sada para gerenciar linha de comando
const program = new Command();
// Chamando os metodos de Command que quero usar.
program
    .version('0.0.1')
    .option('-t, --texto <string>','caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho pasta estino')
    .action((options) => {
        const {texto, destino} = options;
        if(!texto || !destino){
            console.error('Colocar o caminho de destino.');
            program.help();
            return;
            
        }
        // path:
        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);
        try{
            processaArquivo(caminhoTexto,caminhoDestino);
            console.log('Texto processado com sucesso');
            

        }catch(erro){
            console.log('Ocorreu um erro.', erro);
            
        }
    })

program.parse();    // convertendo os caminhos. 



// criando uma função para acomodar o readFile
function processaArquivo(texto, destino){
    fs.readFile(texto
        , 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado,destino );
        } catch(erro) {
            trataErros(erro);
        }
    })

}


// Salvando os dados em um arquivo.
//Usando async & await:
async function criaESalvaArquivo(listaPalavras, caminho) {
    const arquivoNovo = `${caminho}/resultado.txt`;
    const textoPalavra = montaSaidaArquivo(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavra);
        console.log('Arquivo criado.')
    }catch (erro){
        throw erro;

    }
}