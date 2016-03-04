/*var pnj1={"nom":"Robert","localisation": 0,"image":"images/pnj/robert.png", "numeroDialogueCourant": 0,"dialogue":
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

var pnj6={"nom":"Robert","localisation": 0,"image":"images/pnj/robert.png","numeroDialogueCourant": 0,"dialogue":
            [["Bonjour, bienvenue à l'IUT de Vélizy, ravie de vous recevoir.", "'"+"normal"+"'"," "],
            ["Je me présente, je suis Jean.","'"+"normal"+"'"," "],
            ["Au revoir bande d'ingrats.","'"+"last"+"'"," "]
        ]};

var tabPNJJ = new Array (pnj6);
alert(tabPNJJ[0]["dialogue"]);*/

var divTexte;
var divTexte2;
function verifDialPrerequis(tab)
{
        if (tab !== "normal" && tab !== "last")
            return 0
        else if (tab === "normal")
            return 1;
        else if (tab === "last")
            return -1;
}
function changementEtat(tab)
{
    if (tab === "MAJ_1_1_INIT"){miseAJourDialogue(1,1);return;}
    else if (tab === "choixAlarme"){choixAlarme();return;}
    else if (tab === "SUPPRIME"){;return;}
}
var typeDialogue;
function placementPNJ(positionCourante)
{
    var idImages;
    var i=0;
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
                $(image).click(function () {
                    idImages = this.id;
                    afficherBoiteDialogue(); 
                    testDialogue (idImages);  
                    return;
                });
                $(image).mouseover(function(){
                    this.style.cursor = "pointer";
                });                  
                //image.style.marginRight=-100+"px";
                image.style.marginRight=10+"px";
                image.style.marginBottom=-411.4+"px";  
                image.style.position ='relative';
                image.style.zIndex = 1; 
            }
        }         
    }
}

