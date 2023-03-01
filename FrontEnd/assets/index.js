
//AFFICHER LES PROJETS DYNAMIQUES // 
async function recupererProjets (){
  let reponse = await fetch("http://localhost:5678/api/works");
 
  if (reponse.status === 200) {
    const work = await reponse.json();
    console.log(work);

    for(let i = 0; i < work.length; i++) {
      let boxWork = work[i];
          let sectionProjet = document.querySelector(".gallery");
          let figureElement = document.createElement("figure")

          let imageElement = document.createElement("img");
          imageElement.src = work[i].imageUrl
          imageElement.alt = work[i].title

          let figureCaptionElement = document.createElement("figcaption")
          figureCaptionElement.innerHTML = work[i].title;
          
          figureElement.appendChild(imageElement);
          figureElement.appendChild(figureCaptionElement);
          sectionProjet.appendChild(figureElement);
      }
  }
};

recupererProjets();


//FILTRER PAR CATÉGORIE // 
async function filtrerProjets () {
  const response = await fetch("http://localhost:5678/api/works");
  const filtresProjets = await response.json();

  function afficherFiltres(works) {
    let sectionProjet = document.querySelector(".gallery");
    sectionProjet.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
      let boxWork = works[i];
      const figureProjet = document.createElement("figure")

      const imageProjet = document.createElement("img");
      imageProjet.src = works[i].imageUrl;
      imageProjet.alt = works[i].title;

      const titreProjet = document.createElement("figcaption");
      titreProjet.textContent = works[i].title;

      figureProjet.appendChild(imageProjet);
      figureProjet.appendChild(titreProjet);
      sectionProjet.appendChild(figureProjet);    }
}
const filterButtonObject = document.getElementById('filterObjets');
    filterButtonObject.addEventListener('click', function() {
      const ProjetFilteredObjects = filtresProjets.filter(works => works.categoryId == 1);
      console.log(ProjetFilteredObjects);
      afficherFiltres(ProjetFilteredObjects);
    });
  
    const filterButtonAppartements = document.getElementById('filterAppartements');
    filterButtonAppartements.addEventListener('click', function() {
      const ProjetFilteredAppartements = filtresProjets.filter(works => works.categoryId == 2);
      console.log(ProjetFilteredAppartements);
      afficherFiltres(ProjetFilteredAppartements);
    });
  
    const filterButtonHotels = document.getElementById('filterHotelsRestaurants');
    filterButtonHotels.addEventListener('click', function() {
      const ProjetFilteredHotels = filtresProjets.filter(works => works.categoryId == 3);
      console.log(ProjetFilteredHotels);
      afficherFiltres(ProjetFilteredHotels);
    });

    const filterButtonTous = document.getElementById('filterTous');
    filterButtonTous.addEventListener('click', function() {
      afficherFiltres(filtresProjets);
    });
  
    // AFFICHER TOUS LES PROJETS PAR DEFAUT //
    afficherFiltres(filtresProjets);
  }
  
  filtrerProjets();

 