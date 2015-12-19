	
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
var listeCases;
var tabDeTousLesItems;
var listeLiens;
var tampon;
var porteVerrouille;

//Les actions
    //pomme
    var manger = {"nomAction" : "manger","prerequis" : ["joueur.idSalle==0","verifPossessionItem('cle') == true"]};
    var ecraser = {"nomAction": "ecraser","prerequis" : ["joueur.idSalle==0 || joueur.idSalle==1"]};
    //brosse
    var brosser = {"nomAction": "brosser","prerequis" : ["joueur.idSalle==0"]};
    //cle
    var ouvrir_porte = {"nomAction": "ouvrir_porte","prerequis" : ["porteVerrouille==false"]}; 

    //Le tableau qui contient les actions
    var listesActions = [manger,ecraser,brosser,ouvrir_porte];	

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
 * @param {type} idd - nom de l'id a donnee
 */
//Fonction qui permet de creer la balise que l'on veut (<p>,<span>,etc, avec attribution d'un id)
function genereContenuID(element,contenu,divMere,idd)
{
    nouveauDiv = document.createElement(element);                //creation de l'element
    nouveauDiv.innerHTML = contenu;				 //Attribution d'un contenu
    nouveauDiv.id=idd;                                           //Attribution d'un id
    document.getElementById(divMere).appendChild(nouveauDiv);    //pour insérer dans une div qu'on aura donnee au prealable
}
					
//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------DEPLACEMENT--------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
					
//classe joueur pour connaître la position de l'utilisateur
function Joueur (idSalle)
{
    //salle
    this.idSalle = idSalle || 0;
}

//fonction générant le texte et les boutons
function genererTexte()
{
    //------------------------------------POSITION DU JOUEUR-----------------------------------
    //parcours du tableau des scènes
    for (var i = 0; i < listeCases.length ; i++)
    {
            //si position de joueur = id de scènes d'indice i
            if (joueur.idSalle === listeCases[i][0])
            {
                    //affichage de la position du joueur
                    var positionJoueur = '<b>Position du joueur =></b> '+listeCases[i][1];
                    genereContenu('p',positionJoueur,'deplacement');
            }
    }

    //------------------------------------BOUTONS DE SCENES-------------------------------------
    var boutonsDeplacement = '<b>Salles adjacentes :</b><br/>';
    genereContenu('p',boutonsDeplacement,'deplacement'); 
    
    //initialisation de la variable globale à true
    porteVerrouille = true;
    
     //parcours le tableau des liens
    for (var i = 0; i < listeLiens.length; i++)
    {                 
            //parcours le tableau des scènes
            for (var j = 0; j < listeCases.length; j++)
            {
                    //compare la salle (liens) à la position du joueur ET la salle (scènes) à l'id 2 (liens)
                    if ((listeLiens[i][0] === joueur.idSalle && listeCases[j][0] === listeLiens[i][1]) || (listeLiens[i][1] === joueur.idSalle && listeCases[j][0] === listeLiens[i][0]))
                    {
                            genereContenu('span','<button type="button" onclick="avancer(listeCases['+j+'][0])">'+listeCases[j][1]+'</button>','deplacement');
                            if (sceneIsTrue(listeCases[j][0]) === false)
                                    porteVerrouille = false;
                    }
            }
    }

    //------------------------------------BOUTONS D'ITEMS-------------------------------------
    var caseInventaire = '<b>Objets que vous voyez :</b><br/>';
    genereContenu('p',caseInventaire,'deplacement'); 
    for (var i = 0; i < listeCases.length; i++)
    {
            if (joueur.idSalle === listeCases[i][0])
            {						
                    for (var j = 0; j < listeCases[i][2].length ; j++)
                    {
                            genereContenu('span','<button type="button">'+listeCases[i][2][j]+'</button>','objet');
                    }
            }
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------Analyse-des-boutons-et-traitement----------------------------------------------
            var	captureBouton = document.querySelectorAll('#objet span');
            document.getElementById('objet').innerHTML = "";
            for(var i = 0; i<captureBouton.length;i++)
            {
                    //genereContenu('span','<button type="button" onclick="selectionObjet('+"'"+captureBouton[i].textContent+"'"+')">'+captureBouton[i].textContent+'</button>','objet');
                    placementItem(captureBouton[i].textContent);
            }
    //-----------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------


}		

function avancer(newScene)
{	
    
    //test si l'accès à la nouvelle scène est libre ou non
     if (sceneIsTrue(newScene) === true)
      joueur.idSalle = newScene;
     else
      alert("porte verrouillé");

        document.getElementById('deplacement').innerHTML = "";
        document.getElementById('objet').innerHTML = "";
        genererTexte();
        var captureActions = document.querySelectorAll('#actions span');
        for(k=0;k<listesActions.length;k++)
        {
            //alert("lopo");
            verifiePrerequis(captureActions[k].textContent,"avancement");
            //alert(captureActions[k].textContent);
            //alert("lopo2");
        }
}

function sceneIsTrue(newScene)
{
 //parcours le tableau des liens
 for (var j = 0; j < listeLiens.length;j++)
 {
   //test si l'id est égal à la position du joueur et si l'id est égal à la position souhaité
   if (listeLiens[j][0] === joueur.idSalle)
   {
    if ((listeLiens[j][1] === newScene)&&(listeLiens[j][2] === false))
     return false;
   }
   else if (listeLiens[j][1] === joueur.idSalle)
   {
    if ((listeLiens[j][0] === newScene)&&(listeLiens[j][2] === false))
     return false;  
   }
 }
 return true;
}
					
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------INTERACTION-------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

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
                else
                {
                        document.getElementById('actions').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
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
                        if (captureBouton[i].textContent === listesActions[j]["nomAction"])
                        {
                                verifiePrerequis(listesActions[j]["nomAction"],"interaction");
                        }
                }
        }
}

