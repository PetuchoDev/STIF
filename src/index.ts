import { $query, $update } from 'azle';

//La cola de transacciones que almacenara los datos proporcionados en sendTransactionData()
let transactions: string[] = [];

//Para propositos de demostracion, se infiere que los usuarios ya han hecho log-in con su Internet IDentity
const lID: number = 2338992
const fID: number = 2339119
//Lee los datos de la cola, los acomoda en una cadena larga enlistando las transacciones (temporalmente así hasta tener la UI)
$query;
export function showTransactions(): string {
    let concatransactions: string = ''
    transactions.forEach(tsct => concatransactions += tsct)
    return concatransactions
}

//Expresiones regulares usadas para evitar errores de escritura entre los conceptos de transaccion
let compraRegEx = /compra/ig
let ventaRegEx = /venta/ig

let localdate = new Date()
//lee los datos proporcionados en la interfaz y dependiendo del concepto se añade a la cola una cadena con la informacion relacionada a la transaccion
$update;
export function sendTransactionData(concept: string, amount: number, date: string, whoMadeIt: string, doc: string): void{
    //Condicion diseñada para evitar (en cierta medida) errores en el formato de fecha
    let datetry: string[]= date.split("/") 
    if(parseInt(datetry[0]) > 31 || parseInt(datetry[1]) > 12){
        throw new Error('The date is not on a correct format, or, you supplied a wrong date, there is no more than 12 months or you surpassed the amount of days this month has, please supply an actual date on the DD/MM/YYYY Format.')
        return;
    }
    //condiciones para mandar el mensaje a la cola dependiendo del concepto de la transaccion
    
    if (compraRegEx.test(concept) === true){ transactions.push(`Por el concepto de ${concept.toLowerCase()}. ${whoMadeIt} con el identificador ${lID} hizo una transaccion de ${amount} pesos mexicanos (MXN) el ${date} hacia el usuario con el identificador. ${fID}, esta transaccion se añadio en: ${localdate}
    
    `) 
    return;
    }
     
    else if (ventaRegEx.test(concept) === true){ transactions.push(`Por el concepto de ${concept.toLowerCase()}. ${whoMadeIt} con el identificador ${lID} recibió una transaccion de ${amount} pesos mexicanos (MXN) el ${date}. hacia el usuario con el identificador. ${fID}, esta transaccion se añadio en: ${localdate}
        
    `)
    return;
    }
    else { throw new Error('The given concept is not supported, correct it');
    return;
    }
};
//PA MAÑANA: Falta el front xd, para poder insertar el Documento, para efectos de presentacion será un .txt o .html con ciertos elementos en vez de un documento certificado como lo seria en la version final

