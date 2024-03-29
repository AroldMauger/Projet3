

  /* On génère les projets avec FETCH */

  async function genererProjets() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const projets = await reponse.json()
  console.log(projets)
  return projets 
  }

    /* On définit la variable dataProjets qui contient les travaux en JSON */
let dataProjets = await genererProjets()

    /* On crée une fonction qui affiche figure/image/titre pour chaque projet */

    export function afficherProjets(work) {
    let galleryProjet = document.querySelector(".gallery");
    galleryProjet.innerHTML = "";
  
    for (let i = 0; i < work.length; i++) {

      let figureProjet = document.createElement("figure")
      figureProjet.id = "projet"+[i+1];

      let imageProjet = document.createElement("img");
      imageProjet.src = work[i].imageUrl;
      imageProjet.alt = work[i].title;

      let titreProjet = document.createElement("figcaption");
      titreProjet.textContent = work[i].title;

      galleryProjet.appendChild(figureProjet);  
      figureProjet.appendChild(imageProjet);
      figureProjet.appendChild(titreProjet); 

    }}
   

    afficherProjets(dataProjets);

    

  /* On génère les catégories avec FETCH */

async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories")
  const data = await reponse.json()
  return data 
  }
  let a = await recupererCategories()
  console.log(a)

  /* On crée une fonction qui affiche les catégories à partir du JSON */

  function afficherCategories(parametres) {

    for (let b of parametres) {
      const ul = document.querySelector(".allFilters ul");
      const liste = document.createElement('li')
      liste.textContent = b.name
      liste.setAttribute("id", b.id) 
      liste.classList.add("categorieAPI") 
      ul.appendChild(liste)
    }
  }
afficherCategories(a)

  /* On définit ce qui doit être affiché en cliquant sur les catégories */

const allButton = document.getElementById('filterTous');
allButton.addEventListener('click', function() {
  afficherProjets(dataProjets);
})

const filterButtonObject = document.getElementById('1');
filterButtonObject.addEventListener('click', function() {
  const FilteredObjects = dataProjets.filter(a => a.categoryId == 1);
  console.log(FilteredObjects);
  afficherProjets(FilteredObjects);
});
const filterButtonAppartements = document.getElementById('2');
filterButtonAppartements.addEventListener('click', function() {
  const FilteredAppartements = dataProjets.filter(a => a.categoryId == 2);
  console.log(FilteredAppartements);
  afficherProjets(FilteredAppartements);
});
const filterButtonHotels = document.getElementById('3');
filterButtonHotels.addEventListener('click', function() {
  const FilteredHotels = dataProjets.filter(a => a.categoryId == 3);
  console.log(FilteredHotels);
  afficherProjets(FilteredHotels);
});


afficherProjets(dataProjets)

/* On définit les constantes */
const token = sessionStorage.getItem('token');  
const boutonsModifier =  document.querySelectorAll(".boutonModifier");
const logOut = document.getElementById("logout");

/* Pour remplacer login par logout dans le header si le token est reconnu */

function logOutRemplaceLogIn () {
    if (token) {
        document.getElementById('logout').style.display = 'block';
        document.getElementById('loginHeader').style.display = 'none';
        document.querySelector('.allFilters').style.display = 'none';       
    }
}
logOutRemplaceLogIn();

/*Affichage du mode édition, bandeau noir*/

function ModeEdition () {
    if (token) {
        document.getElementById('headerEdition').style.display = '';
        //affichage des boutons modifier
        for (let i = 0; i < boutonsModifier.length; i++) {
          boutonsModifier[i].style.display ='';
      }
  }
};
ModeEdition();

/*Supprimer les données dans le Storage, faire apparaitre "login", 
faire disparaitre le mode édition et les 3 boutons modifier */
logOut.addEventListener("click",function (){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    logOut.style.display = 'none';
    document.getElementById('loginHeader').style.display = 'block';
    document.getElementById('headerEdition').style.display = 'none';
    document.querySelector('.allFilters').style.display = 'flex';
    for (let i = 0; i < boutonsModifier.length; i++) {
      boutonsModifier[i].style.display ='none';
  }
}
)