/*
 * @param {string} val - l'action choisi precedemment
 */
function afficheResultat(val)
{
        document.getElementById('actions').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
}

/*
 * @param {Object[]} array - le tableau
 * @param {string} value - la valeur a supprimer
 */
// Efface que la première occurrence pour la valeur
function arrayUnsetByValue(array, value)
{ 
        array.splice(array.indexOf(value), 1);
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Verifie si l'item est dans l'inventairer ou pas
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
function placementItem(leItem)
{
        if (verifPossessionItem(leItem) === true)//Si c'est dans l'inventaire
        {
                //ne rien faire
        }
        else 									//Si c'est dans la salle
        {
                genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
        }	
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Place l'item dans l'inventaire si celui-ci est a false
function placementItemDansInventaire(leItem)
{
        if (verifPossessionItem(leItem) === true)            //Si c'est dans l'inventaire
        {
                genereContenuID('span','<button type="button" onclick="changementAff('+"'"+leItem+"'"+')">'+leItem+'</button>','inventaire',leItem);
        }
        else                                                 //Si c'est dans la salle
        {
                genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
        }	
}

/*
 * @param {string} leItem - le nom de l'item
 */
//Fonction utilise lors de la selection d'un item
function selectionObjet(leItem)
{
        for(var i = 0; i<tabDeTousLesItems.length;i++)
        {
                if (tabDeTousLesItems[i][0] === leItem)
                {
                        tabDeTousLesItems[i][1][3] = true;//true ou false
                }
                else
                {
                        //ne rien faire
                }
        }	
        //suppresion de l'item
        var monItem = document.getElementById(leItem);
        monItem.parentNode.removeChild(monItem);

        placementItemDansInventaire(leItem);
}

//Analyse les items a true et les places dans l'inventaire si c'est le cas
function debutInventaire()
{
        for(var i = 0; i<tabDeTousLesItems.length;i++)
                {
                        if (tabDeTousLesItems[i][1][3] === true)
                        {
                                genereContenuID('span','<button type="button" onclick="changementAff('+"'"+tabDeTousLesItems[i][0]+"'"+')">'+tabDeTousLesItems[i][0]+'</button>','inventaire',tabDeTousLesItems[i][0]);
                        }
                        else
                        {
                                //ne rien faire
                        }
                }	
}

/*
 * @param {string} action - le nom de l'action
 */
//Fonction verifiant les prerequis des actions
function verifiePrerequis(action,choix) //ajouter un choix de modification
{
    var erreurs = 0 ;
    //alert("entré dans verifiePrerequis");
    for(i=0;i<listesActions.length;i++)
    {
        if (listesActions[i]['nomAction']===action)//identification du nom de l'action
            {
                //alert(listesActions[i]['nomAction']+" = "+action);
                for(j=0;j<listesActions[i]['prerequis'].length;j++)//verification validation prerequis
                {   
                    //Si le prerequis est respecte
                    if (eval(listesActions[i]['prerequis'][j]))
                    {
                       //alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  : prerequis respecte");
                        // ne rien faire 
                    }
                    //Si jamais un prerequis n'est pas respecte
                    else
                    {	
                        //alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  :prerequis non respecte");
                        erreurs +=1;
                    }
                }
                //Les actions ne sont affiche QUE si le nombre d'erreur n'est pas respecte
                if (erreurs !== 0 && choix ==="interaction")
                {
                    alert(erreurs+" prerequis pas respecte pour " +listesActions[i]['nomAction']);
                }
                else if (erreurs !== 0 && choix ==="avancement")
                {
                     alert(erreurs+" prerequis pas respecte pour " +listesActions[i]['nomAction']);
                    document.getElementById('actions').innerHTML = "";
                }
                
                //Affichage des actions
                else
                {
                       //Si bouton present : ne rien afficher
                      var captureBouton = document.querySelectorAll('#actions span');

                       if(captureBouton.length !==0)
                       {
                        for(var y = 0; y<captureBouton.length;y++)
                          {
                              for(var j = 0; j <listesActions.length;j++)
                              {       
                                  var captureBoutonAction = document.querySelectorAll('#actions span');

                                   if (captureBoutonAction[j].textContent === listesActions[i]["nomAction"])
                                   {
                                       break;
                                   }
                                   else
                                        genereContenu('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]["nomAction"]+"'"+')">'+listesActions[i]["nomAction"]+'</button>','actions');
                              }
                               return;
                          }
                       }
                       else
                       {
                        //Si le bouton n'est pas présent : generer le bouton action
                        genereContenu('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+')">'+listesActions[i]['nomAction']+'</button>','actions');
                       }
                }	
            }
        else
            {
                    //alert(listesActions[i]['nomAction']+" =/= "+action + "  :  NOPE");
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
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

//Analyse les items a true et les places dans l'inventaire si c'est le cas
debutInventaire();
//instanciation du joueur
var joueur = new Joueur(); 					
//gerere le texte et les boutons
genererTexte();		