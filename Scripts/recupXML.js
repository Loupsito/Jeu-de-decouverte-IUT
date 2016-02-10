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
    xhrItem.open('GET','XML/LesItems.xml',false);
    xhrItem.send(null);

    //-----------------------------RECUPERATION SCENE-----------------------------
    xhrScenes=createRequest();
    if(xhrScenes===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrScenes.onreadystatechange=recupFromXMLDataBaseScenes;
    xhrScenes.open('GET','XML/LesScenes.xml',false);
    xhrScenes.send(null);

    //-----------------------------RECUPERATION LIEN-----------------------------
    xhrLiens=createRequest();
    if(xhrLiens===null){
            alert("echec de la creation d'une requete");
            return;
    }
    xhrLiens.onreadystatechange=recupFromXMLDataBaseLiens;
    xhrLiens.open('GET','XML/LesLiens.xml',false);
    xhrLiens.send(null);

    //-----------------------------RECUPERATION ACTIONS-----------------------------
    xhrActions=createRequest();
    if(xhrActions===null){
        alert("echec de la creation d'une requete");
        return;
    }
    xhrActions.onreadystatechange=recupFromXMLDataBaseActions;
    xhrActions.open('GET','XML/actions.xml',false);
    xhrActions.send(null);
    //------------------------------------------------------------------------------     
    
    indicationChargement();
    
    //Analyse les items a true et les places dans l'inventaire si c'est le cas
        premiereAnalyseInventaire();	
    //gerere le contenu du jeu        
        fonctionGeneratricePrincipale();
    //affiche le nom de la première scène
       //afficheNomScene("EXTERIEUR",'blocNomScene1','nomScene','textNomScene');
        
    dialogue("Vous etes sur le jeu de decouverte de l'IUT de velizy Villacoublay. Bon jeu !","dial");            
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

