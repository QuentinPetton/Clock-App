

//todo récupérer l'heure via API World Time ET l'IP du visiteur
//méthode fetch pour requeter l'APi
async function getApiWorldTime () {
    
    try {
        const time = await fetch("https://worldtimeapi.org/api/ip");
        //on traite la réponse, si réussie, on converti la réponse au format JSON:
        const data = await time.json();
        console.log(data);
        
            //On veux récupérer l'heure
            const dateTime = new Date(data.datetime);
            console.log(dateTime);
        
           
            let hours = dateTime.getUTCHours().toString().padStart(2, '0');
            let minutes = dateTime.getUTCMinutes().toString().padStart(2, '0');
            //padStart permet d'ajouter un zéro devant chiffre, par exemple si 14h9
           
        
            let globalTime = `${hours}:${minutes}`;
            //=> renvoi heure: minutes
            const timeElement = document.getElementById('current-time');
            timeElement.innerHTML = globalTime;
        

            const bodyElement = document.querySelector('body');
            const moonSunCommentElement = document.getElementById('moon-sun-comment');
            const moonSunElement = document.getElementById('moon-sun');

            if (hours >=5 && hours <12) {
                moonSunElement.src = './assets/desktop/icon-sun.svg';
                moonSunCommentElement.innerHTML = `Good morning, it's currently`;
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-daytime.jpg)";

            } else if (hours >=12 && hours <18) {

                moonSunElement.src = './assets/desktop/icon-sun.svg';
                moonSunCommentElement.innerHTML = `Good afternoon, it's currently`;
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-daytime.jpg)";

            } else {

                moonSunElement.src = './assets/desktop/icon-moon.svg';
                moonSunCommentElement.innerHTML = `Good evening, it's currently`
                bodyElement.style.backgroundImage = "url(./assets/desktop/bg-image-nighttime.jpg)";
                bodyElement.classList.toggle('night-mode'); //retire le film opacité
                
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


            //SECTION EXPAND BUTTON
            const expandTimeZoneElement = document.getElementById('expand-current-location');
            expandTimeZoneElement.innerHTML = `${timeZone}`;
            //On veux récupérer day of the week

            const expandDayOfWeekElement = document.getElementById('expand-current-day-week');
            expandDayOfWeekElement.innerHTML = `${data.day_of_week}`;

            console.log(data.day_of_week);

            //On veux récupérer days of the year
            const expandDayOfYearElement = document.getElementById('expand-current-day-year');
            expandDayOfYearElement.innerHTML =`${data.day_of_year}`;

            console.log(data.day_of_year);

            //On veux récupérer le week number

            const expandWeekOfYearElement = document.getElementById('expand-current-week-year');
            expandWeekOfYearElement.innerHTML = `${data.week_number}`;

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


//todo ajouter un event au clic sur boutton:
        //SI pas déplié, retirer more et passer en less + img - afficher contenu - retirer quote section

function expandContent () {
            const moreContentTimeElement = document.querySelector(".more-content-time-container");
            const expandButtonElement = document.querySelector(".up.down");
            const expandButtonTextElement = expandButtonElement.querySelector('span'); 
            const expandButtonIconElement = expandButtonElement.querySelector('img'); 

            const quoteContainerElement = document.querySelector(".quote-container");


            expandButtonElement.addEventListener('click', (event) => {
                event.preventDefault();
                moreContentTimeElement.classList.toggle("hidden");

                if(moreContentTimeElement.classList.contains("hidden")) {
                    expandButtonTextElement.textContent = "More";
                    expandButtonIconElement.src = "./assets/desktop/icon-arrow-down.svg";
                    quoteContainerElement.classList.toggle("hidden");
                } else {
                    expandButtonTextElement.textContent = "Less";
                    expandButtonIconElement.src = "./assets/desktop/icon-arrow-up.svg";
                    quoteContainerElement.classList.toggle("hidden");
                }
            });
        }

        expandContent();


