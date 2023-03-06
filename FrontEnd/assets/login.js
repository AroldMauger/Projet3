
document.formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();
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
    else{

    const reponse = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(user)
    });

    const data = await reponse.json();

    sessionStorage.setItem('userId',data.userId);
    sessionStorage.setItem('token', data.token);

    if (data.token) {
        document.location.href="./index.html";
    } else {
        alert("Mot de passe et/ou identifiant incorrect");
    }
}
    
});

/* ON DÉFINIT LES CONSTANTES 
const token = sessionStorage.getItem('token');  
const boutonsModifier =  document.querySelectorAll(".boutonModifier");
const logOut = document.getElementById("logout");

/* Pour remplacer login par logout dans le header si le token est reconnu 

function logOutRemplaceLogIn () {
    if (token) {
        document.getElementById('logout').style.display = 'block';
        document.getElementById('loginHeader').style.display = 'none';
        document.querySelector('.allFilters').style.display = 'none';       
    }
}
logOutRemplaceLogIn();

/*Affichage du mode édition 

function ModeEdition () {
    if (token) {
        document.getElementById('headerEdition').style.display = flex;
        //affichage des bouttons modifier
        for (let i of boutonsModifier) {
        boutonsModifier.style.display = flex;
        }
        }
};
ModeEdition();

/*Supprimer les données dans le Storage, faire apparaitre "login", faire disparaitre le mode édition 
logOut.addEventListener("click",function (){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    logOut.style.display = 'none';
    document.getElementById('loginHeader').style.display = 'block';
    document.getElementById('headerEdition').style.display = 'none';
    document.querySelector('.allFilters').style.display = 'flex';
    for (let i of boutonsModifier) {
        boutonsModifier.style.display ='none';
    }
})
*/