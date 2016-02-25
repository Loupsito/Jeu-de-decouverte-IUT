
var chapitre1={"chapitre" :1,"lienFichier":"chapitres/chapitre1/","objectifs":["(verifPossessionItem('brosse') === true)"]};
var chapitre2={"chapitre" :2,"lienFichier":"chapitres/chapitre2/","objectifs":["(verifPossessionItem('cleI21') === true)","(listeCases[6][3]==='images/4-G23Tableau(ecrit).jpg')"]};
var chapitre3={"chapitre" :3,"lienFichier":"chapitres/chapitre3/","objectifs":["(verifPossessionItem('stylo') === true)"]};



var tabDeTousLesChapitre= new Array(chapitre1,chapitre2,chapitre3);

var progression;

function verifieProgression(chapitreCourant)
{
    var objectifsNonRemplie=0;
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        if (tabDeTousLesChapitre[i]["chapitre"]===chapitreCourant)       
        {
            for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
            {                
                if(!(eval(tabDeTousLesChapitre[i]["objectifs"][j])))
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

/*
function affichageAgenda()
{
    panneau=document.createElement("div");
    panneau.id="panneauAgenda";
    document.getElementById('agenda').appendChild(panneau);
    
    stylePanneau=document.getElementById("panneauAgenda");
    stylePanneau.style.position = "absolute";
    stylePanneau.style.width="150px";
    stylePanneau.style.height="100px";
    stylePanneau.style.right="10px";
    stylePanneau.style.top="0px";
    stylePanneau.style.backgroundColor="#C6C6C6";    
}

*/