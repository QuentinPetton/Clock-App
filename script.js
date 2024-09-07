
//todo récupérer l'heure via API World Time ET l'IP du visiteur

function getApiWorldTime () {
    
//méthode fetch pour requeter l'APi
fetch("http://worldtimeapi.org/api/ip")
    //on traite la réponse, si réussie, on converti la réponse au format JSON:
    .then(response => response.json())
    //On affiche la réponse dans la variable data
    // .then(response => alert(JSON.stringify(response)))
    .then(data =>  {
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
})
//on gère l'erreur
.catch(error => alert("Erreur : " + error));
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
        quoteContentElement.innerHTML = quoteContent;


    } catch (error) {
        console.log(error);
    }
}
getQuote();





