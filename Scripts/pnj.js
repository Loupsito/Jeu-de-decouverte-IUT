var pnj1={"nom":"Robert","localisation": 0,"image":"images/pnj/robert.png", "numeroDialogueCourant": 0,"dialogue":
            [["Salut bienvenue dans notre jeu de découverte, nous sommes heureux de vous faire découvrir l'IUT de Vélizy Bitch.","(verifPossessionItem('stylo') === true)",""],
            ["Tu as trouvé le stylo","(verifPossessionItem('cleI21') === true)",""],
            ["Wahou la clé !","'"+"last"+"'",""]]};
    
var pnj2={"nom":"Asusa","localisation": 4,"image":"images/pnj/asusa.png","numeroDialogueCourant": 0,"dialogue":
            [["Si seulement la salle I21 était ouverte...", "(verifAccesSalle(7,4) === true)",""],
            ["Merci onii-chan, tu as ouvert la salle I21 !","'"+"last"+"'",""]]};
        
var pnj3={"nom":"Yui","localisation": 6,"image":"images/pnj/yui.png","numeroDialogueCourant": 0,"dialogue":
            [["Essaie de me faire un joli dessin sur le tableau !", "(listeCases[6][3]==='images/4-G23Tableau(ecrit).jpg')",""],
            ["Bien dessiné, chouette !","'"+"last"+"'",""]]};

var pnj4={"nom":"Auger","localisation": 0,"image":"images/pnj/auger.png","numeroDialogueCourant": 0,"dialogue":
            [["Bonjour, il fait trop chaud dans cet IUT, d'où mes lunettes de soleil.", "'"+"normal"+"'",""],
            ["Bienvenue dans le monde epoustouflant de Narnia ! Nous sommes ravis de vous accueillir.","'"+"normal"+"'",""],
            ["Hello, je suis enseignant-chercheur et j'enseigne l'algorithmique.", "'"+"normal"+"'",""],
            ["Au revoir, ce fut un plaisir de vous rencontrer dans de telles conditions.", "'"+"last"+"'",""]
        ]};
var pnj5={"nom":"Jean","localisation": 0,"image":"images/pnj/robert.png","numeroDialogueCourant": 0,"dialogue":
            [["Bonjour, bienvenue dans notre bel IUT de velizy, ravie de voir que vous soyez arrivé à destination.", "'"+"normal"+"'",""],
            ["Je me présente, je suis Jean et je suis etudiant de 2eme année en informatique.","'"+"normal"+"'",""],
            ["La porte qui se trouve derrière moi permet d'arriver dans le batiment des salles machines, je vous invite à y entrer.", "'"+"normal"+"'",""],
            ["Je vous souhaite donc bonne journée, ce fut un plaisir de vous rencontrer. Au fait, je vous ouvre la salle I21 à distance, sympa non ?", "'"+"last"+"'","if(listeLiens[4][2]===false){listeLiens[4][2]=true;genererNotification('La salle I21 est maintenant accessible');}"]
        ]};


var tabPNJ = new Array (pnj2,pnj3,pnj5);
var divTexte;
var divTexte2;

function verifDialPrerequis(tab)
{
	if ((eval(tab) && eval(tab) !== "last") && (eval(tab) !== "normal"))
            return 0;
        else if (eval(tab) === "normal")
            return 1;
        else if (eval(tab) === "last")
            return -1;
}
function verifEtatFinal(tab)
{
    if (tab.length > 2)
        eval(tab);
}
var typeDialogue;
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
            image = document.getElementById('pnj').appendChild(CreationImage);
            /*if ($("#antiClicEnchaine").length)
            {
                $("#antiClicEnchaine").click(function() {
                    testDialogue (positionCourante);
                    alert("not hood");
                    return;
                });  
            }*/
            image.addEventListener("click", function(){
                afficherBoiteDialogue(); 
                testDialogue (positionCourante);   
                return;
            });              
            image.style.marginRight=-100+"px";
            image.style.marginBottom=-411.4+"px";  
            image.style.position ='relative';
            image.style.zIndex = 1; 
          }
      }         
    }
}
function testDialogue (positionCourante)
{

    for(var j=0;j<tabPNJ.length;j++)
    {
         if(tabPNJ[j]["localisation"]===positionCourante)
        {
            //verifie si le prerequis est validé et si ce n'est pas son dernier dialogue => si oui, on passe au dialogue suivant
            var verifDial = verifDialPrerequis(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][1]);

            if (verifDial === 0)   
            {
                tabPNJ[j]["numeroDialogueCourant"]++;   
                typeDialogue = "dialoguePrerequis";
            }                                           
            if (verifDial === 1)
            {
                typeDialogue = "dialogueEnchaine";
                dialogue(tabPNJ[j]["nom"]+" : "+tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][2]);
                tabPNJ[j]["numeroDialogueCourant"]++; 
                return;
            }
            if (verifDial === -1)
            {                           
                typeDialogue = "dialogueDernier";
            }
            dialogue(tabPNJ[j]["nom"]+" : "+tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][2]);
            
            return;
            //alert(typeDialogue);
        }
    } 
}
/*function carte ()
{
    genereContenuID("div","","ecran","carte");
    
    carte = document.getElementById("carte");
    carte.src="images/";
    carte.style.width=80+"%";
    carte.style.height=80+"%";
    
}*/
