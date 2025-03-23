// Firebase Config
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Verifica el estado del usuario
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('logout-btn').style.display = 'block';
        document.getElementById('order-btn').style.display = 'block';
    } else {
        document.getElementById('logout-btn').style.display = 'none';
        document.getElementById('order-btn').style.display = 'none';
    }
});

// Registro de usuario
function showRegister() {
    const email = prompt("Introduce tu correo:");
    const password = prompt("Introduce tu contraseña:");
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Registro exitoso"))
        .catch(error => alert(error.message));
}

// Inicio de sesión
function showLogin() {
    const email = prompt("Introduce tu correo:");
    const password = prompt("Introduce tu contraseña:");
    auth.signInWithEmailAndPassword(email, password)
        .then(() => alert("Inicio de sesión exitoso"))
        .catch(error => alert(error.message));
}

// Cerrar sesión
function logout() {
    auth.signOut().then(() => alert("Sesión cerrada"));
}

// Mostrar formulario de pedido
function showOrderForm() {
    document.getElementById('order-form').style.display = 'block';
}

// Cerrar formulario de pedido
function closeOrderForm() {
    document.getElementById('order-form').style.display = 'none';
}

// Enviar pedido a Firebase
function submitOrder() {
    const user = auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para realizar un pedido");
        return;
    }

    const address = document.getElementById("address").value;
    const details = document.getElementById("address-details").value;
    const orderEmail = document.getElementById("order-email").value;
    const phone = document.getElementById("phone").value;

    if (!address || !details || !orderEmail || !phone) {
        alert("Todos los campos son obligatorios");
        return;
    }

    db.collection("pedidos").add({
        userId: user.uid,
        email: orderEmail,
        domicilio: address,
        detalles: details,
        telefono: phone,
        fecha: new Date()
    }).then(() => {
        alert("Pedido enviado correctamente");
        closeOrderForm();
    }).catch(error => {
        alert("Error al enviar pedido: " + error.message);
    });
}