//---------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------MULTIMEDIA-------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

//Tableau qui repertorie tous les items
var tabDeTousLesItems;

//Tableau qui repertorie toutes les scenes
var listeCases;

//Tableau qui repertorie tous les liens entre les salles
var listeLiens;

//Tableau qui repertorie toutes les actions
var listesActions;

var joueur;
//Ces trois variables serviront pour la gestion des dialogues
var divTexte;
var divTexte2;
//antiClic Provisoire pour le cas où le joueur souhaite passer le dialogue
var antiClicProv;
//servira à laisser éclairer l'img du pnj courant
var tampIdImages;

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
    myDiv.style.zIndex = "1"; 
    myDiv.style.opacity = "0.75"; 
    myDiv.onmouseover = function(){myDiv.style.opacity = "1";};
    myDiv.onmouseout = function(){myDiv.style.opacity = "0.75";};
    
    var x; var y;
    
    //Choix de quel face prendre
    if (joueur.idSalle === listeLiens[i][0])
    {
        x = listeLiens[i][3][0][0];
        y = listeLiens[i][3][0][1];
        myDiv.style.background = "url('"+listeLiens[i][3][0][2]+"')";
        myDiv.style.backgroundSize="contain";
        myDiv.style.backgroundRepeat = "no-repeat";
    }
    else if (joueur.idSalle === listeLiens[i][1])
    {
        x = listeLiens[i][3][1][0];
        y = listeLiens[i][3][1][1];
        myDiv.style.background = "url('"+listeLiens[i][3][1][2]+"') repeat-x center";
        myDiv.style.backgroundSize="contain";
        myDiv.style.backgroundRepeat = "no-repeat";
    }
    myDiv.style.top =y+'px';
    myDiv.style.left =x+'px';
    //myDiv.style.backgroundColor="rgba(225,225,225, 0.7)";    
    myDiv.addEventListener("click", function(){
        avancer(listeCases[j][0],listeLiens[i][0],listeLiens[i][1]);        
    });
    myDiv.addEventListener("mouseover", function(){
        myDiv.style.cursor = "pointer";
    });
    myDiv.addEventListener("mouseout", function(){
        //myDiv.style.backgroundColor='#E1E1E1';
    });
}

/* 
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

    var x; var y;
    for (var i = 0; i<tabDeTousLesItems.length;i++)
    {
        if (tabDeTousLesItems[i][0] === leItem)
        {
            x= tabDeTousLesItems[i][1][4][0];
            y= tabDeTousLesItems[i][1][4][1];
                
            myDiv.style.backgroundImage = "url('"+tabDeTousLesItems[i][1][2]+"')";
            myDiv.addEventListener("mouseover", function(){ bulleInfosItem(x,y,leItem,"creation");myDiv.style.cursor = "pointer";});
            myDiv.addEventListener("mouseout", function(){ bulleInfosItem(x,y,leItem,"suppression");});
        }    
    }
    myDiv.style.top =y+'px';
    myDiv.style.left =x+'px';
    myDiv.style.backgroundSize="contain";
    myDiv.style.backgroundRepeat = "no-repeat";
    myDiv.addEventListener("click", function(){
        bulleInfosItem(x,y,leItem,"suppression");
        selectionObjet(leItem);        
    });
}

/*
 * @param {number} x - coordonnee en abscisse de l'item
 * @param {number} y - coordonnee en ordonnee de l'item
 * @param {string} leItem - represente la hitbox de l'item
 * @param {string} choix - represente quel action va etre fait sur la bulle info ou quelle type de bulle on veut
 */
function bulleInfosItem(x,y,leItem,choix)
{        
   genereContenuID("div","","msgDescription","description");
   for (var i = 0; i<tabDeTousLesItems.length;i++)
    {
        if (tabDeTousLesItems[i][0] === leItem)
        {
            //Informations apparaissant dans la boite de dialogue si l'item est dans l'inventaire
            if (verifPossessionItem(leItem)===true && choix ==="creation")
            {
                afficherBoiteDialogue();
                document.getElementById('description').innerHTML = tabDeTousLesItems[i][1][1];
                break;
            }
            else if(verifPossessionItem(leItem)===true && choix ==="suppression")
            {
                document.getElementById('description').innerHTML = "";
                $("#msgDescription").empty();
                cacherBoiteDialogue();
                break;
            }
            //Informations apparaissant dans une bulle au dessus del'item si celui-ci est dans la salle
            else
            {              
                if (choix ==="creation")
                {
                    if (!(document.getElementById("bulleItem"+i)))
                    {
                        genereContenuID('span',tabDeTousLesItems[i][1][1],'ecran',"bulleItem"+i);
                        var myDiv = document.getElementById("bulleItem"+i);
                        myDiv.style.position ='absolute';
                        myDiv.style.backgroundColor='black';
                        myDiv.style.color='white';
                        myDiv.style.borderRadius ='2px';
                        myDiv.style.top = y - 20 +"px";
                        myDiv.style.left = x - 40 +"px";
                        myDiv.style.fontSize="11px";
                        myDiv.style.opacity="0.7";
                    }
                    break;
                }
                else if (choix ==="suppression")
                {
                   var myDiv = document.getElementById("bulleItem"+i);
                   if(myDiv)
                   {
                       myDiv.parentNode.removeChild(myDiv);
                       break;
                   }                   
                }
                break;
            }
            break;
        }
    }
}
/*
 *  @param {string} id - correspond a l'id de la div a cacher 
 */
