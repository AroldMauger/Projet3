import { afficherProjets} from "./index.js";


/*ON DÉFINIT LES VARIABLES */
const buttonOpenModal1 = document.querySelector('.open_modal');
const buttonOpenModal2 = document.querySelector('.open-modal2');
const buttonReturn = document.querySelector('.button_return');
const buttonCloseModal= document.querySelectorAll('.closebutton_modal');
const modal1_Gallery = document.querySelector('#modal_gallery_photo')
const modal2_AjoutProjets = document.querySelector('#modal_ajout_photo')
const miniatures_modal1 = document.querySelector('.miniatures_projets')
const divIconeCorbeille = document.querySelectorAll('.div_icone_corbeille')
const formulaireImageAvant = document.querySelector(".avant");
const formulaireImageApres = document.querySelector(".apres");
const buttonSubmitProjet = document.querySelector("#valider");
const titleForm = document.querySelector('#title');
const categorieForm = document.querySelector('#category');
const maxImageSize = 4 * 1024 * 1024; // 4 Mo en octets

const categories = {
  "": 0,
  "Objets": 1,
  "Appartements": 2,
  "Hôtels & restaurants": 3
};

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

  function afficherProjetsModal(work) {
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
        figureProjet.remove();          /* permet de supprimer l'image dans la galerie modale */
        await supprimerProjets(workId) /* permet de supprimer l'image dans la base de données avec l'API */
        
        const projet = document.getElementById(`projet${i+1}`);
        projet.replaceWith();
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
afficherProjetsModal(dataProjets);



/*OUVRIR LA MODALE 2 */

buttonOpenModal2.addEventListener("click", () => {
    modal1_Gallery.style.display = 'none';
    modal1_Gallery.setAttribute('aria-hidden', 'true');
    modal1_Gallery.removeAttribute('aria-modal');
    modal2_AjoutProjets.style.display = 'flex';
    modal2_AjoutProjets.removeAttribute('aria-hidden');
    modal2_AjoutProjets.setAttribute('aria-modal', 'true');

});

// --- RETOUR A LA MODALE 1 AVEC LA FLECHE ---
    buttonReturn.addEventListener("click", (e) => {
    e.preventDefault(); 
    modal1_Gallery.style.display = 'flex';
    modal1_Gallery.removeAttribute('aria-hidden');
    modal1_Gallery.setAttribute('aria-modal', 'true');
    afficherProjets(dataProjets)
    modal2_AjoutProjets.style.display = 'none'; 
    modal2_AjoutProjets.setAttribute('aria-hidden', 'true');
    modal2_AjoutProjets.removeAttribute('aria-modal');
    formulaireImageAvant.style.display ="flex";
    formulaireImageApres.style.display ="none";
})

/*FERMER LES MODALES */
    buttonCloseModal.forEach(buttonCloseModal => buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault(); 
    closeModal()
    formulaireImageAvant.style.display ="flex";
    formulaireImageApres.style.display ="none";

}));

function closeModal() {
    modal1_Gallery.style.display = 'none'; 
    modal2_AjoutProjets.style.display = 'none'; 
    modal1_Gallery.setAttribute('aria-hidden', 'true');
    modal1_Gallery.removeAttribute('aria-modal');
    modal2_AjoutProjets.setAttribute('aria-hidden', 'true');
    modal2_AjoutProjets.removeAttribute('aria-modal');
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
    formulaireImageAvant.style.display ="flex";
    formulaireImageApres.style.display ="none";
  }
});

/* Fonction DELETE pour supprimer un projet  */

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
        /*const figure_gallery = document.querySelector(".figure_gallery")  
        figure_gallery.remove()   */

    } else {
        console.log('Impossible de supprimer le travail');
    }
  
}
 


// --- Ajout d'un projet --- 
const form = document.querySelector("#formModal2");
const inputImage = document.getElementById("charger_image");
let currentimage = null;


inputImage.addEventListener("change",(event)=>{
    currentimage = event.target.files[0];

// ---  Remplacement de l'image dans le formulaire d'ajout ---
if (currentimage != null) {
    formulaireImageAvant.style.display ="none";
    formulaireImageApres.style.display ="flex";
    formulaireImageApres.innerHTML = '<img src="' + URL.createObjectURL(currentimage) +'" class= "imageFormulaireApres">';
    verifValueFormSubmitProject()
} else {
    formulaireImageAvant.style.display ="flex";
    formulaireImageApres.style.display ="none";
    buttonSubmitProjet.style.backgroundColor = "#A7A7A7";
}
})

// --- Changement d'état du boutton valider ---

let valeurTitleForm = null;
let valeurCategorieForm = null;

