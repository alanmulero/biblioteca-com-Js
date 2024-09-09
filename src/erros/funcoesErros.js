export function trataErros(erro) {
    if(erro.code === 'ENOENT'){
        throw new Error('Arquivo ou diretório não encontrado.')
    } else{
        return 'Erro na aplicação';
    }
}