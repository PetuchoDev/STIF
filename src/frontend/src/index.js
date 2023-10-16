import {createActor, STIF2} from "../../declarations/STIF2";
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

//sirve de intermediario entre el front del Login, y el backend
let actor = STIF2;
//en caso que el login sea correcto, este campo sera llenado
export let identitySuccess;

const loginButton = document.getElementById("login");

loginButton.onclick = async (e) => {
    e.preventDefault();

    // crea un cliente para la autenticacion
    let authClient = await AuthClient.create();

    // inicia el proceso de logueo y espera a que termine
    await new Promise((resolve) => {
        authClient.login({
            identityProvider: process.env.II_URL,
            onSuccess: resolve,
        });
    });

    // en este punto ya esta autenticado el usuario por lo que podemos obtener su IID
    const identity = authClient.getIdentity();
    // usando la identidad obtenida se puede crear un agente para interactuar con Internet computer
    const agent = new HttpAgent({identity});
    // usando la descripcion de interfaz de la dapp, creamos un actor para llamar los metodos de servicio
    actor = createActor(process.env.GREET_BACKEND_CANISTER_ID, {
        agent,
    });
    identitySuccess = identity
    return false;
};                             

const sendTransactionForm = document.getElementById('sendTransactionForm')

sendTransactionForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let concept = document.getElementById('concept')
    let amount = document.getElementById('amount')
    let date = document.getElementById('date')
    let doc = document.getElementById('doc')

    STIF2.sendTransactionData(concept.value, amount.value, date.value, doc.value)
})