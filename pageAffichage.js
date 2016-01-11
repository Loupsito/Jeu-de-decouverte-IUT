//indique si le joueur se trouve face à une porte libre d'accès ou non (booléen) => servira uniquement en tant que prerequis de l'action "ouvrir toutes les portes"
var porteVerrouille;

// tableau qui contiendra toutes les portes verrouillées que le joueur voit => servira pour les etats finaux des différents "ouvrir porte"
var nomPorte = [];

//Contient la position du joueur : son indice
var positionJoueur;

//indice du lien (parcours du tableau au prélable)(servira pour ouvrir des portes)
var indiceScene;

//permettant de couper le son 
var son = false;

//permettant de couper la musique 
var musique = false;

//---------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------RECUPERATION-XML---------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

//Chargement de la page
window.onload=initpage;

//Tableau qui repertorie tous les items
var tabDeTousLesItems=[null,null];

//Tableau qui repertorie toutes les scenes
var listeCases=[];

//Tableau qui repertorie tous les liens entre les salles
var listeLiens=[];

//Tableau qui repertorie toutes les actions
var listesActions=[];

//Fonction qui initialise le jeu une premiere fois
function initpage()
{
    //-----------------------------RECUPERATION ITEM-----------------------------
    xhrItem=createRequest();
    if(xhrItem===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrItem.onreadystatechange=recupFromXMLDataBaseItem;
    xhrItem.open('GET','LesItems.xml',false);
    xhrItem.send(null);

    //-----------------------------RECUPERATION SCENE-----------------------------
    xhrScenes=createRequest();
    if(xhrScenes===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrScenes.onreadystatechange=recupFromXMLDataBaseScenes;
    xhrScenes.open('GET','LesScenes.xml',false);
    xhrScenes.send(null);

    //-----------------------------RECUPERATION LIEN-----------------------------
    xhrLiens=createRequest();
    if(xhrLiens===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrLiens.onreadystatechange=recupFromXMLDataBaseLiens;
    xhrLiens.open('GET','LesLiens.xml',false);
    xhrLiens.send(null);

    //-----------------------------RECUPERATION ACTIONS-----------------------------
    xhrActions=createRequest();
    if(xhrActions===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrActions.onreadystatechange=recupFromXMLDataBaseActions;
    xhrActions.open('GET','actions.xml',false);
    xhrActions.send(null);
    //------------------------------------------------------------------------------     
    
    //Analyse les items a true et les places dans l'inventaire si c'est le cas
        premiereAnalyseInventaire();	
    //gerere le contenu du jeu        
        fonctionGeneratricePrincipale();	    
}

//Fonction qui recupere les donnees des items dans le fichier LesItems.xml
function recupFromXMLDataBaseItem()
{
        if (xhrItem.readyState===4 && xhrItem.status===200)
        {
            var tabDesc= xhrItem.responseXML.getElementsByTagName("description");// recupération des descriptions
            var tabPoss= xhrItem.responseXML.getElementsByTagName("possession");// recupération des etats de possession
            var image= xhrItem.responseXML.getElementsByTagName("image");// récupération             
            var tabItem = xhrItem.responseXML.getElementsByTagName("tab_item"); 
            var tabActions = xhrItem.responseXML.getElementsByTagName("action");
            var tabX = xhrItem.responseXML.getElementsByTagName("x");
            var tabY = xhrItem.responseXML.getElementsByTagName("y");                    
            for(i=0;i<tabItem.length;i++)
            {
                var tabCoordonnees=[tabX[i].textContent,tabY[i].textContent];
                var tabTabActions=[null];
                a=tabTabActions.shift();
                nom=tabItem[i].getAttribute("nom");
                for(z=0;z<tabActions.length;z++)
                {
                    if((tabActions[z].getAttribute("id"))===nom)
                    {
                        tabTabActions.push((tabActions[z].textContent));
                    }
                }              
                tabTabInfos=[tabTabActions,tabDesc[i].firstChild.nodeValue,image[i].getAttribute("lienimage"),eval(tabPoss[i].firstChild.nodeValue),tabCoordonnees];                
                tabDeTousLesItems[i]=[tabItem[i].getAttribute("nom"),tabTabInfos];            
                
            } 
            for(b=0;b<tabDeTousLesItems.length;b++)
            {                
                //document.write(tabDeTousLesItems[b]+"<br/><br/>");
            }
        }
}

//Fonction qui recupere les donnees des scences dans le fichier LesScenes.xml
function recupFromXMLDataBaseScenes()
{	
    if (xhrScenes.readyState===4 && xhrScenes.status===200)
    {		
        var tabID= xhrScenes.responseXML.getElementsByTagName("scene");
        var tabObjet= xhrScenes.responseXML.getElementsByTagName("objet");
        for(i=0;i<tabID.length;i++)
        {                    
            var tabObjetbis=[null];
            a=tabObjetbis.shift();
            id = tabID[i].getAttribute("id");
            for(z=0;z<tabObjet.length;z++)
            {
                if((tabObjet[z].getAttribute("id"))===id)
                {                                                      
                    tabObjetbis.push(tabObjet[z].textContent);                                                        
                }
            }

            if (tabObjetbis.length===0)                       
                tabScene=[parseInt(tabID[i].getAttribute("id")),tabID[i].getAttribute("nom"),,tabID[i].getAttribute("lienImage")];
            else
                tabScene=[parseInt(tabID[i].getAttribute("id")),tabID[i].getAttribute("nom"),tabObjetbis,tabID[i].getAttribute("lienImage")];

            listeCases.push(tabScene);
        }
        for(b=0;b<listeCases.length;b++)
        {                
           //document.write(listeCases[b]+"<br/><br/>");
        }
    }
}

//Fonction qui recupere les donnees des liens entre les salles dans le fichier LesLiens.xml
function recupFromXMLDataBaseLiens()
{
    if (xhrLiens.readyState===4 && xhrLiens.status===200)
    {
        var tabID= xhrLiens.responseXML.getElementsByTagName("idScenes");
        var tabacces= xhrLiens.responseXML.getElementsByTagName("acces");
        var tabX= xhrLiens.responseXML.getElementsByTagName("x");
        var tabY= xhrLiens.responseXML.getElementsByTagName("y");

        for(p=0;p<tabID.length;p++)
        {
            var tabCoordonnees=[null];
            a=tabCoordonnees.shift();
            var tabX1=[tabX[p*2].textContent];
            var tabY1=[tabY[p*2].textContent];
            var tabX2=[tabX[p*2+1].textContent];
            var tabY2=[tabY[p*2+1].textContent];
            
            tabCoordonnees.push([parseInt(tabX1),parseInt(tabY1)]);
            tabCoordonnees.push([parseInt(tabX2),parseInt(tabY2)]);            
            tabLien=[parseInt(tabID[p].getAttribute("id1")),parseInt(tabID[p].getAttribute("id2")),eval(tabacces[p].textContent),tabCoordonnees];
            listeLiens[p]=tabLien;
        }
        for(b=0;b<listeLiens.length;b++)
        {                
            //document.write(listeLiens[b]+"<br/><br/>");
        }                        
    }
}

//Fonction qui recupere les donnees des actions dans le fichier actions.xml
function recupFromXMLDataBaseActions()
{
    if (xhrActions.readyState===4 && xhrActions.status===200)
    {
        var tabNom= xhrActions.responseXML.getElementsByTagName("action");
        var tabPrerequis= xhrActions.responseXML.getElementsByTagName("prerequis");
        var tabEtatFinal= xhrActions.responseXML.getElementsByTagName("etatFinal");
        
        for(A=0;A<tabNom.length;A++)
        {
            //var tabActions=["action","prerequis","etatFinal"];
            var tabActions = new Array();
		tabActions.push("nomAction");
		tabActions.push("prerequis");
                tabActions.push("etatFinal");
            
            
            tabActions.shift();
            var tabPrefinal=[null];
            tabPrefinal.shift();
            id=tabNom[A].getAttribute("nom");

            for(z=0;z<tabPrerequis.length;z++)
            {           
                if((tabPrerequis[z].getAttribute("nom"))===id)
                {
                    tabPrefinal.push((tabPrerequis[z].textContent).toString());                   
                }
            }          
            tabActions["nomAction"]= new Array();
            tabActions["prerequis"]= new Array();
            tabActions["etatFinal"]= new Array();
                                  
            tabActions["nomAction"].push(id);            
            tabActions["prerequis"].push(tabPrefinal);
            tabActions["etatFinal"].push(tabEtatFinal[A].textContent);                        
            
            listesActions[A]=tabActions;
        }      
        for(b=0;b<listesActions.length;b++)
        {                
           //document.write(listesActions[b]+"<br/><br/>");
        }  
    }
}
 
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * @param {string} element - la balise que l'on veut creer
 * @param {string} contenu - ce que va contenir la balise
 * @param {string} divMere - la division qui va contenir la nouvelle balise
 */
//Fonction qui permet de creer la balise que l'on veut (<p>,<span>,etc.)
function genereContenu(element,contenu,divMere)
{
    nouveauDiv = document.createElement(element);                //creation de l'element
    nouveauDiv.innerHTML = contenu;                            //Attribution d'un contenu
    document.getElementById(divMere).appendChild(nouveauDiv);    //pour insérer dans une div qu'on aura donnee au prealable
}

/* 
 * @param {string} element - la balise que l'on veut creer
 * @param {string} contenu - ce que va contenir la balise
 * @param {string} divMere - la division qui va contenir la nouvelle balise
 * @param {number} idd - nom de l'id a donnee
 */
//Fonction qui permet de creer la balise que l'on veut (<p>,<span>,etc, avec attribution d'un id)
function genereContenuID(element,contenu,divMere,idd)
{
    nouveauDiv = document.createElement(element);                //creation de l'element
    nouveauDiv.innerHTML = contenu;				 //Attribution d'un contenu
    nouveauDiv.id=idd;                                           //Attribution d'un id
    document.getElementById(divMere).appendChild(nouveauDiv);    //pour insérer dans une div qu'on aura donnee au prealable
}

/*
 * @param {string} id - id de la div que l'on veut supprimer
 */
//fonction servant à supprimer la division que l'on veut supprimer
function removeElementById(id)
{
    var el = document.getElementById(id);
    el.parentNode.removeChild(el);
}
					
//---------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------DEPLACEMENT--------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

/*
 * @param {number} idSalle - id de la scène (position actuelle)
 * @returns {Joueur}
 */
//classe joueur pour connaître la position de l'utilisateur
function Joueur (idSalle)
{
    //salle
    this.idSalle = idSalle || 0;
}

//fonction générant les scènes,les hitbox et les items
function fonctionGeneratricePrincipale()
{
    //------------------------------------POSITION DU JOUEUR-----------------------------------
    //parcours du tableau des scènes
    for (var i = 0; i < listeCases.length ; i++)
    {
        //si position de joueur = id de scènes d'indice i        
        if (joueur.idSalle === listeCases[i][0])
        {
            //affichage de la position du joueur
            document.getElementById("ecran").style.background = "url('"+listeCases[i][3]+"') repeat-x center";
            document.getElementById("ecran").style.backgroundSize = "contain";
            document.getElementById("ecran").style.backgroundRepeat = "no-repeat";
        }
    }
    //------------------------------------BOUTONS DE SCENES-------------------------------------    
    //initialisation de la variable globale à true
    porteVerrouille = true;   
    //reinitialise le taleau (vide le tableau)
    nomPorte = [];
    
     //parcours le tableau des liens
    for (var i = 0; i < listeLiens.length; i++)
    {                 
        //parcours le tableau des scènes
        for (var j = 0; j < listeCases.length; j++)
        {
            //compare la salle (liens) à la position du joueur ET la salle (scènes) à l'id 2 (liens)
            if ((listeLiens[i][0] === joueur.idSalle && listeCases[j][0] === listeLiens[i][1]) || (listeLiens[i][1] === joueur.idSalle && listeCases[j][0] === listeLiens[i][0]))
            {                           
                genereHitboxDeplacement(100,100,j,i);                             
                if (verifAccesSalle(listeLiens[i][0],listeLiens[i][1]) === false)
                {
                    porteVerrouille = false;
                    //rempli le tableau avec le nom des portes verrouillées que le joueur voit => servira pour les actions ouvrirPorte
                    nomPorte.push(listeCases[j][1]);
                }        
            }
        }
    }
    //------------------------------------BOUTONS D'ITEMS-------------------------------------
    for (var i = 0; i < listeCases.length; i++)
    {
        if (joueur.idSalle === listeCases[i][0])
        {						
            for (var j = 0; j < listeCases[i][2].length ; j++)
            {                          
                verificatonPlacementItem(listeCases[i][2][j]);
            }
        }
    }
}

/*
 * @param {object} tabNom - array contenant le nom des portes que l'action PEUT déverrouiller
 * @param {object} tabPorteVerrouilleEnFace - array contenant le nom de TOUTES les portes verrouillée en face du joueur
 */
//Fonction générant les portes afficher (si elles sont verrouillées) => uniquement utilisée dans les "etats finaux" des actions "ouvrir_porte[...]"  
//prend en paramètres : le tableau des portes que l'action peut ouvrir, le tableau de toutes les portes verrouillées en face
function genererChoixPorte(tabNom,tabPorteVerrouilleEnFace)
{
    var textePorte = '<b>Choisissez la porte à deverrouiller</b>';
    genereContenu('p',textePorte,'choixPorte');    
    //parcours le tableau des noms de portes que la clé peut déverrouiller 
    for (var i = 0; i< tabNom.length;i++)
    {
        //parcours le tableau des portes verrouillees en face
        for (var j = 0; j< tabPorteVerrouilleEnFace.length;j++)
        {
            if (tabNom[i] === tabPorteVerrouilleEnFace[j])
                genereContenu('span','<button type="button" onclick="ouvrirPorte('+"'"+tabNom[i]+"'"+')">'+tabNom[i]+'</button>','choixPorte');
        }    
    }
}

/*
 * @param {string} nom - nom de la porte à déverrouiller
 */
//Déverrouille la porte de la scène dont le nom est en paramètre
function ouvrirPorte(nom)
{
    //On y rentrera les id des portes verrouillées que l'action peut deverrouiller
    var idPorte = [];
    for (var i = 0;i < listeCases.length;i++)//parcourt la liste des scènes
    {
        if (nom === listeCases[i][1])
        {
            idPorte.push(listeCases[i][0]);
            for (var j = 0; j < listeLiens.length;j++)//parcourt la liste les liens
            {  
                for(var a = 0; a<idPorte.length; a++)//parcourt la liste des portes verrouillées que l'action PEUT deverrouiller
                {
                    //si le joueur se trouve en face de la porte verrouillée et s'il possède la clé qui permet d'ouvrir cette porte
                    if (((listeLiens[j][0] === idPorte[a]) && (listeLiens[j][1] === joueur.idSalle)) || ((listeLiens[j][1] === idPorte[a]) && (listeLiens[j][0] === joueur.idSalle)))
                    {
                    //deverrouille la porte
                        listeLiens[j][2] = true;
                        
                    //joue le bruit de deverrouillement de porte    
                        jouerSon('sons/ouvrirPorte.mp3',son);
                        
                    //affichage de la réussite de l'action dans la boite de dialogue  
                        genererMessageBoite("Vous avez ouvert la salle "+listeCases[i][1]+" !",2000);

                    //retire la div "choix de portes" après avoir deverrouillé la porte
                        document.getElementById('choixPorte').innerHTML = "";
                    //supprime du tableau des portes verrouillées, le nom des portes deverrouillées
                        for (var b=nomPorte.length-1; b>=0; b--) 
                        {
                            if (nomPorte[b] === nom) 
                                nomPorte.splice(b, 1);
                        }
                    //si le tableau des portes verrouillées est vide, changer la variable de prerequis (de la clé ultime) à true => l'action ne s'affichera pas
                        if (nomPorte.length === 0)
                            porteVerrouille = true;
                    }                       
                }
            }             
        }
    }                                       
}

/*
 * @param {number} newScene - id de la scène destination => prochaine valeur de "joueur.idSalle"
 * @param {number} id1 - id de la scène 1 du lien dont on vérifie l'accès
 * @param {number} id2 - id de la scène 2 du lien dont on vérifie l'accès
 */
//fonction permettant d'avancer
function avancer(newScene,id1,id2)
{ 
    //test si l'accès à la nouvelle scène est libre ou non
    if (verifAccesSalle(id1,id2) === true)
    {
        //changement de scène
        joueur.idSalle = newScene;     
        //effacer le contenu des autres division => initilisation de la page
        document.getElementById('msgLambda').innerHTML = "";
        document.getElementById('choixPorte').innerHTML = "";
        
        //-----Suppression des hitbox-----
        var capture = document.querySelectorAll('#ecran span');
        for (i=0;i<capture.length;i++)
         {

             for (k=0;k<listeCases.length;k++)
             {
                 if (capture[i].id === listeCases[k][1])
                 {
                     var monDeplacement = document.getElementById(listeCases[k][1]);
                     monDeplacement.parentNode.removeChild(monDeplacement);
                 }
             }


             for (m=0;m<tabDeTousLesItems.length;m++)
             {
                 if (capture[i].id === tabDeTousLesItems[m][0] &&verifPossessionItem(capture[i].id) ===false)
                 {
                     var monItem = document.getElementById(tabDeTousLesItems[m][0]);
                     monItem.parentNode.removeChild(monItem);
                 }
             }
         }
         //-----Fin suppression hitbox------
    }
    //sinon affiche un message d'erreur dans la boîte de dialogue
    else
    {
        genererMessageBoite("La porte est verrouillée...",2000);
        //efface le contenu de la division des actions (pour éviter la duplication du bouton)
        document.getElementById('actions').innerHTML = "";
    }
    //efface le contenu des divisions de déplacement et d'objet
    document.getElementById('deplacement').innerHTML = "";
    document.getElementById('objet').innerHTML = "";
    


    
     var captureActions = document.querySelectorAll('#actions span');
   // alert("Actions capture = "+captureActions.length);
    if(captureActions.length !==0)
    {
        //alert("cest pas vide !");
        for(k=0;k<listesActions.length;k++)
        {
            verifiePrerequis(captureActions[k].textContent,"avancement");
        }
    }
    fonctionGeneratricePrincipale();   
}

/*
 * @param {number} id1 - id de la scène 1 du lien dont on vérifie l'accès
 * @param {number} id2 - id de la scène 2 du lien dont on vérifie l'accès
 */
//fonction si la porte est verrouillée ou non, prenant en paramètre les id des salles liées par la porte 
function verifAccesSalle(id1, id2)
{
    for (var i = 0; i < listeLiens.length;i++)
    {
        if ((listeLiens[i][0] === id1 && listeLiens[i][1] === id2) || (listeLiens[i][0] === id2 && listeLiens[i][1] === id1))  
        {
            //(joueur.idSalle === id1 || joueur.idSalle === id2) => pour les prerequis, plus pratique mais pas obligatoire
            if ((listeLiens[i][2] === false) && (joueur.idSalle === id1 || joueur.idSalle === id2))
                return false;
            else
                return true;
        }
        /*else alert("mauvais paramètres");*/
    }    
}
					
//---------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------INTERACTION------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

/*
 * @param {string} - le nom de l'item
 */
//Fonction qui change le contenu de l'ecran : affiche les actions
function changementAff(val)
{ 
    for(var i = 0; i<tabDeTousLesItems.length;i++)
    {
        if (tabDeTousLesItems[i][0] === val)
        {
            //On suvegarde la valeur de l'objet pour pouvoir l'utiliser plus tard
            tampon = val;
            //on supprime tous le contenu de la division 'objet'
            document.getElementById('actions').innerHTML = "";
            //puis on ajoute nos nouveaux elements
            genereAction(tabDeTousLesItems[i][1][0]); 
            break;
        }
    }
    var captureBouton = document.querySelectorAll('#actions span');
    document.getElementById('actions').innerHTML = "";
    for(var i = 0; i<captureBouton.length;i++)
    {
        //parcours le tableau d'actions
        for(var j = 0; j <listesActions.length;j++)
        {
            //compare les chaines de caractères contenues dans le tableau d'objet et celui des actions          
            if (captureBouton[i].textContent === (listesActions[j]["nomAction"]).toString())
            {
                    verifiePrerequis(listesActions[j]["nomAction"],"interaction");
                    document.getElementById('choixPorte').innerHTML = "";
            }
        }
    }
}

/*
 * @param {Object[]} tabActions - un tableau qui contient des actions
 */
//Fontion qui genere des actions en fonction d'un item
function genereAction(tabActions)
{
    document.getElementById('actions').innerHTML = "";
    for(var i=0;i < tabActions.length;i++)
    {
        genereContenu('span','<button type="button" onclick="changementAff('+"'"+tabActions[i]+"'"+')">'+tabActions[i]+'</button>','actions');
    }
}

/*
 * @param {string} val - l'action choisi precedemment
 */
function afficheResultat(val)
{
    //appel de la fonction modifieValeur 
    modifieValeur(val);

    var myAction = document.getElementById(val);
    myAction.parentNode.removeChild(myAction);
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Verifie si l'item est dans l'inventaire ou pas
function verifPossessionItem(leItem)
{
        for(var i = 0; i<tabDeTousLesItems.length;i++)
        {
                if (tabDeTousLesItems[i][0] === leItem)
                {
                        return tabDeTousLesItems[i][1][3];
                }
        }
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Place l'item en fonction de son booleen
function verificatonPlacementItem(leItem)
{
        if (verifPossessionItem(leItem) === false)//Si c'est dans la salle
        { 
            genereHitboxItem(40,25,leItem);
            //genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
        }
        //else         Si c'est dans l'inventaire
            //ne rien faire
}

/*
 * 
 * @param {string} leItem - represente l'item en question a placer dans l'inventaire
 * @param {number} indice - represente l'indice de la localisation de l'item dans le tableau qui repertorie tous les items
 */
//Place l'item dans l'inventaire si celui-ci est a false
function placementItemDansInventaire(leItem,indice)
{
        if (verifPossessionItem(leItem) === true)            //Si c'est dans l'inventaire
        {
            //genereContenuID('span','<button type="button" onclick="changementAff('+"'"+leItem+"'"+')">'+leItem+'</button>','inventaire',leItem);
            genereContenuID('span','<button type="button" onmouseout=bulleInfosItem(1,1,'+"'"+leItem+"'"+','+"'"+'suppression'+"'"+') onmouseover =bulleInfosItem(1,1,'+"'"+leItem+"'"+','+"'"+'creation'+"'"+')  onclick="changementAff('+"'"+leItem+"'"+')"><img src="'+tabDeTousLesItems[indice][1][2]+'" width="20" height="20" /></button>','inventaire',leItem);
            genererMessageBoite("Vous avez trouvé l'item : "+leItem,3000);
            jouerSon('sons/item.mp3',son);
        }
        else                                                 //Si c'est dans la salle
        {
            genereHitboxItem(40,25,leItem);
            //genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
        }	
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Fonction utilise lors de la selection d'un item
function selectionObjet(leItem)
{       var indice;
        for(var i = 0; i<tabDeTousLesItems.length;i++)
        {
              if (tabDeTousLesItems[i][0] === leItem)
              {
                      tabDeTousLesItems[i][1][3] = true;//true ou false
                      indice = i;
                      
                      //suppression de la bulle info apres avoir selectionner l'item
                      var bulle = document.getElementById(i);
                      bulle.parentNode.removeChild(bulle);
              }
              else
              {
                        //ne rien faire
              }
             
        }	
        //suppresion de l'item
        var monItem = document.getElementById(leItem);
        monItem.parentNode.removeChild(monItem);
        
        placementItemDansInventaire(leItem,indice);
        
        //Petit animation : apparition et disparition de l'inventaire pour voir que l'objet a ete place dans l'inventaire
        document.getElementById("inventaire").style.display = 'block';
        setTimeout("document.getElementById('inventaire').style.display = 'none';",1000);        
}

//Analyse les items a true et les places dans l'inventaire si c'est le cas
function premiereAnalyseInventaire()
{
    for(var i = 0; i<tabDeTousLesItems.length;i++)
    {                    
        if (tabDeTousLesItems[i][1][3] === true)
        {
            //genereContenuID('span','<button type="button" onclick="changementAff('+"'"+tabDeTousLesItems[i][0]+"'"+')">'+tabDeTousLesItems[i][0]+'</button>','inventaire',tabDeTousLesItems[i][0]);
            genereContenuID('span','<button type="button" onmouseout=bulleInfosItem(1,1,'+"'"+tabDeTousLesItems[i][0]+"'"+','+"'"+'suppression'+"'"+') onmouseover =bulleInfosItem(1,1,'+"'"+tabDeTousLesItems[i][0]+"'"+','+"'"+'creation'+"'"+')  onclick="changementAff('+"'"+tabDeTousLesItems[i][0]+"'"+')"><img src="'+tabDeTousLesItems[i][1][2]+'" width="20" height="20" /></button>','inventaire',tabDeTousLesItems[i][0]);
        }
    }	
}

/*
 * 
 * @param {string} action - le nom de l'action
 * @param {string} choix - determine sur quelle partie se fait la verif : interaction ou avancement
 */
//Fonction verifiant les prerequis des actions
function verifiePrerequis(action,choix) //ajouter un choix de modification
{
    var erreurs = 0 ;   
    for(i=0;i<listesActions.length;i++)
    {               
        if (listesActions[i]['nomAction']==action)//identification du nom de l'action (laisser imperativement le ==)
        {
            for(j=0;j<listesActions[i]['prerequis'].length;j++)//verification validation prerequis
            {   
                //Si le prerequis est respecte
                if (!(eval(listesActions[i]['prerequis'][j].toString())))
                {
                    erreurs +=1;
                }
            }            
            //Les actions ne sont affiche QUE si le nombre d'erreur n'est pas respecte
            if (erreurs !== 0 && choix ==="interaction")
            {
                genererMessageBoite(erreurs+" prerequis pas respecté(s) pour " +listesActions[i]['nomAction'],4000);
            }
            else if (erreurs !== 0 && choix ==="avancement")
            {
                genererMessageBoite("Vous ne pouvez plus executer l'action : "+listesActions[i]['nomAction'],4000);               
                document.getElementById('actions').innerHTML = "";
                fonctionGeneratricePrincipale();
            }                
            //-----------------------------Affichage des actions-----------------------------
            else
            {
               //Ferme l'inventaire si s'il y a au moins une action a afficher
               var div = document.getElementById("inventaire"); 
               div.style.display = "none";
               //-----------------------------Si le bouton est present : ne rien afficher-----------------------------
               var captureBouton = document.querySelectorAll('#actions span');            
               if(captureBouton.length !==0)
               {
                for(var y = 0; y<captureBouton.length;y++)
                  {
                      for(var j = 0; j <listesActions.length;j++)
                      {       
                           var captureBoutonAction = document.querySelectorAll('#actions span');
                           if (captureBoutonAction[j].textContent === listesActions[i]["nomAction"])
                               break;
                           else//-----------------------------Si le bouton n'est pas présent : generer le bouton action-----------------------------
                           { 
                               genereContenuID('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]["nomAction"]+"'"+')">'+listesActions[i]["nomAction"]+'</button>','actions',listesActions[i]["nomAction"]);                                       
                           }
                      }
                       return;
                  }
               }
               else//-----------------------------Si le bouton n'est pas présent : generer le bouton action-----------------------------
               {
                   genereContenuID('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+')">'+listesActions[i]['nomAction']+'</button>','actions',listesActions[i]["nomAction"]);
               }
            }	
        }
    }
}

/*
 * @param {string} action - nom de l'action dont on veut modifier la valeur
 */
//modifie la valeur de quelque chose suite à l'execution d'une action
function modifieValeur(action)
{
    for (var i = 0; i<listesActions.length; i++)
    {
        if (listesActions[i]['nomAction'].toString() === action)
        {
            for (var j = 0;j<listesActions[i]['etatFinal'].length;j++)
            {
                eval(listesActions[i]["etatFinal"][j]);    
            }
        }
    }
     MAJaffichagePosition();
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------MULTIMEDIA-------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

//Met a jour l'image background de la position du joueur
function MAJaffichagePosition()
{
     for (var i = 0; i < listeCases.length ; i++)
    {
        //si position de joueur = id de scènes d'indice i
        if (joueur.idSalle === listeCases[i][0])
        {
            document.getElementById("ecran").style.background = "url('"+listeCases[i][3]+"') repeat-x center";
            document.getElementById("ecran").style.backgroundSize = "contain";
            document.getElementById("ecran").style.backgroundRepeat = "no-repeat";
        }
    }
}
/*
 * 
 * @param {number} largeur - represente la largeur de la hitbox
 * @param {number} hauteur - represente la hauteur de la hitbox
 * @param {number} j - salle courante
 * @param {number} i - lien courant
 */
function genereHitboxDeplacement(largeur,hauteur,j,i)
{    
    //Creation de l'element
    genereContenuID('span','','ecran',listeCases[j][1]);
    var myDiv = document.getElementById(listeCases[j][1]);
    myDiv.style.width=largeur+'px';
    myDiv.style.height=hauteur+'px';        
    myDiv.style.position ='absolute';    
    myDiv.style.opacity='0.2';
    myDiv.style.zIndex = "0"; 

    var x; var y;
    
    //Choix de quel face prendre
    if (joueur.idSalle === listeLiens[i][0])
    {
        x = listeLiens[i][3][0][0];
        y = listeLiens[i][3][0][1];
    }
    else if (joueur.idSalle === listeLiens[i][1])
    {
        x = listeLiens[i][3][1][0];
        y = listeLiens[i][3][1][1];
    }
    myDiv.style.top =y+'px';
    myDiv.style.left =x+'px';
    myDiv.style.backgroundColor='blue';
    myDiv.addEventListener("click", function(){ avancer(listeCases[j][0],listeLiens[i][0],listeLiens[i][1]);});
    myDiv.addEventListener("mouseover", function(){ myDiv.style.backgroundColor='#178977';});
    myDiv.addEventListener("mouseout", function(){ myDiv.style.backgroundColor='blue';});
}

/*
 * 
 * @param {number} largeur - represente la largeur de la hitbox
 * @param {number} hauteur - represente la hauteur de la hitbox
 * @param {string} leItem - represente l'item a qui on va donner une hitbox
 */
function genereHitboxItem(largeur,hauteur,leItem)
{    
    //Creation de l'element
    genereContenuID('span','','ecran',leItem);
    var myDiv = document.getElementById(leItem);
    myDiv.style.width=largeur+'px';
    myDiv.style.height=hauteur+'px';        
    myDiv.style.position ='absolute';
    myDiv.style.zIndex = "0"; 

    var x;
    var y;
    for (var i = 0; i<tabDeTousLesItems.length;i++)
    {
        if (tabDeTousLesItems[i][0] === leItem)
        {
            x= tabDeTousLesItems[i][1][4][0];
            y= tabDeTousLesItems[i][1][4][1];
                
            myDiv.style.backgroundImage = "url('"+tabDeTousLesItems[i][1][2]+"')";
            myDiv.addEventListener("mouseover", function(){ bulleInfosItem(x,y,leItem,"creation");});
            myDiv.addEventListener("mouseout", function(){ bulleInfosItem(x,y,leItem,"suppression");});
            //myDiv.addEventListener("mouseout", function(){ myDiv.style.backgroundImage = "url('"+tabDeTousLesItems[i][1][2]+"')";;});
        }    
    }
    myDiv.style.top =y+'px';
    myDiv.style.left =x+'px';
    myDiv.style.backgroundSize="contain";
    myDiv.style.backgroundRepeat = "no-repeat";
    myDiv.addEventListener("click", function(){ selectionObjet(leItem);});
}

/*
 * 
 * @param {number} x - coordonnee en abscisse de l'item
 * @param {number} y - coordonnee en ordonnee de l'item
 * @param {string} leItem - represente la hitbox de l'item
 * @param {string} choix - represente quel action va etre fait sur la bulle info ou quelle type de bulle on veut
 */
function bulleInfosItem(x,y,leItem,choix)
{
   for (var i = 0; i<tabDeTousLesItems.length;i++)
    {
        if (tabDeTousLesItems[i][0] === leItem)
        {
            //Informations apparaissant dans la boite de dialogue si l'item est dans l'inventaire
            if (verifPossessionItem(leItem)===true && choix ==="creation")
            {
                document.getElementById('msgLambda').innerHTML = tabDeTousLesItems[i][1][1];
            }
            else if(verifPossessionItem(leItem)===true && choix ==="suppression")
            {
                document.getElementById('msgLambda').innerHTML = "";
            }
            //Informations apparaissant dans une bulle au dessus del'item si celui-ci est dans la salle
            else
            {
                if (choix ==="creation")
                {
                    genereContenuID('span',tabDeTousLesItems[i][1][1],'ecran',i);
                    var myDiv = document.getElementById(i);
                    myDiv.style.position ='absolute';
                    myDiv.style.backgroundColor='black';
                    myDiv.style.color='white';
                    myDiv.style.borderRadius ='2px';
                    myDiv.style.top = y - 20 +"px";
                    myDiv.style.left = x - 40 +"px";
                    myDiv.style.fontSize="11px";
                    myDiv.style.opacity="0.7";
                }
                else if (choix ==="suppression")
                {
                   var myDiv = document.getElementById(i);
                   myDiv.parentNode.removeChild(myDiv);
                }
            }
        }
    }
}

/*
 *  @param {string} id - correspond a l'id de la div a cacher 
 */
function afficherCacher(id) 
{
  var div = document.getElementById(id); 
  if(div.style.display==="none" || div.style.display==="")          // Si la division est cache
        div.style.display = "block";
   else                                                             // Si la division est visible
        div.style.display = "none"; 
}

/*
 * 
 * @param {boolean} son -  variable globale son 
 * @param {string} id - nom du bouton 
 * @param {string} url1 - adresse de l'image 1
 * @param {string} url2 - adresse de l'image 2
 */
//change l'image du bouton son en fonction de la valeur de la variable globale son
function intervertirImageSon(son,id,url1,url2) 
{
    //si variable globale son == false
    if (son === false) 
        document.getElementById(id).style.background = "url('"+url2+"') no-repeat center";  
    else 
        document.getElementById(id).style.background = "url('"+url1+"') no-repeat center"; 
}

/*
 * 
 * @param {number} width - largeur de l'infobulle
 * @param {number} marginleft - position horizontale de l'infobulle
 * @param {string} contenu - texte à l'intérieur de l'infobulle
 */
//affiche l'infobulle au-dessus des boutons du menu
function afficheInfoBulleMenu(width, marginleft,contenu)
{
    genereContenuID('span','','ecran','infoBulleMenu');
    var myDiv = document.getElementById('infoBulleMenu');
    document.getElementById('infoBulleMenu').style.display='block';
    
    document.getElementById('infoBulleMenu').innerHTML = contenu;
    
    myDiv.style.left = marginleft+"px";
    myDiv.style.width= width+"px";    
}

//masque l'infobulle des boutons du menu
function masqueInfoBulleMenu() 
{
    document.getElementById('infoBulleMenu').style.display='none';
}

/*
 * 
 * @param {string} msg - message à afficher 
 * @param {number} timeOut - temps d'apparition (1000 = 1 sec)
 */
//génère un message dans la boîte de dialogue avec un temps d'apparition
function genererMessageBoite(msg,timeOut)
{
    document.getElementById('msgLambda').innerHTML = msg;
    setTimeout(function(){document.getElementById('msgLambda').innerHTML = "";}, timeOut);
}

/*
 * 
 * @param {string} url - adresse du son à jouer
 * @param {boolean} boolean - varibale globale son 
 */
//activer le son
function jouerSon(url,boolean)
{
    var son = new Audio(url);
    if (boolean === true)
        son.play();
    else 
        return;
}

//désactiver le son
function couperJouerSon()
{
    if (son === true)
        son = false;
    else
        son = true;
}

/*
 * 
 * @param {boolean} boolean - variable globale musique
 */
//jouer la musique
function jouerMusique(boolean)
{  
    if (boolean === false)
        //supprime l'element audio
        removeElementById("music");
    else if (boolean === true)
        //créé l'element audio
        genereContenu('span','<audio id="music" src="sons/hello.mp3" controls preload="auto" autoplay="autoplay" style="display:none" loop="loop"></audio>','menu');
}

//désactive la musique
function couperJouerMusique()
{
    if(musique === true)
        musique = false;
    else
        musique = true;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//instanciation du joueur
    var joueur = new Joueur(); 	          
//Bouton afficher-cacher inventaire
   genereContenu('span','<button class="boutonMenu" id="boutonInventaire" type="button" onmouseover="afficheInfoBulleMenu(80,2,'+"'"+"Inventaire"+"'"+')" onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="afficherCacher('+"'"+"inventaire"+"'"+')"></button>','menu');
//Bouton couper/allumer les effets sonores
   genereContenu('span','<button class="boutonMenu" id="boutonSon" type="button" onmouseover="afficheInfoBulleMenu(120,55,'+"'"+"Effets Sonores"+"'"+')"  onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="couperJouerSon();intervertirImageSon(son,'+"'"+"boutonSon"+"'"+','+"'"+"images/son.png"+"'"+','+"'"+"images/son2.png"+"'"+')" ></button>','menu');
//Bouton de musique
   genereContenu('span','<button class="boutonMenu" id="boutonMusique" type="button" onmouseover="afficheInfoBulleMenu(80,100,'+"'"+"Musique"+"'"+')"  onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="couperJouerMusique();intervertirImageSon(musique,'+"'"+"boutonMusique"+"'"+','+"'"+"images/musique.png"+"'"+','+"'"+"images/musique2.png"+"'"+');jouerMusique(musique)"></button>','menu');    