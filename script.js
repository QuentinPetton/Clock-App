
//todo récupérer l'heure via API World Time ET l'IP du visiteur

//méthode fetch pour requeter l'APi
fetch("http://worldtimeapi.org/api/ip")
//on traite la réponse, si réussie, on converti la réponse au format JSON:
.then(response => response.json())
//On affiche la réponse dans la variable data
// .then(response => alert(JSON.stringify(response)))
.then(data => console.log(data))
//on gère l'erreur
.catch(error => alert("Erreur : " + error));