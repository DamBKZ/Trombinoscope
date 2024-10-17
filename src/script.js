function toggleMenu() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
}

// Formulaires
document.addEventListener("DOMContentLoaded", function () {
    const btnHeader = document.getElementById("btnFormulaire");
    const btnBody = document.getElementById("btnFormulaireBody");
    const formContainer = document.getElementById("formContainer");
    const form = document.getElementById("profileForm");
    const profilesContainer = document.querySelector(".Cards");
    const saveProfileButton = document.getElementById("saveProfile");
    const cancelButton = document.getElementById("cancelButton");
    const closeInfoForm = document.getElementById("closeInfoForm");

    // Fonction pour afficher/masquer le formulaire
    function toggleForm() {
        formContainer.style.display = (formContainer.style.display === "none" || formContainer.style.display === "") ? "block" : "none";
        resetForm(); // Réinitialise le formulaire à chaque ouverture
    }

    // Événements pour afficher le formulaire
    btnHeader.addEventListener("click", toggleForm);
    btnBody.addEventListener("click", toggleForm);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Récupération des valeurs du formulaire
        const firstname = document.getElementById("prenom").value;
        const name = document.getElementById("nom").value;
        const biography = document.getElementById("biographie").value;
        const goals = document.getElementById("objectifs").value;
        const experience = document.getElementById("experience").value;
        const linkedin = document.getElementById("linkedin").value;
        const portfolio = document.getElementById("portfolio").value;
        const picture = document.getElementById("photo").files[0];

        // Création de la carte
        const card = document.createElement("article");
        card.classList.add("Photo");

        const link = document.createElement("a");
        link.href = "#";

        const img = document.createElement("img");
        img.src = picture ? URL.createObjectURL(picture) : 'public/default.jpg';
        img.alt = `${firstname} ${name}`;

        link.appendChild(img);
        card.appendChild(link);

        profilesContainer.appendChild(card);

        form.reset();
        formContainer.style.display = "none"; // Masquer le formulaire

        // Événement pour afficher les informations de la carte
        card.addEventListener('click', () => {
            afficherInformationsCarte(firstname, name, biography, goals, experience, linkedin, portfolio);
        });
    });

    // Fonction pour afficher les informations dans le formulaire
    function afficherInformationsCarte(firstname, name, biography, goals, experience, linkedin, portfolio) {
        document.getElementById("prenom").value = firstname;
        document.getElementById("nom").value = name;
        document.getElementById("biographie").value = biography;
        document.getElementById("objectifs").value = goals;
        document.getElementById("experience").value = experience;
        document.getElementById("linkedin").value = linkedin;
        document.getElementById("portfolio").value = portfolio;

        formContainer.style.display = "flex"; // Afficher le formulaire

        // Rendre les champs non modifiables
        setReadonly(true);

        // Masquer le bouton Enregistrer
        saveProfileButton.style.display = "none";
        cancelButton.style.display = "none"; // Masquer le bouton Annuler
        closeInfoForm.style.display = "block"; // Afficher le bouton Fermer
    }

    // Réinitialiser le formulaire
    function resetForm() {
        form.reset();
        setReadonly(false); // Rendre les champs modifiables
        saveProfileButton.style.display = "block"; // Afficher le bouton Enregistrer
        cancelButton.style.display = "block"; // Afficher le bouton Annuler
        closeInfoForm.style.display = "none"; // Masquer le bouton Fermer
    }

    // Fonction pour rendre les champs en lecture seule
    function setReadonly(isReadonly) {
        document.getElementById("prenom").readOnly = isReadonly;
        document.getElementById("nom").readOnly = isReadonly;
        document.getElementById("biographie").readOnly = isReadonly;
        document.getElementById("objectifs").readOnly = isReadonly;
        document.getElementById("experience").readOnly = isReadonly;
        document.getElementById("linkedin").readOnly = isReadonly;
        document.getElementById("portfolio").readOnly = isReadonly;
    }

    // Événement pour fermer le formulaire
    closeInfoForm.addEventListener("click", function () {
        formContainer.style.display = "none"; // Fermer le formulaire
    });

    // Événement pour masquer le formulaire au clic en dehors
    document.addEventListener("click", function (event) {
        const isClickInsideForm = formContainer.contains(event.target) || event.target === btnHeader || event.target === btnBody;

        if (formContainer.style.display === "block" && !isClickInsideForm) {
            formContainer.style.display = "none";
        }
    });

    // Événement pour le bouton Annuler
    cancelButton.addEventListener("click", function () {
        form.reset();
        formContainer.style.display = "none"; // Fermer le formulaire
    });
});