titleForm.addEventListener("change",(event)=>{
    valeurTitleForm = event.target.value;
    verifValueFormSubmitProject()
});
categorieForm.addEventListener("change",(event)=>{
    valeurCategorieForm = event.target.value;
    verifValueFormSubmitProject()
});

function verifValueFormSubmitProject() {
  if (valeurTitleForm && valeurCategorieForm && currentimage != null) { 
      buttonSubmitProjet.style.backgroundColor = "#1D6154";
  }else{
      buttonSubmitProjet.style.backgroundColor = "#A7A7A7";
  }

};

/* Fonction pour fermer les modales  */

function closeAllModals() {
  modal1_Gallery.style.display = 'none'; 
  modal2_AjoutProjets.style.display = 'none'; 
  modal1_Gallery.setAttribute('aria-hidden', 'true');
  modal1_Gallery.removeAttribute('aria-modal');
  modal2_AjoutProjets.setAttribute('aria-hidden', 'true');
  modal2_AjoutProjets.removeAttribute('aria-modal');
};

/* Ajouter un nouveau projet avec POST  */


let addElem = document.querySelector("#valider");
	addElem.addEventListener('click', function(event) {
		event.preventDefault();
    if ( valeurTitleForm === '' || valeurCategorieForm === '' || currentimage == null) {
      alert("Données incomplètes. Veuillez remplir tout le formulaire.");
    }
    else {
    closeAllModals();
		const formData = new FormData();
	
    formData.append('image',currentimage);
    formData.append('title',title.value);
    formData.append('category',categories[category.value]);

		fetch(`http://localhost:5678/api/works`, {
			method: 'POST',
      headers: {
        'Authorization': `Bearer ` +sessionStorage.getItem("token"),
        'accept': 'application/json',
    },
    body: formData
		})
		.then((response2)=>{
      return response2.json();
		})
		.then((response2) => {
			console.log(response2);

/* Ajout du nouveau projet sur la page principale et la modale  */

			let newFigureElem = document.createElement('figure')
			newFigureElem.setAttribute('id', response2.id)
			newFigureElem.classList.add(`work-item`);
			newFigureElem.classList.add(`category-id-0`);
			newFigureElem.classList.add(`category-id-${response2.categoryId}`);
			document.getElementsByClassName('gallery')[0].appendChild(newFigureElem);

			let newImgElem = document.createElement('img');
			newFigureElem.appendChild(newImgElem);
			newImgElem.setAttribute("src", response2.imageUrl);
			newImgElem.setAttribute("crossorigin", "anonymous");


			let newFigCaptionElement = document.createElement('figcaption');
			newFigureElem.appendChild(newFigCaptionElement);
			newFigCaptionElement.textContent = response2.title;

      let newFigureElemModal = document.createElement('figure')
      newFigureElemModal.setAttribute('id', response2.id)
      newFigureElemModal.classList.add(`work-item`);
      newFigureElemModal.classList.add(`category-id-0`);
      newFigureElemModal.classList.add(`category-id-${response2.categoryId}`);
      document.getElementsByClassName('miniatures_projets')[0].appendChild(newFigureElemModal);
      
      let newImgElemModal = document.createElement('img');
      newImgElemModal.setAttribute("src", response2.imageUrl);
      newImgElemModal.setAttribute("crossorigin", "anonymous");
      newImgElemModal.style.width = "75px";
      newImgElemModal.style.height = "100px";
      
      let newFigCaptionElementModal = document.createElement('figcaption');
      newFigCaptionElementModal.textContent = "éditer";
      newFigCaptionElementModal.className = "new_paragraphe_editer";
      
      let newDivIconeCorbeilleModal = document.createElement("div");
      newDivIconeCorbeilleModal.className = "new_div_icone_corbeille";
      

      newDivIconeCorbeilleModal.addEventListener('click', async function(e) {
        e.preventDefault();
        newFigureElemModal.remove();
        await supprimerProjets(newFigureElemModal)

        const projet = document.getElementById(response2.id);
        projet.remove(); /* ICI SONT LES PROBLEMES */
          
      })
      
      let newIconeCorbeilleModal = document.createElement("i");
      newIconeCorbeilleModal.className = "fa-regular fa-trash-can icone_corbeille";
      
      newFigureElemModal.appendChild(newImgElemModal);
      newFigureElemModal.appendChild(newFigCaptionElementModal);
      newFigureElemModal.appendChild(newDivIconeCorbeilleModal);
      newDivIconeCorbeilleModal.appendChild(newIconeCorbeilleModal);
      
      formulaireImageAvant.style.display ="flex";
      formulaireImageApres.style.display ="none";
      
})
.catch(error => {
  console.error('Une erreur a été détectée', error);

});
}});


