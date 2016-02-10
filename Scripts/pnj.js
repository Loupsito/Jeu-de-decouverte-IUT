var pnj1={"nom":"Robert","localisation": 0,"image":"images/pnj/robert.png", "numeroDialogueCourant": 0,"dialogue":
            [["Salut bienvenue dans notre jeu de découverte","(verifPossessionItem('stylo') === true)"],
            ["Tu as trouvé le stylo","(verifPossessionItem('cleI21') === true)"],
            ["Wahou la clé !","'"+"last"+"'"]]};
    
var pnj2={"nom":"Asusa","localisation": 4,"image":"images/pnj/asusa.png","numeroDialogueCourant": 0,"dialogue":
            [["Si seulement la salle I21 était ouverte...", "(verifScene(7,4) === true)"],
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

function placementPNJ(positionCourante)
{
    for(var i=0;i<tabPNJ.length;i++)
    {               
      if(tabPNJ[i]["localisation"]===positionCourante)
      {        
          if(!(document.getElementById(tabPNJ[i]["nom"])))
          {            
            CreationImage = document.createElement('img');
            CreationImage.id=tabPNJ[i]["nom"];
            CreationImage.src =tabPNJ[i]["image"];
            CreationImage.height=400;
            document.getElementById('pnj').appendChild(CreationImage);

            image = document.getElementById(tabPNJ[i]["nom"]);
            image.addEventListener("click", function(){
                afficherBoiteDialogue();                
                for(var j=0;j<tabPNJ.length;j++)
                {
                     if(tabPNJ[j]["localisation"]===positionCourante)
                         {
                         //verifie si le prerequis est validé et si ce n'est pas son dernier dialogue => si oui, on passe au dialogue suivant
                         if (verifDialPrerequis(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][1]) === true)
                             tabPNJ[j]["numeroDialogueCourant"]++;
                                                 
                         dialogue(tabPNJ[j]["nom"]+" : "+tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial");
                     }
                } 
            });            
            image.style.marginRight=-100+"px";
            image.style.marginBottom=-411.4+"px";  
            image.style.position ='relative';
            image.style.zIndex = 1; 
          }
      }         
    }
}