function miseAJourDialogue(indicePNJ,nouveauDiagCourant)
{
    if (tabPNJ[indicePNJ]["numeroDialogueCourant"]!==nouveauDiagCourant){tabPNJ[indicePNJ]["numeroDialogueCourant"]=nouveauDiagCourant;}    
}
function testDialogue (idImages)
{
    if (!$("#nomPNJ").length)
    {        
        //créer la petite boîte contenant le nom du pnj
        genereContenuID("span","","ecran","nomPNJ");
        nomPNJ = document.getElementById("nomPNJ");
        nomPNJ.innerHTML = idImages;
    }
    
    for(var j=0;j<tabPNJ.length;j++)
    {
         if(tabPNJ[j]["nom"]===idImages)
        {
            //verifie si le prerequis est validé et si ce n'est pas son dernier dialogue => si oui, on passe au dialogue suivant
            var verifDial = verifDialPrerequis(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][1]);
            var tabEtat = tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][2];
            var nomFake = tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][3];
            imagePNJ = document.getElementById(nomFake);
            initEtatImg(nomFake);
            if (verifDial === 0)   
            {
                tabPNJ[j]["numeroDialogueCourant"]++;   
                typeDialogue = "dialoguePrerequis";
            }                                           
            else if (verifDial === 1)
            {                
                typeDialogue = "dialogueEnchaine";
                modifAffichageDialogue(nomFake);   
                //les 2 suivants pour empecher le clic automatique
                removeElementById("antiClic"); 
                removeElementById("antiClicProvisoire2");  
                changementEtat(tabEtat);
                dialogue(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,idImages,nomFake,tabEtat);                          
                tabPNJ[j]["numeroDialogueCourant"]++;     
                return;
            }
            else if (verifDial === -1)
            {                           
                typeDialogue = "dialogueDernier";
            }        
            modifAffichageDialogue(nomFake);
            //changementEtat(tabEtat);        
            dialogue(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,idImages,nomFake,tabEtat);
            return;
            //alert(typeDialogue);        
        }
    } 
}
//Sert à changer le nom, et la luminosité de l'image de pnj (pour les dialogues entre pnj)
function modifAffichageDialogue(nomFake)
{
    //change le nom dans la boîte (nomFake);
    nomPNJ.innerHTML = nomFake;
    //change la luminosité de l'image
    imagePNJ.style.zIndex="7";
    imagePNJ.style.pointerEvents = 'none';
}
function initEtatImg()
{
    imagePNJ.style.zIndex="1";
    imagePNJ.style.pointerEvents = 'auto';
}
function choixAlarme()
{
    zoneAntiClic(49,"antiClicChoix","0");
    if (!$("#choixAlarme").length)
    {
        genereContenuID("div","","ecran","choixAlarme");
        choixAl = document.getElementById("choixAlarme");    
        choixAl.style.display = "none";
        choixAl.style.position = "absolute";
        choixAl.style.zIndex = "50";
        choixAl.style.width = 50+"%";
        choixAl.style.height = "auto";
        choixAl.style.padding = 5+"px";
        choixAl.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        choixAl.style.left="0";
        choixAl.style.right="0";    
        choixAl.style.margin="0 auto";
        choixAl.style.padding=15+"px";
        choixAl.style.textAlign="center";
        choixAl.style.border = "1px solid #BDBDBD";
        choixAl.style.fontFamily = 'century gothic';
        choixAl.style.fontSize= 12+'px';
        
        genererChoix("INCENDIE","INCENDIE");
        genererChoix("DEFAILLANCE","DEFAILLANCE");
        genererChoix("CANULAR","CANULAR");
        genererChoix("ENTRAINEMENT","ENTRAINEMENT");
    }
    $("#choixAlarme").fadeIn(500);           
}
function genererChoix(idDiv,texte)
{
    genereContenuID("div","","choixAlarme",idDiv);
    var choix = document.getElementById(idDiv);
    choix.innerHTML = texte;
    choix.style.position = "relative";
    choix.style.width = 45+"%";
    choix.style.height = "auto";
    choix.style.left="0";
    choix.style.right="0";    
    choix.style.margin="0 auto";    
    choix.style.padding=8+"px";  
    choix.style.marginTop=1+"px";
    choix.style.background="white"; 
    choix.style.color ="#2E2E2E";
    if (idDiv === "INCENDIE")
        choix.onclick = cliquerChoix (idDiv,9);
    else if (idDiv === "DEFAILLANCE")
        choix.onclick = cliquerChoix (idDiv,11);
    else if (idDiv === "ENTRAINEMENT")   
        choix.onclick = cliquerChoix (idDiv,13);
    else if (idDiv === "CANULAR")   
        choix.onclick = cliquerChoix (idDiv,15);
    
    $(choix).mouseover(function(){
        this.style.cursor = "pointer";
        choix.style.background="#2E2E2E"; 
        choix.style.color ="white";
    });
    $(choix).mouseout(function(){
        choix.style.background="white"; 
        choix.style.color ="#2E2E2E";
    });

}
function cliquerChoix (idDiv,numeroDialogue)
{
    $('#'+idDiv).click(function(){
        removeElementById("antiClicChoix");
        removeElementById("antiClic"); 
        removeElementById("antiClicProvisoire"); 
        removeElementById("msgDialogue");
        afficherBoiteDialogue();
        miseAJourDialogue(0,numeroDialogue);
        testDialogue("FREDERIC");
        removeElementById(idDiv);
        $("#choixAlarme").fadeOut(500); 
        if (idDiv === "CANULAR")
        {
            removeElementById("choixAlarme");
        }
    });
}
function supprimerPersonnage()
{
    
}

/*function carte ()
{
    genereContenuID("div","","ecran","carte");
    
    carte = document.getElementById("carte");
    carte.src="images/";
    carte.style.width=80+"%";
    carte.style.height=80+"%";
    
}*/
