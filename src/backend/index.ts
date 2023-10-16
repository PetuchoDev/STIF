import { Canister, Principal, query, Record, StableBTreeMap, text, update, ic, Vec} from 'azle';

//El tipo record sirve como un objeto de JS, en este se guardaran los datos de la transaccion para poder ser añadidos a la memoria estable y no puedan ser borrados, ya que STIF propone que las transacciones sean claras hacia la gente, por lo que no seran editables
//contiene el concepto, el monto, la fecha que se hizo la transaccion, la ID de quien añadio la transaccion al sistema y la fecha en la que se añadio al sistema
const Transaction = Record({
    concept: text, 
    amount: text, 
    date: text, 
    whoMadeIt: Principal,
    addedDate: text
})

//Mapa de transacciones, contiene todas las transacciones añadidas, las cuales pueden ser accedidas con el respectivo ID de la transaccion de asi desearse
let transactions = StableBTreeMap(Principal, Transaction, 0)

//Genera una serie de numeros aleatorios para designar la ID de la transaccion
function newTransactionID(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
//conceptos de transaccion aceptados (temporalmente 2)
const acceptedConcepts = [
    'COMPRA',
    'VENTA'
]

//El canister de STIF
export default Canister({
    //Muestra todos los valores de transaccion guardados en forma de un Vector de transacciones
    showTransactions: query([], Vec(Transaction), () => {
        return transactions.values();
    }),
    //Añade una nueva transaccion, con todo y su respectivo documento, retorna la transaccion añadida, ademas de guardarla en la memoria Stable
    sendTransactionData: update([text, text, text], Transaction, (concept, amount, date) => {
        //Verifica de forma sencilla que los datos tengan coherencia (verificacion basica)

        //verificacion de fecha
        let datetry: string[]= date.split("/") 
        if(parseInt(datetry[0]) > 31 || parseInt(datetry[1]) > 12){
            throw new Error('The date is not on a correct format, or, you supplied a wrong date, there is no more than 12 months or you surpassed the amount of days this month has, please supply an actual date on the DD/MM/YYYY Format.')
        }

        //verificacion de concepto
        if(! acceptedConcepts.includes(concept.toUpperCase())){
            throw new Error(`The given concept is not supported, correct it. the supported concepts are ${acceptedConcepts}`)
        }
        //verificacion de monto, si este contiene una letra no deberia estar
        let nonDigitRegex = /\D/gi
        if(nonDigitRegex.test(amount)){
            throw new Error(`The amount cant be or have a letter, please provide a quantity expressed in numbers, not in words`)
        }

        //genera una ID para la transaccion
        const transactionID = newTransactionID()
        //guarda los datos recibidos de la transaccion haciendo uso de el record definido anteriormente
        const transaction : typeof Transaction = {
            concept: concept.toUpperCase(),
            amount,
            date,
            whoMadeIt: ic.caller(),
            addedDate: new Date().toUTCString()
        }
        //inserta la nueva transaccion, accedible a traves del ID
        transactions.insert(transactionID, transaction)
        //retorna la transaccion para verificar que esta fue añadida
        return transaction
    })
});

