
export const formatoMexico = (number: number, decimales=2) => {
    let numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(number.toString())) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        let formatNumber = Number(number).toFixed(decimales);
          const exp = /(\d)(?=(\d{3})+(?!\d))/g;
          const rep = '$1,';
          let arr = formatNumber.toString().split('.');
          arr[0] = arr[0].replace(exp,rep);
          return arr[1] ? arr.join('.'): arr[0];
    } else {
          // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
          const exp = /(\d)(?=(\d{3})+(?!\d))/g;
          const rep = '$1,';
          let arr = number.toString().split('.');
          arr[0] = arr[0].replace(exp,rep);
          return arr[1] ? arr.join('.'): arr[0];
    }
}