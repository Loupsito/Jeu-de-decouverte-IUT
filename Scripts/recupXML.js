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

var tabPNJ=[];
//tableau qui repertorie tous les chapitres
var tabDeTousLesChapitre =[];

var progression = 1;

var tabScenario = new Array();
//tableau qui repertorie tous les pnjs

//transitionChapitre("Chapitre  "+progression);
barreDeSaisie("accueil");
clavier("accueil");
cliquerBouton("commencer");
cliquerBouton("continuer");

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
    xhrItem.open('GET','XML/chapitre'+progression+'/LesItems.xml',false);
    xhrItem.send(null);

    //-----------------------------RECUPERATION SCENE-----------------------------
    xhrScenes=createRequest();
    if(xhrScenes===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrScenes.onreadystatechange=recupFromXMLDataBaseScenes;
    xhrScenes.open('GET','XML/chapitre'+progression+'/LesScenes.xml',false);
    xhrScenes.send(null);

    //-----------------------------RECUPERATION LIEN-----------------------------
    xhrLiens=createRequest();
    if(xhrLiens===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrLiens.onreadystatechange=recupFromXMLDataBaseLiens;
    xhrLiens.open('GET','XML/chapitre'+progression+'/LesLiens.xml',false);
    xhrLiens.send(null);

    //-----------------------------RECUPERATION ACTIONS-----------------------------
    xhrActions=createRequest();
    if(xhrActions===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrActions.onreadystatechange=recupFromXMLDataBaseActions;
    xhrActions.open('GET','XML/chapitre'+progression+'/actions.xml',false);    
    xhrActions.send(null);
    
    //-----------------------------RECUPERATION PNJ-----------------------------
    xhrPnj=createRequest();
    if(xhrPnj===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrPnj.onreadystatechange=recupFromXMLDataBasePnj;
    xhrPnj.open('GET','XML/chapitre'+progression+'/LesPNJ.xml',false);
    xhrPnj.send(null);
    
    //----------------------------------------------------------------------------
 
     //-----------------------------RECUPERATION CHAPITRES------------------------
    xhrChapitre=createRequest();
    if(xhrChapitre===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrChapitre.onreadystatechange=recupFromXMLDataBaseChapitre;
    xhrChapitre.open('GET','XML/LesChapitres.xml',false);
    xhrChapitre.send(null);
    //----------------------------------------------------------------------------     
    
    //-----------------------------RECUPERATION SCENARIO--------------------------
    
    xhrScenario=createRequest();
    if(xhrScenario===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrScenario.onreadystatechange=recupFromXMLScenario;
    xhrScenario.open('GET','XML/chapitre'+progression+'/LesScenarios.xml',false);
    xhrScenario.send(null);
    
    //----------------------------------------------------------------------------        
    
    //----------------------------------------------------------------------------
    
    //Chargement de la position du joueur indique par le XML
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        if (tabDeTousLesChapitre[i]["chapitre"] == progression)
            joueur.idSalle=parseInt(tabDeTousLesChapitre[i][2]);
    }
    
    //Supprime la zoneAntiClic qui a ete cree lors de la transisiton chapitre
    if(document.getElementById("antiClicTransition"))
        removeElementById("antiClicTransition");
    //Va servir a precharge les images du jeu
        indicationChargement();    
    //Analyse les items a true et les places dans l'inventaire si c'est le cas
        premiereAnalyseInventaire();           
               
    //affiche le nom de la première scène
    //afficheNomScene("EXTERIEUR",'blocNomScene1','nomScene','textNomScene');                      
    //------------------------------------------------------------------------------
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
                        tabTabActions.push((tabActions[z].textContent));
                }              
                tabTabInfos=[tabTabActions,tabDesc[i].firstChild.nodeValue,image[i].getAttribute("lienimage"),eval(tabPoss[i].firstChild.nodeValue),tabCoordonnees];                
                tabDeTousLesItems[i]=[tabItem[i].getAttribute("nom"),tabTabInfos];              
            } 
        }
}
function recupFromXMLDataBasePnj()
{
        if (xhrPnj.readyState===4 && xhrPnj.status===200)
        {
            //rÃ©cupÃ©ration dans les xml//
            var tabPnj= xhrPnj.responseXML.getElementsByTagName("pnj");                 // recupÃ©ration des descriptions
            var tabPnjDialogues=xhrPnj.responseXML.getElementsByTagName("dialogue");    //rÃ©cupÃ©ration des dialogues
            var tabPnjTexte=xhrPnj.responseXML.getElementsByTagName("texte");           //rÃ©cupÃ©ration des textes
            var tabPnjPrerequis=xhrPnj.responseXML.getElementsByTagName("prerequis");   //rÃ©cupÃ©ration des prÃ©requis
            var tabPnjEtatFinal=xhrPnj.responseXML.getElementsByTagName("etatFinal");   //rÃ©cupÃ©ration des Etats finaux
            //---------------------------

            //variables utilisÃ©es dans la rÃ©cupÃ©ration
            var pnjNom;              //variable contenant le nom du pnj actuel
            var pnjLocalisation;     //variable contenant la localisation du pnj
            var pnjImage;            //variable contenant l'adresse de l'image du pnj
            var pnjDialDefault;      //variable contenant le dialogue par dÃ©faut du pnj
            var PnjnumDialogues;     //variable contenant le numero du dialogue
            var pnjTexte;            //variable contenant le texte du dialogue
            var pnjPrerequis;        //variable contenant le prerequis pour le dialogue suivant
            var pnjEtatFinal;        //variable contenant le prerequis pour le dialogue suivant
            var pnjNomFake;
            var pnjIdImage;
            //----------------------------------------


            //tableau de rÃ©cupÃ©ration des infos
            var tabInfoPnj=[null];
            tabInfoPnj.pop();
            //---------------------------------

            //pour le nombre de pnj
            for(var i=0;i<tabPnj.length;i++)
            {
				
                //attribution des attributs
                pnjNom=tabPnj[i].getAttribute("nom");
                pnjLocalisation= parseInt(tabPnj[i].getAttribute("localisation"));

                pnjImage=tabPnj[i].getAttribute("image");
                pnjDialDefault=tabPnj[i].getAttribute("numeroDialogueCourant");
                pnjIdImage=tabPnj[i].getAttribute("idImage");
                //-------------------------

                var tabDialogues=[null];
                tabDialogues.pop();
                a=0;
                //pour le nombre de dialogues
                for(var j=0;j<tabPnjDialogues.length;j++)
                {

                    //si l'id du dialogue est le nom du pnj
                    if(tabPnjDialogues[j].getAttribute("id")===pnjNom)
                    {
                        //attribution des informations sur les dialogues
    					PnjnumDialogues=tabPnjDialogues[j].getAttribute("numeroDialogue");
                        pnjNomFake=tabPnjDialogues[j].getAttribute("nomFake");
                        pnjTexte=tabPnjTexte[j].firstChild.nodeValue;
                        pnjPrerequis=tabPnjPrerequis[j].firstChild.nodeValue;
                        pnjEtatFinal= tabPnjEtatFinal[j].firstChild.nodeValue;
                        //alert(pnjPrerequis.toString());
                        //alert(pnjTexte.toString());
                        //alert(pnjnumDialogues.toString());
                        //----------------------------------------------
                        

                        //attribution au tableau des dialogues
                        tabDialogues[a]=[pnjTexte,pnjPrerequis,pnjEtatFinal,pnjNomFake];
                        a++;
                        //alert(tabDialogues[j].toString());
                        //-------------------------------------
                    }
                    //-------------------------------------
                }
                //---------------------------
    			tabInfoPnj[i]={"nom":pnjNom , "localisation" : pnjLocalisation, "image" : pnjImage, "numeroDialogueCourant" : pnjDialDefault, "dialogue" : tabDialogues, "idImage":pnjIdImage};

                //alert(tabInfoPnj[i]["dialogue"].toString());
            }
            tabPNJ=tabInfoPnj;
            //alert(tabPNJ[0]["dialogue"].toString());        
            //document.write(tabPNJ[0]["dialogue"]);
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
                    tabObjetbis.push(tabObjet[z].textContent);                                                        
            }

            if (tabObjetbis.length===0)                       
                tabScene=[parseInt(tabID[i].getAttribute("id")),tabID[i].getAttribute("nom"),,tabID[i].getAttribute("lienImage")];
            else
                tabScene=[parseInt(tabID[i].getAttribute("id")),tabID[i].getAttribute("nom"),tabObjetbis,tabID[i].getAttribute("lienImage")];

            listeCases.push(tabScene);
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
        var tabFleche= xhrLiens.responseXML.getElementsByTagName("fleche");

        for(p=0;p<tabID.length;p++)
        {
            var tabCoordonnees=[null];
            a=tabCoordonnees.shift();
            var tabX1=[tabX[p*2].textContent];
            var tabY1=[tabY[p*2].textContent];
            var tabX2=[tabX[p*2+1].textContent];
            var tabY2=[tabY[p*2+1].textContent];
            var tabFleche1=[tabFleche[p*2].textContent];
            var tabFleche2=[tabFleche[p*2+1].textContent];
            
            //alert(tabFleche1+"----"+tabFleche2);
            
            tabCoordonnees.push([parseInt(tabX1),parseInt(tabY1),tabFleche1]);
            tabCoordonnees.push([parseInt(tabX2),parseInt(tabY2),tabFleche2]);            
            tabLien=[parseInt(tabID[p].getAttribute("id1")),parseInt(tabID[p].getAttribute("id2")),eval(tabacces[p].textContent),tabCoordonnees];
            //alert(tabLien);
            listeLiens[p]=tabLien;
        }                
    }
    //alert(listeLiens+"||||||");
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
                    tabPrefinal.push((tabPrerequis[z].textContent).toString());                   
            }          
            tabActions["nomAction"]= new Array();
            tabActions["prerequis"]= new Array();
            tabActions["etatFinal"]= new Array();                               
            tabActions["nomAction"].push(id);            
            tabActions["prerequis"].push(tabPrefinal);
            tabActions["etatFinal"].push(tabEtatFinal[A].textContent);                                    
            listesActions[A]=tabActions;
        }                      
    }
}

