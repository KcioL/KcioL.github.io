/* --- NAVIGATION & MENU MOBILE --- */
const gestionMenu = () => {
    const burger = document.querySelector('.bouton-menu-mobile');
    const menu = document.querySelector('.menu-liens');
    const liensMenu = document.querySelectorAll('.menu-liens li');

    burger.addEventListener('click', () => {
        // Basculer le menu
        menu.classList.toggle('menu-ouvert');

        // Animation des liens
        liensMenu.forEach((lien, index) => {
            if (lien.style.animation) {
                lien.style.animation = '';
            } else {
                lien.style.animation = `animationApparitionLien 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation du bouton burger (croix)
        burger.classList.toggle('animation-croix');
    });
}

/* --- GESTION DES MODALES (Projets) --- */
const gestionModales = () => {
    const cartesProjet = document.querySelectorAll('.carte-projet');
    const boutonsFermer = document.querySelectorAll('.bouton-fermer');

    // Ouvrir la modale au clic sur une carte
    cartesProjet.forEach(carte => {
        carte.addEventListener('click', (e) => {
            
            // --- PROTECTION CLIC PDF ---
            // Si l'utilisateur clique sur le bouton PDF, on ne fait rien
            if (e.target.closest('.bouton-pdf')) {
                return; 
            }

            const idModale = carte.getAttribute('data-id');
            const modale = document.getElementById(idModale);
            if(modale) {
                modale.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Bloque le scroll
            }
        });
    });

    // Fermer la modale au clic sur la croix (X)
    boutonsFermer.forEach(btn => {
        btn.addEventListener('click', () => {
            const modale = btn.closest('.fenetre-modale');
            modale.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactive le scroll
        });
    });

    // Fermer la modale si on clique en dehors (fond sombre)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('fenetre-modale')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialisation
gestionMenu();
gestionModales();

// Défilement doux (Smooth scrolling)
document.querySelectorAll('a[href^="#"]').forEach(ancre => {
    ancre.addEventListener('click', function (e) {
        e.preventDefault();
        const cibleId = this.getAttribute('href');
        const cibleElement = document.querySelector(cibleId);

        if (cibleElement) {
            cibleElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Fermer le menu mobile si ouvert lors du clic sur un lien
        const menu = document.querySelector('.menu-liens');
        if(menu.classList.contains('menu-ouvert')){
            menu.classList.remove('menu-ouvert');
            const burger = document.querySelector('.bouton-menu-mobile');
            burger.classList.remove('animation-croix');
        }
    });
});