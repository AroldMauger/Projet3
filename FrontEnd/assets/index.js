
//RÉCUPÉRER LES PROJETS // 
 /*function genererProjets () { 
  fetch("http://localhost:5678/api/works")
  .then (reponse => reponse.json())
  .then (work => {
  afficherProjets (work) 
  }) */
  async function genererProjets() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const projets = await reponse.json()
  console.log(projets)
  return projets 
  }
let dataProjets = await genererProjets()

  function afficherProjets(work) {
    let galleryProjet = document.querySelector(".gallery");
    galleryProjet.innerHTML = "";
  
    for (let i = 0; i < work.length; i++) {
      let figureProjet = document.createElement("figure")

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


async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories")
  const data = await reponse.json()
  return data 
  }
  let a = await recupererCategories()
  console.log(a)

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


/*

const filterButtonTous = document.getElementById("filterTous");
filterButtonTous.addEventListener('click', function() {
  dataProjets.filter(a => a.categoryId == 3);
});


*/
  
   /* avec boucle for of créer un addEventListener
    si les works ont les memes id que les categories, alors afficher

    const filterButtonObject = document.('class des categories de l'API');
    filterButtonObject.addEventListener('click', function() {
      const FilteredObjects = dataProjets.filter(work => work.categoryId == 1);
      afficherProjets(FilteredObjects);*/

    