function recupFromXMLDataBaseChapitre()
{
    if(xhrChapitre.readyState===4 && xhrChapitre.status===200)
    {
        var tabChapitre=xhrChapitre.responseXML.getElementsByTagName("chapitre");
        var tabObjectifs=xhrChapitre.responseXML.getElementsByTagName("objectif");
        var tabDescriptif=xhrChapitre.responseXML.getElementsByTagName("descriptif");            
        
        for(var i=0 ;i<tabChapitre.length;i++)
        {  
            var LesChapitres = new Array();
            LesChapitres.push("chapitre");
            LesChapitres.push("objectifs");
            LesChapitres["chapitre"]= new Array();
            LesChapitres["objectifs"]= new Array();
            
            
            //-----------Ajout du chapitre-----------            
            LesChapitres["chapitre"].push(tabChapitre[i].getAttribute("numero"));
            
            //----------Ajout des objectifs----------
            for(var j=0;j<tabObjectifs.length;j++)
            {                                 
                if(tabObjectifs[j].getAttribute("id")===(tabChapitre[i].getAttribute("numero")))
                {
                    LesChapitres["objectifs"].push(new Array(tabObjectifs[j].textContent,tabDescriptif[j].textContent));         
                }
            }            
            
            LesChapitres.push(tabChapitre[i].getAttribute("positionJoueur"));
            
            tabDeTousLesChapitre[i]=LesChapitres;
        }                
        
        //---------Test de conformite du contenu du tableau
        /*for(var k=0;k<tabDeTousLesChapitre.length;k++)
        {
            document.write(tabDeTousLesChapitre[k][2]+"<br/><br/>");           
        } */
        
    }
}

