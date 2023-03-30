/* On définit ce qui doit se passer quand on remplit le formulaire de connexion*/
document.formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    /*On définit une constante "user" qui contient les champs email/password */
    const user = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };

    if(email.value == ""){
        alert("veuillez entrer votre email") 
    }
    else if (password.value == ""){
    alert("veuillez entrer votre mot de passe") 
    }

    /*Si l'email et le mot de passe correspondent à ceux de Sophie Bluel on permet la connexion */
    else{

    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(user)
    })
    .then (reponse => reponse.json())
    .then (reponse => {
    sessionStorage.setItem('userId',reponse.userId);
    sessionStorage.setItem('token', reponse.token);
    if (reponse.token) {
        document.location.href="./index.html";
    }
    else {
        alert("Mot de passe et/ou identifiant incorrect");
    }
})
}})