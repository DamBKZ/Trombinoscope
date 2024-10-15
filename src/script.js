/*function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

gestion du moueover en desktop
// Fonction pour gérer le changement d'image et l'affichage des informations

// Récupération des éléments avec la classe "Photo"*/

const photos = document.querySelectorAll('.Photo');

photos.forEach(photo => {  // Création de la variable photo
    const img = photo.querySelector('img'); // Sélectionne l'image dans chaque photo

    // Mouseover => image en noir et blanc et afficher le bloc texte
    photo.addEventListener('mouseover', () => {
        img.src = img.src.replace('public/aurelien.jpg', 'public/aurelien_n-b.jpg');
    });

    // Mouseout => remettre l'image en couleur et cacher le bloc texte
    photo.addEventListener('mouseout', () => {
        img.src = img.src.replace('public/aurelien_n-b.jpg', 'public/aurelien.jpg');
    });
});
