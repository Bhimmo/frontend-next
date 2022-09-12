export default function ordenar(dadosTotais, quantidadePagina) {
    const paginas = [];
    var pagina = [];
    var count = 0;

    if (dadosTotais.length > 0) {
        for (let i = 0; i <= dadosTotais.length - 1; i++) {
            if (count === quantidadePagina) {
                paginas.push(pagina);
                pagina = [];
                count = 0;
            }
            if (i === (dadosTotais.length - 1)) {
                paginas.push(pagina);
            }
            pagina.push(dadosTotais[i]);
            count++;
        }
    } else {
        paginas.push(pagina);
    }
    return {
        paginas: paginas,
        numero: paginas.length
    }
}