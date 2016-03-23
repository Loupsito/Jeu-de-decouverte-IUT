/*
var chapitre1={"chapitre" :1,"objectifs":[["(verifPossessionItem('brosse') === true)","Obtenir la brosse"],["(verifPossessionItem('stylo') === true)","Obtenir le stylo"]]};
var chapitre2={"chapitre" :2,"objectifs":[["(verifPossessionItem('cleI21') === true)","Obtenir la cle I21"],["(listeCases[6][3]==='images/4-G23Tableau(ecrit).jpg')","Ecrire sur le tableau"]]};
var chapitre3={"chapitre" :3,"objectifs":[["(verifPossessionItem('stylo') === true)","Obtenir le stylo"],["(verifPossessionItem('brosse') === true)","Obtenir la brosse"],["(verifPossessionItem('cleI21') === true)","Obtenir la cle I21"]]};
var tabDeTousLesChapitre= new Array(chapitre1,chapitre2,chapitre3);
*/

var objectifCourant;

var tabDeTousLesChapitre;

function verifieProgression(chapitreCourant)
{    
    affichageAgenda(chapitreCourant);
    var objectifsNonRemplie=0;
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {
        if (tabDeTousLesChapitre[i]["chapitre"] == chapitreCourant)
        {                      
            for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
            {                      
                /*if((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===false)
                    objectifsNonRemplie+=1;*/
                if((eval(tabDeTousLesChapitre[i]["objectifs"][j][2]))===objectifCourant)
                {
                    if((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===false)
                    {
                        objectifsNonRemplie+=1;                     
                    }
                    else
                        objectifCourant+=1;
                   
                    break;
                }
            }

            if ((objectifsNonRemplie===0) && (objectifCourant == tabDeTousLesChapitre[i]["objectifs"].length))
            {                
                if(progression<tabDeTousLesChapitre.length)
                {
                    objectifCourant=0;
                    progression+=1;
                    zoneAntiClic("6","antiClicTransition","0.4");                    
                    setTimeout(function(){
                        //Nettoyage
                        NettoyageCaseInventaire();
                        NettoyageComplet();                
                        tabDeTousLesItems=[null,null];
                        listeCases=[];
                        listeLiens=[];
                        listesActions=[];   
                        chapitreTermine();
                        boutonChapitreSuivant();
                        initpage();                             
                    }, 2000); 
                }
                else
                {                    
                    zoneAntiClic("6","antiClicTransition","0.4");                    
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
            break;
        }
    }
    affichageAgenda(chapitreCourant);
}

function chapitreTermine()
{
    $("#texteTransition").empty();
    $("#texteTransition").append("<h1>Chapitre Terminé</h1>");
    $("#panneauTransition").fadeIn("3000");
     setTimeout(function(){                         
        genereContenuID("div","Voici le mot de passe du chapitre "+(progression-1)+" : <br/><strong>"+Angoka(progression-1)+"</strong><br/><br/>Recopiez-le la prochaine fois dans <strong>Charger partie</strong><br/> si vous souhaitez revenir à ce chapitre.<br/>","texteTransition","MessageMdp");
        $('#MessageMdp').fadeIn("slow").animate({"margin-top": 35}, "slow");
    }, 2000);    
}

function boutonChapitreSuivant()
{
    setTimeout(function(){ 
        genereContenuID("div","Passer au chapitre suivant","panneauTransition","boutonChapSuivant");
        $("#boutonChapSuivant").css('background-color','#E1E1E1').css('color','#4C4C4C').css('width','180px').css('text-align','center').css('border-radius','2px').css('margin-top','30px').css('margin-left','450px');
        $("#boutonChapSuivant").hover(function() {
            $("#boutonChapSuivant").css('background-color','#4C4C4C').css('color','#E1E1E1').css('cursor','pointer');            
        });
        $("#boutonChapSuivant").mouseleave(function() {
            $("#boutonChapSuivant").css('background-color','#E1E1E1').css('color','#4C4C4C');
        });
        $("#boutonChapSuivant").click(function() {   
            removeElementById("boutonChapSuivant");
            transitionChapitre("Chapitre "+progression);
            setTimeout(function() {                                               
                fonctionGeneratricePrincipale();                            
            }, 2000);
        });
    }, 4000); 
}

function pasuwado(mdp)
{
    var message="";
    var error=0;
    var chiffres="0123456789";
    var tab = new Array();
    
    for(var i=0;i<mdp.length;i++)
    {
        tab[i]=mdp.charAt(i);
    }
    for(var i=0;i<tab.length;i++)
    {       
       // alert(tab[i]);
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
        else if((tab[i] !=="f")&&(tab[i] !=="d")&&(tab[i] !=="a")&&(tab[i] !=="m"))
        {
            var valeurTrouve=false;
            for(var j=0;j<chiffres.length;j++)
            {    
                if(tab[i]==chiffres.charAt(j))
                {
                    message+=tab[i];
                    valeurTrouve=true;
                    break;
                }                
            }
            if(valeurTrouve===false)   
                error+=1;
        }               
    }    
    if(error===0&&(message.length===11))
    {
        var resultat = eval(message);
        if((resultat==1)||(resultat==2)||(resultat==3))
            return resultat;
        else
        {
            msgErreurMdp();
            return false;   
        }
    }
    else
    {
        msgErreurMdp();
        return false;   
    }
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
        genereContenuID("div","Objectif<hr/>","panneauAgenda","titreAgenda");

    //Affichage dynamique des objectifs
    for(var i=0;i<tabDeTousLesChapitre.length;i++)
    {   	
        if (tabDeTousLesChapitre[i]["chapitre"] == chapitreCourant)       
        {
			//alert(tabDeTousLesChapitre[i]["chapitre"] +"=="+ chapitreCourant);
            for(var j=0;j<tabDeTousLesChapitre[i]["objectifs"].length;j++)
            {                      
                /*if((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===false)
                    objectifsNonRemplie+=1;*/
               
			   //alert((eval(tabDeTousLesChapitre[i]["objectifs"][j][2]))+"==="+objectifCourant);
                if((eval(tabDeTousLesChapitre[i]["objectifs"][j][2]))===objectifCourant)
                { 
                    $('#position').append(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, "")+" : "+(eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))+" objectiCourant : "+objectifCourant+"<br/>");
                    var tab= document.querySelectorAll('#panneauAgenda span');               
                    //Si on est au tout premier objectif
                    if(tab.length<1){
                        genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
						//alert("creation");
						}
                    //Si on est pas au dernier objectif
                    if(j+1<tabDeTousLesChapitre[i]["objectifs"].length)
                     {
                        if(tab.length<1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                        {   
							//alert("creation");						
                            genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j+1][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j+1][1].replace(/ /g, ""));                
                            element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                   
                            if(element)
                            {
                                //element.style.color="green";                    
                                removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                            }
                        }
                        if(tab.length>1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                        {
							//alert("creation");
                            genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j+1][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j+1][1].replace(/ /g, ""));
                            element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));                   
                            if(element)
                            {
                                //element.style.color="green";
                                removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                            }
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
                        {
                            //element.style.color="green";
                            removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                        }
                    }
                    break;
                }
            }
        }

    }         

}
