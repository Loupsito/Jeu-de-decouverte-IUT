//indique si le joueur se trouve face à une porte libre d'accès ou non (booléen) => servira uniquement en tant que prerequis de l'action "ouvrir toutes les portes"
var porteVerrouille;

// tableau qui contiendra toutes les portes verrouillées que le joueur voit => servira pour les etats finaux des différents "ouvrir porte"
var nomPorte = [];

//permettant de couper le son 
var son = false;

//permettant de couper la musique 
var musique = false;

//permettent le défilement du nom de scène
var nomTampon;

var nomTampon2 = "EXTERIEUR";

var nomDeScene;

var msg;

//Tableau qui repertorie tous les items
var tabDeTousLesItems;

//Tableau qui repertorie toutes les scenes
var listeCases;

//Tableau qui repertorie tous les liens entre les salles
var listeLiens;

//Tableau qui repertorie toutes les actions
var listesActions;

var tabPNJ;
defiler ("nomScene"); 
defiler ("nomScene2"); 
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
    nouveauDiv.innerHTML = contenu;                              //Attribution d'un contenu
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
    if (el)
        el.parentNode.removeChild(el);
}

function indicationChargement()
{
    //alert("on charge !");
    //On met toutes les images dans un seul tableau pour toute les precharger
    var tampon = new Array();   
    for(var i=0;i<listeCases.length;i++)
    {
        tampon.push(listeCases[i][3]);
    }
    for(var i=0;i<tabDeTousLesItems.length;i++)
    {
        tampon.push(tabDeTousLesItems[i][1][2]);
    }           
     for(var i=0;i<tabPNJ.length;i++)
    {
        tampon.push(tabPNJ[i]["image"]);
    }
    
    //Prechargement des images    
    for(var i=0;i<tampon.length;i++)
    {        
        var image = prechargerImage(tampon[i]);
        image.onload = function()
        {            
            document.getElementById('chargement').style.display='none';
        };
    }     
}
//Fonction qui va precharger les images
function prechargerImage(url)
{
    var image = new Image();
    image.src=url;
    return image;
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
    verifieProgression(progression);
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
            placementPNJ(joueur.idSalle);
            placementScenario(joueur.idSalle);    
            document.getElementById("position").innerHTML="Position Joueur : "+joueur.idSalle;
            break;
        }
    }
    //------------------------------------BOUTONS DE SCENES-------------------------------------    
    //initialisation de la variable globale à true
    porteVerrouille = true;   
    //reinitialise le taleau (vide le tableau)
    nomPorte = [];
    var count = $("#blocNomScene1 > *").length;
     //parcours le tableau des liens
    for (var i = 0; i < listeLiens.length; i++)
    {                 
        //parcours le tableau des scènes
        for (var j = 0; j < listeCases.length; j++)
        {
            //compare la salle 1 du lien à la position du joueur ET la salle 2 du lien à la scène
            if ((listeLiens[i][0] === joueur.idSalle && listeCases[j][0] === listeLiens[i][1]) || (listeLiens[i][1] === joueur.idSalle && listeCases[j][0] === listeLiens[i][0]))
            {                           
                genereHitboxDeplacement(60,30,j,i);
                if (verifAccesSalle(listeLiens[i][0],listeLiens[i][1]) === false)
                {
                    porteVerrouille = false;
                    //rempli le tableau avec le nom des portes verrouillées que le joueur voit => servira pour les actions ouvrirPorte
                    nomPorte.push(listeCases[j][1]);
                    break;
                }        
            }
            if (joueur.idSalle === listeCases[j][0])
            {			
                if (count >= 1)
                {                    	
                    //alert(nomTampon);
                    if (!(listeCases[j][1].substring(0, 3) === nomTampon.substring(0, 3)))
                    {
                        $("#blocNomScene1").empty();
                        convertiNomScene(listeCases[j][1]);
                        afficheNomScene(nomDeScene,'blocNomScene2','nomScene2','textNomScene2');
                        nomTampon2 = listeCases[j][1]; 
                        defiler ("nomScene2");                         
                    } 
                }
                else 
                {  
                   if (!(listeCases[j][1].substring(0, 3) === nomTampon2.substring(0, 3)))
                    {
                        $("#blocNomScene2").empty();
                        convertiNomScene(listeCases[j][1]);
                        afficheNomScene(nomDeScene,'blocNomScene1','nomScene','textNomScene');
                        nomTampon = listeCases[j][1];
                    }                   
                }   
            }
        }
    }
    //------------------------------------BOUTONS D'ITEMS-------------------------------------
    for (var i = 0; i < listeCases.length; i++)
    {
        if (joueur.idSalle === listeCases[i][0])
        {						
            if(listeCases[i][2]) //On verifie que le tableau d'items existe
            {    
                for (var j = 0; j < listeCases[i][2].length ; j++)
                {                          
                    verificatonPlacementItem(listeCases[i][2][j]);
                }
            }
            break;
        }
    }    
}
function ouvrirPorte(tabPortes)
{
    var idPortes = null;
    $('span').click(function () {
        idPortes = this.id;
        for(var i =0; i<tabPortes.length;i++)
        {
            if (idPortes === tabPortes[i])
            {
                deverouillementPorte(idPortes);
                break;
            }
        }
    });
}
function deverouillementPorte(nomId)
{
//On y rentrera les id des portes verrouillées que l'action peut deverrouiller
    var idPorte = [];
    for (var i = 0;i < listeCases.length;i++)//parcourt la liste des scènes
    {
        if (nomId === listeCases[i][1])
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
                    
                    //generer une notification 
                        genererNotification("Vous avez déverrouillé la salle"+listeCases[i][1]);                    
                        break;
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
    //Si la div msgDialogue existe alors la vider
    if(document.getElementById('msgDialogue'))
    {
        document.getElementById('msgDialogue').innerHTML = "";            
        removeElementById("msgDialogue");
    }  
    if(document.getElementById('AfficherAgenda'))
    {     
        removeElementById("textAction");
        removeElementById("AfficherAgenda");
    }
    if(document.getElementById('CacherAgenda'))
    {       
        removeElementById("textAction");
        removeElementById("CacherAgenda");
    }
    
    //test si l'accès à la nouvelle scène est libre ou non
    if (verifAccesSalle(id1,id2) === true)
    {
        verifieProgression(progression);
        //changement de scène
        joueur.idSalle = newScene;                           
        //effacer le contenu des autres division => initilisation de la page
        document.getElementById('pnj').innerHTML="";        
        if(document.getElementById('menuAction'))
            removeElementById('menuAction');

        //cacher la boite de dialogue
        cacherBoiteDialogue();
        
        //efface les notifications
        removeElementById("notification");
        
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
                     break;
                 }
             }
             for (m=0;m<tabDeTousLesItems.length;m++)
             {
                 if (capture[i].id === tabDeTousLesItems[m][0] &&verifPossessionItem(capture[i].id) ===false)
                 {
                     var monItem = document.getElementById(tabDeTousLesItems[m][0]);
                     monItem.parentNode.removeChild(monItem);
                     break;
                 }
             }
         }
         //-----Fin suppression hitbox------
         fonctionGeneratricePrincipale();             
    }
    //sinon affiche un message d'erreur dans la boîte de dialogue
    else
        genererNotification("Vous ne pouvez pas avancer..."); 
    
    //efface le contenu des divisions de déplacement et d'objet
    document.getElementById('deplacement').innerHTML = "";
    document.getElementById('objet').innerHTML = "";
    
     var captureActions = document.querySelectorAll('#menuAction span');
   // alert("Actions capture = "+captureActions.length);
    if(captureActions.length !==0)
    {
        msg="";
        for(var k=0;k<listesActions.length;k++)
        {           
            if(captureActions[k])
            {
                verifiePrerequis(captureActions[k].textContent,"avancement");
                break;
            }
        }
    }        
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
    }    
}	


