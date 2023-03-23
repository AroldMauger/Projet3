/*ON DÉFINIT LES VARIABLES */
const buttonOpenModal1 = document.querySelector('.open_modal');
const buttonOpenModal2 = document.querySelector('.open-modal2');
const buttonReturn = document.querySelector('.button_return');
const buttonCloseModal= document.querySelectorAll('.closebutton_modal');
const modal1_Gallery = document.querySelector('#modal_gallery_photo')
const modal2_AjoutProjets = document.querySelector('#modal_ajout_photo')
const miniatures_modal1 = document.querySelector('.miniatures_projets')
const divIconeCorbeille = document.querySelectorAll('.div_icone_corbeille')



/*OUVRIR LA MODALE 1 */
let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('#nav_modal1').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}
    document.querySelectorAll('.open_modal').forEach(a => {
        a.addEventListener('click', openModal)
    })

    const stopPropagation = function (e) {
        e.stopPropagation()
    }

/* CODE REPRIS DU FICHIER INDEX.JS POUR AFFICHER LES MINIATURES*/
async function genererProjets() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const projets = await reponse.json()
  console.log(projets)
  return projets 
  }

    /* On définit la variable dataProjets qui contient les travaux en JSON */
let dataProjets = await genererProjets()

    /* On crée une fonction qui affiche figure/image/titre pour chaque projet */

  function afficherProjets(work) {
    let miniaturesProjet = document.querySelector(".miniatures_projets");
    miniaturesProjet.innerHTML = "";

    for (let i = 0; i < work.length; i++) {
     
      const workIdentification = dataProjets.map(dataProjets => dataProjets.id)
      let workId = workIdentification[i];

      let figureProjet = document.createElement("figure")
      figureProjet.className = "figure_miniature";

      let imageProjet = document.createElement("img");
      imageProjet.src = work[i].imageUrl;
      imageProjet.alt = work[i].title;
      imageProjet.style.width = "75px";
      imageProjet.style.height = "100px";

      let divIconeCorbeille = document.createElement("div");
      divIconeCorbeille.className = "div_icone_corbeille";
      divIconeCorbeille.addEventListener('click', async function(e){
        e.preventDefault();
        figureProjet.remove();
        await supprimerProjets(workId)
      })

      let iconeCorbeille = document.createElement("i");
      iconeCorbeille.className = "fa-regular fa-trash-can icone_corbeille";
     
      let titreProjet = document.createElement("figcaption");
      titreProjet.textContent = "éditer";
      titreProjet.className = "paragraphe_editer";

      miniaturesProjet.appendChild(figureProjet);  
      figureProjet.appendChild(imageProjet);
      figureProjet.appendChild(divIconeCorbeille);
      divIconeCorbeille.appendChild(iconeCorbeille);
      figureProjet.appendChild(titreProjet); 
     
      if (i === 0) {

        let divIconeAgrandir = document.createElement("div");
        divIconeAgrandir.className = "div_icone_agrandir";

        let iconeAgrandir = document.createElement("i");
        iconeAgrandir.className = "fa-solid fa-up-down-left-right";

        figureProjet.appendChild(divIconeAgrandir);
        divIconeAgrandir.appendChild(iconeAgrandir);
      }
    }
   
}
    afficherProjets(dataProjets);

// Ajouter l'icône de déplacement uniquement sur le premier élément


/*OUVRIR LA MODALE 2 */

buttonOpenModal2.addEventListener("click", () => {
    modal1_Gallery.style.display = 'none';
    modal1_Gallery.setAttribute('aria-hidden', 'true');
    modal1_Gallery.removeAttribute('aria-model');
    modal2_AjoutProjets.style.display = 'flex';
    modal2_AjoutProjets.removeAttribute('aria-hidden');
    modal2_AjoutProjets.setAttribute('aria-model', 'true');

});

// --- RETOUR A LA MODALE 1 AVEC LA FLECHE ---
    buttonReturn.addEventListener("click", (e) => {
    e.preventDefault(); 
    modal1_Gallery.style.display = 'flex';
    modal1_Gallery.removeAttribute('aria-hidden');
    modal1_Gallery.setAttribute('aria-model', 'true');
    afficherProjets(dataProjets)
    modal2_AjoutProjets.style.display = 'none'; 
    modal2_AjoutProjets.setAttribute('aria-hidden', 'true');
    modal2_AjoutProjets.removeAttribute('aria-model');
})

/*FERMER LES MODALES */
    buttonCloseModal.forEach(buttonCloseModal => buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault(); 
    closeModal()
}));

function closeModal() {
    modal1_Gallery.style.display = 'none'; 
    modal2_AjoutProjets.style.display = 'none'; 
    modal1_Gallery.setAttribute('aria-hidden', 'true');
    modal1_Gallery.removeAttribute('aria-model');
    modal2_AjoutProjets.setAttribute('aria-hidden', 'true');
    modal2_AjoutProjets.removeAttribute('aria-model');
}
  /*Fonction pour que la modale se ferme uniquement quand on clique sur la croix ou sur la touche ECHAP*/
    
window.addEventListener('keydown', function(e){ 
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
}) 
/* On ferme la modale 2 si on clique en dehors de la modale */
window.addEventListener('click', function(e) {
  if (e.target == modal2_AjoutProjets) {
    modal2_AjoutProjets.style.display = "none";
  }
});

/// supprimer un projet

  async function supprimerProjets(workId) {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` +sessionStorage.getItem("token")
        }
    });
    if (response.ok) {
        console.log('Travail supprimé avec succès');

    
      
    } else {
        console.log('Impossible de supprimer le travail');
    }

}