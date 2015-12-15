	
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
var listeCases;
var tabDeTousLesItems;
var tampon;

//Les actions
var manger = {"nomAction" : "manger","prerequis" : ["joueur.idSalle==0","verifPossessionItem('cle') == true"]};
var ecraser = {"nomAction": "ecraser","prerequis" : ["joueur.idSalle==0"]};
var brosser = {"nomAction": "brosser","prerequis" : ["joueur.idSalle==0"]};
//var ouvrir porte
//var brosser

//Le tableau qui contient les actions
var listesActions = [ecraser,manger,brosser];	

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
    this.idSalle = idSalle || 2;
    //orientation du joueur
}
									
//fonction générant le texte et les boutons
function genererTexte()
{
    //position du joueur
    var positionJoueur = '<b>Position du joueur =></b> '+listeCases[joueur.idSalle][1];
    genereContenu('p',positionJoueur,'deplacement');
  
    //affichage des boutons de scènes (portes ou longs couloirs)
    var boutonsDeplacement = '<b>Salles adjacentes :</b><br/>';
    genereContenu('p',boutonsDeplacement,'deplacement'); 
					
    for (i = 0; i < listeCases[joueur.idSalle][2].length; i++)
    {
        //affiche le nom de la scène dans les boutons créés.
	genereContenu('span','<button type="button" onclick="avancer(listeCases[joueur.idSalle][2]['+i+'][0],'+i+')">'+listeCases[joueur.idSalle][2][i][1]+'</button>','deplacement');
    } 
						

						
    //affiche boutons items  
    var caseInventaire = '<b>Objets que vous voyez :</b><br/>';
    genereContenu('p',caseInventaire,'deplacement'); 
    for (i = 0; i < listeCases[joueur.idSalle][3].length; i++)
    {
        genereContenu('span','<button type="button">'+listeCases[joueur.idSalle][3][i]+'</button>','objet');
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
				
//Fonction qui fait avancer le joueue                                
function avancer(newScene,indice)
{	
//test la case lointaine est accessible

        //affiche une alerte si non accessible
        if (listeCases[joueur.idSalle][2][indice][2] === false)			
                alert("La porte est vérrouillé, il doit y avoir une cle près d\'ici...");
        //case lointaine accessible => le joueur peut avancer
        else 
                joueur.idSalle = newScene;

        document.getElementById('deplacement').innerHTML = "";
        document.getElementById('objet').innerHTML = "";
        genererTexte();
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
                        document.getElementById('objet').innerHTML = "";
                        //puis on ajoute nos nouveaux elements
                        genereAction(tabDeTousLesItems[i][1][0]); 
                        break;
                }
                else
                {
                        document.getElementById('objet').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
                }
        }

        var captureBouton = document.querySelectorAll('#objet span');
        document.getElementById('objet').innerHTML = "";
        for(var i = 0; i<captureBouton.length;i++)
        {
                //parcours le tableau d'actions
                for(var j = 0; j <listesActions.length;j++)
                {
                        //compare les chaines de caractères contenues dans le tableau d'objet et celui des actions
                        if (captureBouton[i].textContent === listesActions[j]["nomAction"])
                        {
                                verifiePrerequis(listesActions[j]["nomAction"]);
                        }
                }
        }
}
/*
 * @param {string} val - l'action choisi precedemment
 */
function afficheResultat(val)
{
        document.getElementById('objet').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
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
 * 
 * @param {string} action - le nom de l'action
 */
//Fonction verifiant les prerequis des actions
function verifiePrerequis(action)
{
    var erreurs = 0 ;
    
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
                        // alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  : prerequis respecte");
                        // ne rien faire 
                    }
                    //Si jamais un prerequis n'est pas respecte
                    else
                    {	
                        alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  :prerequis non respecte");
                        erreurs +=1;
                    }
                }
                //Les actions ne sont affiche QUE si le nombre d'erreur n'est pas respecte
                if (erreurs !== 0)
                    alert(erreurs+" prerequis pas respecte pour " +listesActions[i]['nomAction']);
                else
                {
                    //alert("Affichage des actions pour " +listesActions[i]['nomAction']);
                    genereContenu('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+')">'+listesActions[i]['nomAction']+'</button>','objet');
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
    document.getElementById('objet').innerHTML = "";
    for(var i=0;i < tabActions.length;i++)
    {	
        genereContenu('span','<button type="button" onclick="">'+tabActions[i]+'</button>','objet');
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