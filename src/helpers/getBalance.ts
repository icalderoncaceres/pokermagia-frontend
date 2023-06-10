import { IConsolidate } from "../services/sumary/SumaryService.model";


// POR ÚLTIMO SE EJECUTA ESTA FUNCIÓN
export const getBalanceTotal = (balance: number, comodin: number, percent: number) => {
  balance = balance - comodin;
  return balance * percent / 100;
} 

const getSumOrSubsCashback = (balance: number, comodin: number, percent: number, op: "SUMA" | "RESTA" ) => {
    if (op === "SUMA") {
        let profitCashback = balance > 0 ? comodin * percent / 100 : 0;
        balance = balance + profitCashback;
    }
    if (op === "RESTA") {
        balance = balance - comodin;
    }

    return balance;
}

// PRIMERO SE EJECUTAN ESTÁS FUNCIONES
/*
  Las funciones calculateBalanceWithNL contienen los condicionales de la sección CASHBACK.
  Evalúan el LIMITE NL (level del jugador). A la vez que evalúa las manos del mismo jugador,
  con el fin de calcular el porcentaje del Cashback (comodin), que será sumado o restado al balance total.
  
  Por último igualamos el balance, con lo que nos retorna la función calculateBalanceWithHands (partypoker o ggpoker).
  Y dicho resultado lo retornamos.

  Continuación en la línea 134

*/
export const calculateBalanceWithNLPartyPoker = (item: IConsolidate): number => {
  let balance = item.bank - (item.rollStart + item.recharges);

  if (Number(item.level) <= 5) {
    // Condición 1  = NL5
    // MANOS:
    return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, item.comodin);
}

if (Number(item.level) > 5 && Number(item.level) <= 10) {
    // Condición 2  = NL10
    // MANOS:
    if (item.hands >= 45001 && item.bank >= item.rollStart) {
        // Condición 2 APLICA = NL10 (SE SUMA EL CASHBACK)
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    } else {
        // Condición 2 NO APLICA = NL10 (SE RESTA EL CASHBACK)
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    }
}

if (Number(item.level) > 10 && Number(item.level) <= 25) {
    // Condición 2  = NL10
    // MANOS:
    if (item.hands >= 45001) {
        // Condición 3 APLICA = NL25
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    } else {
        // Condición 3 NO APLICA = NL25
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    }
}

if (Number(item.level) > 25) {
    // Condición 4  = NL50
    // MANOS:
    if (item.hands >= 45001) {
        // Condición 4 APLICA = NL50
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    } else {
        // Condición 4 NO APLICA = NL50
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsPartyPoker(balance, item.hands, 0);
    }
}

  return 0;
}

export const calculateBalanceWithNLGGPoker = (item: IConsolidate): number => {
  let balance = item.bank - (item.rollStart + item.recharges);

  if (Number(item.level) <= 5) {
    // Condición 1  = NL5
    // MANOS:
    return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, item.comodin);
}

if (Number(item.level) > 5 && Number(item.level) <= 10) {
    // Condición 2  = NL10
    // MANOS:
    if (item.hands >= 52001 && item.bank >= item.rollStart) {
        // Condición 2 APLICA = NL10
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    } else {
        // Condición 2 NO APLICA = NL10
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    }
}

if (Number(item.level) > 10 && Number(item.level) <= 25) {
    // Condición 2  = NL10
    // MANOS:
    if (item.hands >= 52001) {
        // Condición 3 APLICA = NL25
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    } else {
        // Condición 3 NO APLICA = NL25
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    }
}

if (Number(item.level) > 25) {
    // Condición 4  = NL50
    // MANOS:
    if (item.hands >= 52001) {
        // Condición 4 APLICA = NL50
        balance = getSumOrSubsCashback(balance, item.comodin, 50, "SUMA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    } else {
        // Condición 4 NO APLICA = NL50
        balance = getSumOrSubsCashback(balance, item.comodin, 0, "RESTA");
        return balance = calculateBalanceWithHandsGGPoker(balance, item.hands, 0);
    }
}

  return 0;
}

// SEGUNDO SE EJECUTAN ESTÁS FUNCIONES
/*
  Acá calculamos el balance en base al número de manos que tenga el jugador.
  Para ello igualamos el balance, con lo que nos retorna la función getBalanceTotal, pasandole cómo parametros
  el balance actual, el comodin, y el porcentaje que vamos a extraer del balance total 
  porcentaje que varia dependiendo de la condición que se cumpla.
*/
export const calculateBalanceWithHandsPartyPoker = (balance: number, hands: number, comodin: number): number => {
  if (hands <= 25000 ) {
      return balance = getBalanceTotal(balance, comodin, 40);
  }

  if (hands > 25000 && hands <= 34999 ) {
      return balance = getBalanceTotal(balance, comodin, 50);
  }
  if (hands > 34999 && hands <= 44999 ) {
      return balance = getBalanceTotal(balance, comodin, 55);
  }
  if (hands > 44999 && hands <= 64999 ) {
      return balance = getBalanceTotal(balance, comodin, 60);
  }
  if (hands > 64999) {
      return balance = getBalanceTotal(balance, comodin, 65);
  }

  return balance;
}

export const calculateBalanceWithHandsGGPoker = (balance: number, hands: number, comodin: number): number => {
  if (hands <= 29999 ) {
      return balance = getBalanceTotal(balance, comodin, 40);
  }

  if (hands > 29999 && hands <= 39999 ) {
      return balance = getBalanceTotal(balance, comodin, 50);
  }
  if (hands > 39999 && hands <= 44999 ) {
      return balance = getBalanceTotal(balance, comodin, 55);
  }
  if (hands > 44999 && hands <= 54999 ) {
      return balance = getBalanceTotal(balance, comodin, 60);
  }
  if (hands > 54999 && hands <= 64999) {
      return balance = getBalanceTotal(balance, comodin, 65);
  }
  if (hands > 64999 && hands <= 79999) {
    return balance = getBalanceTotal(balance, comodin, 70);
  }
  if (hands > 79999) {
    return balance = getBalanceTotal(balance, comodin, 75);
  }

  return balance;
}