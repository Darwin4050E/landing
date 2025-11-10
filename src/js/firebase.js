
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  senderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

let saveVotes = (productId) => {
    // Referencia a la colección 'votes'
    const votesRef = ref(database, "votes");
    // Crear nueva referencia única
    const newVoteRef = push(votesRef);
    // Guardar los datos con set()
    return set(newVoteRef, {
        productID: productId,
        date: new Date().toISOString()
    })
    .then(() => {
        // Si todo sale bien, devolver un objeto de éxito
        return { status: "success", message: "Voto guardado correctamente." };
    })
    .catch((error) => {
        // Si ocurre un error, devolver un objeto de error
        return { status: "error", message: error.message };
    });
}

let enableForm = () => {
    const form = document.getElementById("form_voting");
    if(form){
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const productId = document.getElementById("select_product").value;
            saveVotes(productId)
                .then(response => {
                    alert(response.message);
                });
        });
    }
}

export { enableForm };