function recupFromXMLScenario()
{
    if(xhrScenario.readyState===4 && xhrScenario.status===200)
    {
         var tabScenarios=xhrScenario.responseXML.getElementsByTagName("scenario");
         var tabTexte=xhrScenario.responseXML.getElementsByTagName("texte");
         
         for(var i=0 ;i<tabScenarios.length;i++)
         {
             var LesScenarios = new Array();
            LesScenarios.push("localisation");
            LesScenarios.push("texte");
            LesScenarios.push("asEteVu");
            LesScenarios.push("choix");
            LesScenarios["localisation"]= new Array();
            LesScenarios["texte"]= new Array();
            LesScenarios["asEteVu"]= new Array();
            LesScenarios["choix"]= new Array();
            
            //---------------Ajout de la localisation---------------
            LesScenarios["localisation"].push(tabScenarios[i].getAttribute("localisation"));
            
            //----------Ajout du texte----------
            for(var j=0;j<tabTexte.length;j++)
            {                                 
                if(tabTexte[j].getAttribute("id")===(tabScenarios[i].getAttribute("localisation")))
                {
                    LesScenarios["texte"].push(tabTexte[j].textContent);         
                }
            }    
            
            //---------------Ajout du booleen asEteVu---------------
            LesScenarios["asEteVu"].push(tabScenarios[i].getAttribute("asEteVu"));
            
            //
            LesScenarios["choix"].push(tabScenarios[i].getAttribute("choix"));
            tabScenario[i]=LesScenarios;
         }
    }
}