function afficherCacher(id) 
{
    if(document.getElementById("antiClic2"))
        removeElementById("antiClic2");
    
    var div = document.getElementById(id); 
    if(div.style.display==="none" || div.style.display==="")          // Si la division est cache
    {
        div.style.display = "block";                
        zoneAntiClic("2","antiClic2","0.4");
    }
   else // Si la division est visible
   {
        div.style.display = "none";
        removeElementById("antiClic2");
   }
}

/* 
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

function afficheInfoBulleMenu(contenu)
{
    genereContenuID('div','','blocInfoBulle','infoBulleMenu');   
    var blocNoir = document.getElementById('infoBulleMenu');    
    document.getElementById('infoBulleMenu').style.display='block';  
    blocNoir.style.position="absolute";
    blocNoir.style.color ="#FFFFFF";
    blocNoir.style.textAlign="center"; 
    blocNoir.style.border=0; 
    blocNoir.style.marginTop=55.8+"%";
    blocNoir.style.borderLeft=25+"px solid transparent";
    blocNoir.style.borderBottom=25+"px solid #000000";
    blocNoir.style.borderOpacity=80+"%";
    blocNoir.style.left = 78.4+"%";
    blocNoir.style.width= 120+"px"; 
    genereContenuID('span','','infoBulleMenu','textInfoBulle');
    var nomInfoBulle = document.getElementById('textInfoBulle');
    document.getElementById('textInfoBulle').innerHTML = contenu;
    nomInfoBulle.style.position="absolute";
    nomInfoBulle.style.marginLeft=-46+"px";
    nomInfoBulle.style.marginTop=2+"px";
}

//masque l'infobulle des boutons du menu
function masqueInfoBulleMenu() 
{
    document.getElementById('infoBulleMenu').style.display='none';  
}

function afficheNomScene(contenu, idPrincipale, idScene, idTextScene)
{   
    genereContenuID('div','',idPrincipale,idScene);
    genereContenuID('p','',idScene,idTextScene);
    var myDiv = document.getElementById(idScene);
    var myText = document.getElementById(idTextScene);
    myDiv.style.width=120+"px";
    myDiv.style.height=30+"px";
    myDiv.style.color="white";
    myDiv.style.borderRight=50+"px solid transparent";
    myDiv.style.borderTop=35+"px solid black";
    myDiv.style.marginLeft = 100+"%";   
    document.getElementById(idTextScene).innerHTML = contenu; 
    myText.style.padding=0;
    myText.style.textAlign="center";
    myText.style.marginTop = -25+"px";
}
function convertiNomScene(tabCase)
{
    if (tabCase.substring(0, 3) === "bas") nomDeScene = "BATIMENT BASTIE";
    else if (tabCase.substring(0, 3) === "G25") nomDeScene = "G25";
    else if (tabCase.substring(0, 3) === "G23") nomDeScene = "G23";
    else if (tabCase.substring(0, 3) === "I21") nomDeScene = "I21";
    else if (tabCase.substring(0, 3) === "amp") nomDeScene = "AMPHI A";
    else if (tabCase.substring(0, 3) === "316") nomDeScene = "316";
    else if (tabCase.substring(0, 3) === "ext") nomDeScene = "EXTERIEUR";
    else if (tabCase.substring(0, 3) === "sai") nomDeScene = "SAINT EXUPERY";
    else if (tabCase.substring(0, 3) === "mer") nomDeScene = "MERMOZ";
}
var timing,timing2;
function genererNotification(msg)
{
    if ($("#notification").length)
        removeElementById("notification");
    clearTimeout(timing);
    clearTimeout(timing2);
    genereContenuID("div","","ecran","notification");
    var notification = document.getElementById("notification");
    notification.style.display = "none";
    notification.style.width = 35+"%";
    notification.style.height = "auto";
    notification.style.padding = 5+"px";
    notification.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    notification.style.position ='absolute';   
    notification.style.left =0+'px';
    notification.style.right =0+'px';
    notification.style.margin="0 auto"; 
    notification.style.zIndex = "51"; 
    notification.style.textAlign = "center";
    notification.style.color ="white";
    notification.style.border = "1px solid #BDBDBD";
    notification.style.fontFamily = 'century gothic';
    notification.style.fontSize= 12+'px';
    notification.innerHTML = msg;
    
    $("#notification").fadeIn(500);   
    timing = setTimeout(function() {
        $("#notification").fadeOut("slow");
    },2500);  
    timing2 = setTimeout(function() {
        removeElementById("notification");
    },3500);      
}
/*
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
 * @param {boolean} boolean - variable globale musique
 */
