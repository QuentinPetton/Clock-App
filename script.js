

//todo récupérer l'heure via API World Time ET l'IP du visiteur
//méthode fetch pour requeter l'APi
async function getApiWorldTime () {
    
    try {
        const time = await fetch("https://worldtimeapi.org/api/ip");
        //on traite la réponse, si réussie, on converti la réponse au format JSON:
        const data = await time.json();
        console.log(data);
        
            //On veux récupérer l'heure
            const dateTime = data.datetime;
            console.log(dateTime);
        
            let now = new Date()
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            //padStart permet d'ajouter un zéro devant chiffre, par exemple si 14h9
           
        
            let globalTime = `${hours}:${minutes}`;
            //=> renvoi heure: minutes
            const timeElement = document.getElementById('current-time');
            timeElement.innerHTML = globalTime;
            //TODO Suivant l'heure, afficher good morning ou good evening + image Sun ou Moon
                //Soit je met une img en hidden et je switch les classes pour montrer élément souhaité
                //Soit je crée l'élément dans mon if

            const bodyElement = document.querySelector('body');
            const moonSunCommentElement = document.getElementById('moon-sun-comment');
            const moonSunElement = document.getElementById('moon-sun');

            if (hours >=5 && hours <12) {
                moonSunElement.src = './assets/desktop/icon-sun.svg';
                moonSunCommentElement.innerHTML = `Good morning`;
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-daytime.jpg)";

            } else if (hours >=12 && hours <18) {

                moonSunElement.src = './assets/desktop/icon-sun.svg';
                moonSunCommentElement.innerHTML = `Good afternoon`;
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-daytime.jpg)";

            } else {

                moonSunElement.src = './assets/desktop/icon-moon.svg';
                moonSunCommentElement.innerHTML = `Good evening`
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-nighttime.jpg)";
                bodyElement.classList.toggle('night'); //retire le film opacité
                
            }

            //On souhaite avoir le fuseau abrégé (ici CEST pour Paris)
            const CEST = data.abbreviation;
            console.log(CEST);
            const cestElement = document.getElementById('cest');
            cestElement.innerHTML = CEST;
        
        
            //On veux récupérer la zone
            const timeZone = data.timezone;
            console.log(timeZone);
            //=> renvoi Europe/Paris
            const timeZoneElement = document.getElementById('current-location');
            timeZoneElement.innerHTML = `in ${timeZone}`;
            

            //TODO séparer Europe de Paris

    } catch (error) {
        //on gère l'erreur
        console.log(error);
    }

}

//Appeller la fonction
getApiWorldTime();

async function getQuote () {

    try {
        const quote = await  fetch("https://api.quotable.io/random");
        const data = await quote.json();
        console.log(data);
        console.log(data.content);
        console.log(data.author);

        const quoteContent = data.content;
        const quoteContentElement = document.getElementById('quote-content');
        quoteContentElement.innerHTML = `"${quoteContent}"`;

        const quoteAuthor = data.author;
        const quoteAuthorElement = document.getElementById('author');
        quoteAuthorElement.innerHTML = quoteAuthor;

    } catch (error) {
        console.log(error);
    }
}
getQuote();

//TODO ajouter fonctionnalité poure refresh une quoteContent + quoteAuthor au clic sur lien a
const refreshQuoteElement = document.getElementById("refresh-quote");
refreshQuoteElement.addEventListener('click', (event) => {
    event.preventDefault();
    //on rappelle la fonction
    getQuote();
});