function verifScene(id1, id2)
{
    for (var i = 0; i < listeLiens.length;i++)
    {
        if ((listeLiens[i][0] === id1 && listeLiens[i][1] === id2) || (listeLiens[i][0] === id2 && listeLiens[i][1] === id1))  
        {
            if ((listeLiens[i][2] === false) && (joueur.idSalle !== id1 && joueur.idSalle !== id2))
                return 0;
            else
                return true;
        }
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
    if(document.getElementById('menuAction'))
        document.getElementById('menuAction').innerHTML = "";
    msg="";    
    for(var i = 0; i<captureBouton.length;i++)
    {
        //parcours le tableau d'actions
        for(var j = 0; j <listesActions.length;j++)
        {
            //compare les chaines de caractères contenues dans le tableau d'objet et celui des actions          
            if (captureBouton[i].textContent === (listesActions[j]["nomAction"]).toString())
            {                    
                    verifiePrerequis(listesActions[j]["nomAction"],"interaction");

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
    verifieProgression(progression);
}

/*
 * @param {string} leItem - le nom de l'item
 * @returns {boolean} - retrourne le booleen 'possession' de l'item
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


function suppressionItemDuJeu(leItem)
{
    for(var i = 0; i<tabDeTousLesItems.length;i++)
    {               
            if (tabDeTousLesItems[i][0] === leItem)
            {               
                delete tabDeTousLesItems[i][0];
                delete tabDeTousLesItems[i][1];
                break;
            }                              
    }
}

function existenceItem(leItem)
{
    var trouve;
    for(var i = 0; i<tabDeTousLesItems.length;i++)
    {               
            if (tabDeTousLesItems[i][0] === leItem)
            {
                trouve = true;      
                break;
            }
            else
                trouve = false;                                   
    }
    return trouve;
}


/*
 * @param {string} leItem - le nom de l'item
 */
//Place l'item en fonction de son booleen
function verificatonPlacementItem(leItem)
{
        if (verifPossessionItem(leItem) === false)//Si c'est dans la salle
            genereHitboxItem(40,25,leItem);         
}

/*
 * @param {string} leItem - represente l'item en question a placer dans l'inventaire
 * @param {number} indice - represente l'indice de la localisation de l'item dans le tableau qui repertorie tous les items
 */
//Place l'item dans l'inventaire si celui-ci est a false
function placementItemDansInventaire(leItem,indice)
{
        if (verifPossessionItem(leItem) === true)            //Si c'est dans l'inventaire
        {
            genereContenuID('span','<button type="button" onmouseout="bulleInfosItem(1,1,'+"'"+leItem+"'"+','+"'"+'suppression'+"'"+')" onmouseover ="bulleInfosItem(1,1,'+"'"+leItem+"'"+','+"'"+'creation'+"'"+')"  onclick="changementAff('+"'"+leItem+"'"+')"><img src="'+tabDeTousLesItems[indice][1][2]+'" width="20" height="20" /></button>',verifieCaseInventaire(),leItem);
            document.getElementById(leItem).style.lineHeight="20px";
            document.getElementById(leItem).style.verticalAlign= "middle";
            document.getElementById(leItem).style.marginTop="16px";
            document.getElementById(leItem).style.marginLeft="9px";        
            genererNotification("Vous avez ramassé l'item : "+leItem);
            jouerSon('sons/item.mp3',son);
            $("#msgDescription").empty();
            verifieProgression(progression);
        }
        else                                                 //Si c'est dans la salle
        {
            genereHitboxItem(40,25,leItem);
        }	
}

/* 
 * @returns {String} tabCase[i] - id de la div vide (pour placer l'objet dedans)
 */
function verifieCaseInventaire()
{
    var tabCase =["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12"];    
    for(var i=0;i<tabCase.length;i++)
    {
        var laCase = document.querySelectorAll('#'+tabCase[i]+' span');    
        if(!laCase[0])//Si elle est vide ou si la case n'est pas remplie
            return tabCase[i];            
    }
}

function NettoyageCaseInventaire()
{    
    var tabCase =["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12"];    
    for(var i=0;i<tabCase.length;i++)
    {
        var laCase = document.querySelectorAll('#'+tabCase[i]+' span');    
        if(laCase[0])//Si elle est vide ou si la case n'est pas remplie
            document.getElementById(tabCase[i]).innerHTML="";            
    }
}

function NettoyageComplet()
{
    document.getElementById('pnj').innerHTML="";
    document.getElementById('deplacement').innerHTML = "";
    document.getElementById('objet').innerHTML = "";
    
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
                      break;
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
            genereContenuID('span','<button type="button" onmouseout="bulleInfosItem(1,1,'+"'"+tabDeTousLesItems[i][0]+"'"+','+"'"+'suppression'+"'"+')" onmouseover ="bulleInfosItem(1,1,'+"'"+tabDeTousLesItems[i][0]+"'"+','+"'"+'creation'+"'"+')"  onclick="changementAff('+"'"+tabDeTousLesItems[i][0]+"'"+')"><img src="'+tabDeTousLesItems[i][1][2]+'" width="20" height="20" /></button>',verifieCaseInventaire(),tabDeTousLesItems[i][0]);
            document.getElementById(tabDeTousLesItems[i][0]).style.lineHeight="20px";
            document.getElementById(tabDeTousLesItems[i][0]).style.verticalAlign= "middle";
            document.getElementById(tabDeTousLesItems[i][0]).style.marginTop="16px";
            document.getElementById(tabDeTousLesItems[i][0]).style.marginLeft="9px";
        }
    }	
}

/*
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
                    msg+=" "+action;                       
                }
            }                        
            //Les actions ne sont affiche QUE si le nombre d'erreur n'est pas respecte
            if (erreurs !== 0 && choix ==="interaction")
            {
                genererNotification("Vous ne pouvez pas utiliser l'objet.");
            }
            else if (erreurs !== 0 && choix ==="avancement")
            {
                genererNotification("Vous ne pouvez plus utiliser l'objet.");               
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
                           if (captureBoutonAction[j].textContent == listesActions[i]["nomAction"]) // ATTANTION : Laisser le ==
                               break;
                           else//-----------------------------Si le bouton n'est pas présent : generer le bouton action-----------------------------
                           { 
                               afficherBoiteDialogue();
                               menuActions();
                               genereContenuID('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]["nomAction"]+"'"+');$('+"'"+"#actions"+"'"+').empty();$('+"'"+"div"+"'"+').remove('+"'"+"#textAction"+"'"+');cacherBoiteDialogue()">'+listesActions[i]["nomAction"]+'</button>','actions',listesActions[i]["nomAction"]);
                               boutonAction(listesActions[i]['nomAction'],listesActions[i]['nomAction'],'"afficheResultat('+"'"+listesActions[i]["nomAction"]+"'"+');$('+"'"+"#actions"+"'"+').empty();$('+"'"+"div"+"'"+').remove('+"'"+"#textAction"+"'"+');cacherBoiteDialogue()"');
                               if(document.getElementById("antiClic2"))
                                   removeElementById("antiClic2");
    
                           }
                      }
                       return;
                  }
               }
               else//-----------------------------Si le bouton n'est pas présent : generer le bouton action-----------------------------
               {
                   afficherBoiteDialogue();
                   menuActions();
                   //genereContenuID('p',texteAction,'actions','textAction'); 
                   //genereContenuID('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+');$('+"'"+"#actions"+"'"+').empty();$('+"'"+"div"+"'"+').remove('+"'"+"#textAction"+"'"+');cacherBoiteDialogue()">'+listesActions[i]['nomAction']+'</button>','actions',listesActions[i]["nomAction"]);
                   boutonAction(listesActions[i]['nomAction'],listesActions[i]['nomAction'],'"afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+');$('+"'"+"#actions"+"'"+').empty();$('+"'"+"div"+"'"+').remove('+"'"+"#textAction"+"'"+');cacherBoiteDialogue()"');
                   if(document.getElementById("antiClic2"))
                       removeElementById("antiClic2");    
               }
            }
            break;
        }
    }
}

function menuActions()
{       
    if(!document.getElementById("menuAction"))
    {
        //alert("Creation de menuActions");
        genereContenuID("div","","ecran","menuAction");
        boutonFermerMenuAction();
        menu = document.getElementById("menuAction");
        menu.style.position="absolute";    
        menu.style.width="70%";
        menu.style.height="40%";
        menu.style.padding="10px";
        menu.style.backgroundColor="rgba(0, 0, 0, 0.50)";;
        menu.style.border="solid white 2px";
        menu.style.borderRadius="4px";
        menu.style.left="0";
        menu.style.right="0";    
        menu.style.margin="0 auto";
        menu.style.zIndex="2";    
        $('#menuAction').fadeIn("slow").animate({"margin-top": 50}, "slow");    
    }
    else
        boutonFermerMenuAction();
}

function boutonAction(idd,nom,fonction)
{
    genereContenuID("div",nom,"menuAction",idd);
    var bouton = document.getElementById(idd);
    //alert(bouton);
    bouton.style.position="relative";    
    bouton.style.width="70%";
    bouton.style.height="35px";
    bouton.style.backgroundColor="#EBEBEB";    
    bouton.style.borderRadius="2px";
    bouton.style.left="0";
    bouton.style.right="0";    
    bouton.style.margin="0 auto";
    bouton.style.marginTop="10px";
    bouton.style.zIndex="2";
    
    bouton.style.textAlign="center";
    bouton.style.lineHeight="34px";
    bouton.style.fontFamily= 'century gothic';
    
    
    $("#"+idd).click(function (){
        //alert(fonction);
        eval(eval(fonction));
        removeElementById("menuAction");
    });
    $("#"+idd).hover(function (){
        bouton.style.backgroundColor="#4C4C4C";
        bouton.style.color="white";
        bouton.style.cursor="pointer";
    });
    $("#"+idd).mouseleave(function (){
        bouton.style.backgroundColor="#EBEBEB";
        bouton.style.color="black";
    });        
}
function boutonFermerMenuAction()
{    
    genereContenuID("div","","menuAction","fermer");
    var bouton = document.getElementById("fermer");
    bouton.style.position="absolute";
    bouton.style.width="8px";
    bouton.style.height="8px";
    bouton.style.left=98+"%";
    bouton.style.top=1+"px";
    bouton.style.background = "url('images/croix.png')";
    bouton.style.backgroundSize = "contain";
    bouton.style.backgroundRepeat = "no-repeat";    
    $("#fermer").click(function (){
        removeElementById("menuAction");
    });
    $("#fermer").hover(function (){
        bouton.style.backgroundColor="red";
        bouton.style.cursor="pointer";
    });
    $("#fermer").mouseleave(function (){
        bouton.style.background = "url('images/croix.png')";
        bouton.style.backgroundSize = "contain";
        bouton.style.backgroundRepeat = "no-repeat";
    });        
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
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//instanciation du joueur
    var joueur = new Joueur(); 	          
//Bouton afficher-cacher inventaire
   genereContenu('div','<button class="boutonMenu" id="boutonInventaire" type="button" onmouseover="afficheInfoBulleMenu('+"'"+"Inventaire"+"'"+')" onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="afficherCacher('+"'"+"inventaire"+"'"+')"></button>','menu');
//Bouton couper/allumer les effets sonores
   genereContenu('div','<button class="boutonMenu" id="boutonSon" type="button" onmouseover="$('+"'"+"#blocInfoBulle"+"'"+').empty();afficheInfoBulleMenu('+"'"+"Effets Sonores"+"'"+')"  onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="couperJouerSon();intervertirImageSon(son,'+"'"+"boutonSon"+"'"+','+"'"+"images/son.png"+"'"+','+"'"+"images/son2.png"+"'"+')" ></button>','menu');
//Bouton de musique
   genereContenu('div','<button class="boutonMenu" id="boutonMusique" type="button" onmouseover="$('+"'"+"#blocInfoBulle"+"'"+').empty();afficheInfoBulleMenu('+"'"+"Musique"+"'"+')"  onmouseout="masqueInfoBulleMenu('+"'"+"infoBulleMenu"+"'"+')" onclick="couperJouerMusique();intervertirImageSon(musique,'+"'"+"boutonMusique"+"'"+','+"'"+"images/musique.png"+"'"+','+"'"+"images/musique2.png"+"'"+');jouerMusique(musique)"></button>','menu');
   
   






//---------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------PROVISOIRE : AFFICHE COORDONNEES---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
var d = document.getElementById("console");
topPos = d.offsetTop;
leftPos = d.offsetLeft;
genereContenuID('div','','corps','curseur');
var position = document.getElementById('curseur');
                            document.addEventListener('mousemove', function(e) {
                                position.innerHTML = 'Position X : ' + (e.clientX - leftPos) + 'px<br />Position Y : ' + (e.clientY - topPos) + 'px <br/> top :' + topPos+ "-- left :"+ leftPos;  
                            }, false);
