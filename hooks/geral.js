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
function arrumarDateInput(data) {
    const newDate = new Date(data);
    var data = 
        newDate.getFullYear() + "-" + 
        String(newDate.getMonth() + 1).padStart(2, '0') + "-" +
        String(newDate.getDate()).padStart(2, '0') + "T" +
        String(newDate.getHours()).padStart(2, '0') + ":" +
        String(newDate.getMinutes()).padStart(2, '0');

    return data

}
export {
    arrumarDate,
    arrumarValor,
    arrumarDateInput
}