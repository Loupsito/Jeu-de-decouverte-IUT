
	
var pnj1={"nom":"Robert","localisation": 0,"image":"images/pnj/robert.png", "numeroDialogueCourant": 0,"dialogue":
            [["Salut bienvenue dans notre jeu de découverte","(verifPossessionItem('stylo') === true)"],
            ["Tu as trouvé le stylo","(verifPossessionItem('cleI21') === true)"],
            ["Wahou la clé !","'"+"last"+"'"]]};
    
var pnj2={"nom":"Asusa","localisation": 4,"image":"images/pnj/asusa.png","numeroDialogueCourant": 0,"dialogue":
            [["Si seulement la salle I21 était ouverte...", "(verifAccesSalle(7,4) === true)"],
            ["Merci onii-chan, tu as ouvert la salle I21 !","'"+"last"+"'"]]};
        
var pnj3={"nom":"Yui","localisation": 6,"image":"images/pnj/yui.png","numeroDialogueCourant": 0,"dialogue":
            [["Essaie de me faire un joli dessin sur le tableau !", "(listeCases[6][3]==='images/4-G23Tableau(ecrit).jpg')"],
            ["Bien dessiné, chouette !","'"+"last"+"'"]]};

var tabPNJ = new Array (pnj1,pnj2,pnj3);

function verifDialPrerequis(tab)
{
	if (eval(tab) && eval(tab) !== "last")
            return true;
		//alert("yeah");
        else if (eval(tab) === "last")
            return false;
}