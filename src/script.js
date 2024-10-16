function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

//gestion du moueover en desktop

document.addEventListener("DOMContentLoaded", function () {
    const btnHeader = document.getElementById("btnFormulaire");
    const btnBody = document.getElementById("btnFormulaireBody");
    const formContainer = document.getElementById("formContainer");
    
    // Sélectionner le conteneur des cartes par sa classe
    const profilesContainer = document.querySelector(".Cards"); // Sélectionner le conteneur avec la classe "Cards"
    
    const form = document.getElementById("profileForm");

    function toggleForm() {
        formContainer.style.display = formContainer.style.display === "none" || formContainer.style.display === "" ? "block" : "none";
    }

    btnHeader.addEventListener("click", toggleForm);
    btnBody.addEventListener("click", toggleForm);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs des champs du formulaire
        const prenom = document.getElementById("prenom").value;
        const nom = document.getElementById("nom").value;
        const biographie = document.getElementById("biographie").value;
        const objectifs = document.getElementById("objectifs").value;
        const experience = document.getElementById("experience").value;
        const linkedin = document.getElementById("linkedin").value;
        const portfolio = document.getElementById("portfolio").value;
        const photo = document.getElementById("photo").files[0]; // Récupérer le fichier de l'image téléchargée

        // Debug : Afficher les valeurs dans la console
        console.log("Prénom:", prenom);
        console.log("Nom:", nom);
        console.log("Biographie:", biographie);
        console.log("Objectifs:", objectifs);
        console.log("Expérience:", experience);
        console.log("LinkedIn:", linkedin);
        console.log("Portfolio:", portfolio);

        // Vérifier que les champs Prénom et Nom sont remplis
        if (!prenom || !nom) {
            alert("Prénom et nom sont obligatoires.");
            return;
        }

        // Vérifier si le conteneur des cartes existe avant d'ajouter la carte
        if (!profilesContainer) {
            console.error("Le conteneur des cartes est introuvable !");
            return; // Sortir de la fonction si le conteneur n'existe pas
        }

        // Créer un nouvel élément pour la carte
        const card = document.createElement("article");
        card.classList.add("Photo"); // Assigner la classe "Photo"

        // Générer une URL pour l'image téléchargée
        const imageUrl = photo ? URL.createObjectURL(photo) : 'public/default.jpg'; // Image par défaut si aucune photo n'est téléchargée

        // Générer le contenu de la nouvelle carte
        card.innerHTML = `
            <a href="#">
                <img src="${imageUrl}" alt="${prenom} ${nom} en couleur">
            </a>
            <h3>${prenom} ${nom}</h3>
            <p><strong>Biographie:</strong> ${biographie}</p>
            <p><strong>Objectifs:</strong> ${objectifs}</p>
            <p><strong>Expérience:</strong> ${experience}</p>
            <p><a href="${linkedin}" target="_blank">LinkedIn</a> | <a href="${portfolio}" target="_blank">Portfolio</a></p>
        `;

        // Ajouter la nouvelle carte au conteneur des cartes
        profilesContainer.appendChild(card); // Ajouter la carte au conteneur

        // Réinitialiser le formulaire
        form.reset();
        formContainer.style.display = "none"; // Fermer le formulaire

        // Ajouter une classe pour l'animation (facultatif)
        setTimeout(() => card.classList.add('visible'), 10);
    });

    document.addEventListener("click", function (event) {
        const isClickInside = formContainer.contains(event.target) || event.target === btnHeader || event.target === btnBody;

        if (formContainer.style.display === "block" && !isClickInside) {
            formContainer.style.display = "none"; // Fermer le formulaire si le clic est en dehors
        }
    });

    const cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener("click", function() {
        form.reset(); // Réinitialiser les champs
        formContainer.style.display = "none"; // Fermer le formulaire
    });
});
