function arrumarDate(data) {
    const date = new Date(data);
    const dataArruamda = date.toLocaleDateString();
    const horarioArruamdo = date.toLocaleTimeString();
    return dataArruamda + " " + horarioArruamdo 
}
function arrumarValor(valor) {
    valor = valor ? valor : 0;
    const newValor = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return newValor;
}
export {
    arrumarDate,
    arrumarValor
}