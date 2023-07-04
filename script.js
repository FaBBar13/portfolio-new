

/*  Barre Nav */
// const iconeHamburger = document.querySelector('.burger span');
const iconeHamburger = document.getElementById('icone-burger');
const classLiens = document.querySelector('.liens');
const divBurger = document.querySelector('.burger')

divBurger.addEventListener('click', () => {
    classLiens.classList.toggle('menu-mobile');
    iconeHamburger.classList.toggle('open')

});

classLiens.addEventListener('click', ({ target }) => {

    if (target.closest('a')) {
        divBurger.click();
    }
})


/* Section Projet */


let projets = '{"projets":[' +
    '{"nomProjet":"memory"		,"nomAffiche":"Memory"				,"lien":"#"	,"image":"./images/1.jpg" },' +
    '{"nomProjet":"integration"	,"nomAffiche":"Première Intégration","lien":"#" ,"image":"./images/2.jpg" },' +
    '{"nomProjet":"bootstrap"	,"nomAffiche":"BootStrap"			,"lien":"#"	,"image":"./images/3.jpg" },' +
    '{"nomProjet":"movie"		,"nomAffiche":"MovieQuiz"			,"lien":"#"	,"image":"./images/4.jpg" }]}';

const objProjets = JSON.parse(projets);
console.log(objProjets);

let divCentre = document.querySelector(".wrapper");
let divSlider = document.getElementById("projet-slider");

function afficheProjet() {

    let result = [];

    for (i = 0; i < objProjets.projets.length; i++) {

        const divProjet = document.createElement("div");
        divProjet.className = "div-projet";
        const nomProjet = document.createElement("h4");
        nomProjet.className = "nom-projet";
        const lienProjet = document.createElement("a");
        lienProjet.innerHTML = "Lien " + i;
        lienProjet.className = "lien-projet";

        const imgProjet = document.createElement("img");
        imgProjet.className = "img-projet";
        imgProjet.src = objProjets.projets[i].image;
        const innerDivProjet = document.createElement("div");
        innerDivProjet.className = "inner-div-projet";

        innerDivProjet.appendChild(nomProjet);
        nomProjet.innerHTML = objProjets.projets[i].nomAffiche;
        innerDivProjet.appendChild(imgProjet);
        innerDivProjet.appendChild(lienProjet);
        divProjet.appendChild(innerDivProjet);

        divCentre.appendChild(divProjet);
        result.push(divProjet);

    }

    return result;
}

let
    slides = afficheProjet(),
    length = slides.length,
    index = -1,
    lock = false,
    hover = false,
    next = 1;

function increment(value = 1) {

    index += value;

    let max = (length - 1) * 100;

    if (index === length) {
        index = 0;
    } else if (index < 0) {
        index = length - 1;
    };

    // boucle forEach : le 1er param 'slide' est la valeur ds le tableau et le 2ème param 'i' est l'index de cette valeur
    slides.forEach((slide, i) => {

        let pos = (i - index) * 100;
        lock = true; // stop le timer

        if (Math.abs(pos) > 100) {
            slide.style.display = 'none';
            if (Math.abs(pos) === max) {
                pos = Math.sign(pos) * -100;
                slide.style.transform = `translateX(${2 * pos}%)`;
                slide.style.display = null;
            }

        } else {
            slide.style.display = null;
        }

        if (pos === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
        slide.style.transform = `translateX(${pos}%)`;
    });

}

increment();


// setInterval(() => {
//     // Teste d'abord la valeur 'hover' , et si vrai , alors teste 'lock' ,si vrai return....
//     if (hover || lock) {
//         return lock = false;
//     }
//     increment(next);
//     lock = false;
// }, 2000);



document.querySelector('#btn-prev').addEventListener('click', e => {
    increment(next = -1);
});
document.querySelector('#btn-next').addEventListener('click', e => {
    increment(next = 1);
});

divSlider.addEventListener('mouseenter', e => {
    hover = true;
    /* ajouter un truc sur les boutons qd on stop le slide */
});
divSlider.addEventListener('mouseleave', e => {
    hover = false;
});