//jouer la musique
function jouerMusique(boolean)
{  
    if (boolean === false || $("#music").length)
        //supprime l'element audio
        removeElementById("spanMusic");
    else if (boolean === true)
        //créé l'element audio
        genereContenuID('span','<audio id="music" src="sons/hello.mp3" controls preload="auto" autoplay="autoplay" style="display:none" loop="loop"></audio>','menu',"spanMusic");
}

//désactive la musique
function couperJouerMusique()
{
    if(musique === true)
        musique = false;
    else
        musique = true;
}
function afficherBoiteDialogue()
{
	var boite = document.getElementById("dialogue");
	boite.style.display = 'block';
}
function cacherBoiteDialogue()
{    
    var boite = document.getElementById("dialogue");
    var count1 = ($('#msgDescription').contents().length);
    var count2 = ($('#msgDialogue').contents().length);
        
        $('#msgDescription').empty();    
    
    //if (!(count1 >= 1)&& !(count2 >= 1)&& !(count3 >= 1)&& !(count4 >= 1))
    if ((count1 === 0)&&(count2 === 0))
    {
        boite.style.display = 'none';      
    }
    else
        return;
}
function creationDialogue(iddd,divTexte)
{
    //Creation de la div msgDialogue dans la div dialogue
    genereContenuID("div","","dialogue","msgDialogue");
    
    //Creation de la div qui contient le texte de dialogue
    genereContenuID("div","","msgDialogue",iddd);
    divTexte = document.getElementById(iddd);
    divTexte.style.marginLeft =10+'px';
    divTexte.style.marginRight =10+'px';    
    
    return divTexte;
}
function dialogue(texte,iddd,divTexte1,divTexte2,typeDeDialogue,idImages,nomFake,tabEtat)
{     
    if (!$("#antiClic").length)
        zoneAntiClic("6","antiClic",'0.4');  
    
    //création des div dialogues
    divTexte1 = creationDialogue(iddd,divTexte1);
              
    //texte complet tampon;
    toutLeTexte = texte;
    
    clearTimeout(timer);
    
    //tampon id images => Pour garder l'img du pnj courant éclairé
    tampIdImages=idImages;
    
    var timer = setTimeout(function() {
        $("#"+iddd).hide();
        divTexte1.innerHTML = toutLeTexte;   
        
        /*if ($("#msgDialogue").length)
            genereContenuID("span","",iddd,"fleche");*/
        $("#"+iddd).fadeIn(200);
    },0);   
    $('#antiClic').click(function () {   
        if (typeDeDialogue === "dialogueEnchaine")
        {
            removeElementById("msgDialogue");  
            testDialogue(idImages);
            changementEtat(tabEtat);
            if (tampIdImages!==idImages)
                initEtatImg(idImages); 
        }
        else if (typeDeDialogue !== "dialogueEnchaine")
        {
            if (typeDeDialogue !== "dialogueScenar")
                initEtatImg(idImages);    
            removeElementById("fond");
            removeElementById("msgDialogue");          
            removeElementById("antiClic"); 
            removeElementById("nomPNJ");
            cacherBoiteDialogue();
            changementEtat(tabEtat);
        }   
    });
    //cacherBoiteDialogue();
}
function zoneAntiClic(priorite,sonId,opacity)
{
    //Creation de la zone antiClic
    divAnticlic = document.createElement("div");                
    divAnticlic.id=sonId;
    divAnticlic.style.width=100+'%';
    divAnticlic.style.height=100+'%';
    divAnticlic.style.top =0+'px';
    divAnticlic.style.left =0+'px';
    divAnticlic.style.position ='absolute';    
    divAnticlic.style.opacity=opacity;
    divAnticlic.style.zIndex = priorite; 
    divAnticlic.style.backgroundColor='black';
    document.getElementById("ecran").appendChild(divAnticlic);   
}
function changeCursor(idElement,cursor)
{
    $("#"+idElement).css("cursor",cursor);
}