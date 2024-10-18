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
    const saveChangesButton = document.createElement("button"); // Nouveau bouton pour enregistrer les modifications
    const cancelButton = document.getElementById("cancelButton");
    const closeInfoForm = document.getElementById("closeInfoForm");
    const overlay = document.getElementById("overlay");

    // Style pour le bouton "Enregistrez les modifications"
    saveChangesButton.textContent = "Enregistrez les modifications";
    saveChangesButton.id = "saveChangesButton";
    saveChangesButton.style.display = "none"; // Caché par défaut
    form.querySelector(".form-buttons").appendChild(saveChangesButton); // Ajout au formulaire

    // Fonction pour afficher/masquer le formulaire
    function toggleForm() {
        if (formContainer.style.display === "none" || formContainer.style.display === "") {
            formContainer.style.display = "block";
            overlay.style.display = "block"; // Afficher l'overlay
        } else {
            formContainer.style.display = "none";
            overlay.style.display = "none"; // Masquer l'overlay
        }
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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
                card.remove();
            }
        });

        const editButton = document.createElement("button");
        editButton.textContent = "✎";
        editButton.classList.add("editButton");

        // Événement pour modifier les informations de la carte
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            alert("Cette fonctionnalité est en cours de développement.");
        });

        const link = document.createElement("a");
        link.href = "#";

        const img = document.createElement("img");
        img.src = picture ? URL.createObjectURL(picture) : 'public/default.jpg';
        img.alt = `${firstname} ${name}`;

        link.appendChild(img);
        card.appendChild(deleteButton); // Ajout du bouton delete
        card.appendChild(editButton); // Ajout du bouton modifier
        card.appendChild(link);

        profilesContainer.appendChild(card);

        form.reset();
        formContainer.style.display = "none";
        overlay.style.display = "none"; // Masquer le formulaire

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

        formContainer.style.display = "flex";
        overlay.style.display = "block"; // Afficher le formulaire

        // Masquer l'input pour la photo lors de la consultation
        document.querySelector('label[for="photo"]').style.display = "none";
        document.getElementById("photo").style.display = "none";

        // Rendre les champs non modifiables
        setReadonly(true);
        saveProfileButton.style.display = "none";
        saveChangesButton.style.display = "none"; // Masquer le bouton "Enregistrez les modifications"
        cancelButton.style.display = "none"; // Masquer le bouton Annuler
        closeInfoForm.style.display = "block"; // Afficher le bouton Fermer
    }

    // Réinitialiser le formulaire
    function resetForm() {
        form.reset();
        setReadonly(false); // Rendre les champs modifiables
        saveProfileButton.style.display = "block"; // Afficher le bouton Enregistrer
        saveChangesButton.style.display = "none"; // Masquer le bouton "Enregistrez les modifications"
        cancelButton.style.display = "block"; // Afficher le bouton Annuler
        closeInfoForm.style.display = "none"; // Masquer le bouton Fermer
        document.querySelector('label[for="photo"]').style.display = "block"; // Réafficher l'input pour la photo lors de la réinitialisation
        document.getElementById("photo").style.display = "block";
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
        formContainer.style.display = "none";
        overlay.style.display = "none"; // Fermer le formulaire
    });

    // Événement pour masquer le formulaire au clic en dehors
    document.addEventListener("click", function (event) {
        const isClickInsideForm = formContainer.contains(event.target) || event.target === btnHeader || event.target === btnBody;

        if (formContainer.style.display === "block" && !isClickInsideForm) {
            formContainer.style.display = "none";
            overlay.style.display = "none"; // Fermer l'overlay
        }
    });

    // Événement pour le bouton Annuler
    cancelButton.addEventListener("click", function () {
        resetForm(); // Réinitialiser le formulaire avant de fermer
        formContainer.style.display = "none"; // Fermer le formulaire
        overlay.style.display = "none";
    });
});