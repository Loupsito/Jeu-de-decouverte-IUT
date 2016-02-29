
var chapitre1={"chapitre" :1,"lienFichier":"chapitres/chapitre1/","objectifs":[["(verifPossessionItem('brosse') === true)","Obtenir la brosse"],["(verifPossessionItem('stylo') === true)","Obtenir le stylo"]]};
var chapitre2={"chapitre" :2,"lienFichier":"chapitres/chapitre2/","objectifs":[["(verifPossessionItem('cleI21') === true)","Obtenir la cle I21"],["(listeCases[6][3]==='images/4-G23Tableau(ecrit).jpg')","Ecrire sur le tableau"]]};
var chapitre3={"chapitre" :3,"lienFichier":"chapitres/chapitre3/","objectifs":[["(verifPossessionItem('stylo') === true)","Obtenir le stylo"],["(verifPossessionItem('brosse') === true)","Obtenir la brosse"],["(verifPossessionItem('cleI21') === true)","Obtenir la cle I21"]]};



var tabDeTousLesChapitre= new Array(chapitre1,chapitre2,chapitre3);

var progression;

function verifieProgression(chapitreCourant)
{
    affichageAgenda(chapitreCourant);
    var objectifsNonRemplie=0;
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        if (tabDeTousLesChapitre[i]["chapitre"]===chapitreCourant)       
        {
            for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
            {                
                if((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===false)
                    objectifsNonRemplie+=1;                     
            }
            if (objectifsNonRemplie===0)
            {                
                if(progression<tabDeTousLesChapitre.length)
                {
                    progression+=1;
                    zoneAntiClic("6","antiClicTransition");
                    setTimeout(function(){
                        //Nettoyage
                        NettoyageCaseInventaire();
                        NettoyageComplet();                
                        tabDeTousLesItems=[null,null];
                        listeCases=[];
                        listeLiens=[];
                        listesActions=[];   

                        transitionChapitre("Chapitre "+progression);
                        //----------------------------------------------------------------------
                        //----------------------------------------------------------------------
                                joueur.idSalle=0;//info a mettre dans une structure puis dans un XML
                        //----------------------------------------------------------------------
                        //----------------------------------------------------------------------
                        initpage();        
                    }, 2000); 
                }
                else
                {                    
                    zoneAntiClic("6","antiClicTransition");                    
                    setTimeout(function(){                         
                        transitionChapitre("Fin");
                    }, 2000);
                    setTimeout(function(){                         
                         document.getElementById("panneauTransition").style.display="block";
                         styleTexte=document.getElementById("texteTransition");
                         styleTexte.innerHTML="<h1>"+"Merci d'avoir jouer à notre Jeu !"+"</h1>";
                    }, 4500);                                        
                }                                                                                                       
            }
        }
    }
    affichageAgenda(chapitreCourant);
}

function pasuwado(mdp)
{
    var message="";
    var tab = new Array();
    
    for(var i=0;i<mdp.length;i++)
    {
        tab[i]=mdp.charAt(i);
    }
    for(var i=0;i<tab.length;i++)
    {       
        if((tab[i] ==="f")||(tab[i] ==="d")||(tab[i] ==="a")||(tab[i] ==="m"))
        {           
            if(tab[i] ==="f")
                 message+="*";
            if(tab[i] ==="d")
                 message+="/";
            if(tab[i] ==="a")
                message+="+";
            if(tab[i] ==="m")
                message+="-";            
        }
        else if((tab[i] !=="f")&&(tab[i] !=="d")&(tab[i] !=="a")&&(tab[i] !=="m"))
            message+=tab[i];
    }
    var resultat = eval(message);
    alert("Valeur = "+resultat);             
    return message;
}

function Angoka(courant)
{
    var tab = new Array("f","d","d","a","m","");    
    var tabIchi = new Array("7","8","4","7","4","5");
    var tabNi = new Array("5","6","3","2","3","6");
    var tabSan = new Array("7","6","2","3","2","6");    
    var tabTab = new Array(tabIchi,tabNi,tabSan);
    var message="";
    for(var i=0;i<6;i++)
    {
        message+=(tabTab[courant-1][i]+tab[i]);
    }
    alert(message);
    return message;
}
//---------TEST---------//
/*
pasuwado("7f8d4d7a4m5");//
pasuwado("5f6d3d2a3m6");//
pasuwado("7f6d2d3a2m6");//
Angoka(1);
Angoka(2);
Angoka(3);
*/
//----------------------//


function affichageAgenda(chapitreCourant)
{        
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
        {
            if(document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, "")))
                removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
        }
    }
    if(document.getElementById("panneauAgenda"))
         document.getElementById("panneauAgenda").style.height="100px";
    
    //Creation de la div 'panneauAgenda' si elle n'existe pas encore
    if(!document.getElementById("panneauAgenda"))
    {
        panneau=document.createElement("div");
        panneau.id="panneauAgenda";
        document.getElementById('agenda').appendChild(panneau);

        stylePanneau=document.getElementById("panneauAgenda");
        stylePanneau.style.position = "absolute";
        stylePanneau.style.width="150px";
        stylePanneau.style.height="100px";
        stylePanneau.style.right="10px";
        stylePanneau.style.top="10px";
        stylePanneau.style.paddingLeft="5px";
        stylePanneau.style.paddingRight="5px";
        stylePanneau.style.backgroundColor= "rgba(218, 162, 50, 0.65)";   //11, 11, 97, 0.65
        stylePanneau.style.color="black";    
        stylePanneau.style.float="right";     
    }
    //Ajout du Titre 'Agenda'
    if(!document.getElementById("titreAgenda"))
        genereContenuID("div","Agenda<hr/>","panneauAgenda","titreAgenda");
    
    //Affichage dynamique des objectifs
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        if (tabDeTousLesChapitre[i]["chapitre"]===chapitreCourant)       
        {
            for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
            {                                 
                var tab= document.querySelectorAll('#panneauAgenda span');               
                //Si on est au tout premier objectif
                if(tab.length<1)
                    genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                         
                //Si on est pas au dernier objectif
                if(j+1<tabDeTousLesChapitre[i]["objectifs"].length)
                 {
                    if(tab.length<1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                    {                   
                        genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j+1][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j+1][1].replace(/ /g, ""));                
                        element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                   
                        if(element)
                            element.style.color="green";                    
                    }
                    if(tab.length>1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                    {
                        genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j+1][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j+1][1].replace(/ /g, ""));
                        element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                   
                        if(element)
                            element.style.color="green";
                    }           
                    if(tab.length>=3)
                    {
                        stylePanneau.style.height=(tab.length*10)+100+"px";
                    }
                }                
                //Quand on arrive au dernier objectif
                if(tab.length>1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                {                        
                    element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                   
                    if(element)
                        element.style.color="green";
                }
            }
        }
    }         
}
