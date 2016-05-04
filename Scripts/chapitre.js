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
                    break;
                }
            }
            
            //alert(objectifCourant +" == "+ tabDeTousLesChapitre[i]["objectifs"].length);
            if ((objectifsNonRemplie===0) && (objectifCourant == tabDeTousLesChapitre[i]["objectifs"].length-1))
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
                    var tabGenerique = [
                        "<h4>Réalisé dans le cadre des projets tuteurés de 2015/2016</h4><br/><br/>"+"<h2>"+"Client / Tuteur :<br/>"+"</h2><h3>"+"M. David Auger<br/></h3>",
                        "<h1>Réalisé par</h1><br/>"+"<h3>"+"Alexandre Suy<br/>"+"Harold Basa<br/>"+"Nicolas Taupin<br/>"+"Romain Bidault"+"</h3>",
                        "<h2>Chef de projet</h2><br/>"+"<h3>"+"Alexandre Suy<br/>"+"</h3>",
                        "<h2>Programmation</h2><br/>"+"<h3>"+"Alexandre Suy<br/>"+"Harold Basa<br/>"+"Romain Bidault<br/>"+"</h3>",
                        "<h2>Conception</h2><br/>"+"<h3>"+"Alexandre Suy<br/>"+"Harold Basa<br/>"+"Nicolas Taupin<br/>"+"</h3>",
                        "<h2>Scénario</h2><br/>"+"<h3>"+"Nicolas Taupin<br/>"+"</h3>",
                        "<h2>Musiques et sons</h2><br/>"+"<h3>"+"Harold Basa<br/>"+"</h3>",
                        "<h1>Remerciements</h1><br/>",
                        "<h2>Personnages 1/3</h2><br/>"+"<h3>"+"Geronimo : David Auger<br/>"+"Margaux : Julie Ausseil<br/>"+"Boti : Emanuelle Barbot<br/>"+"</h3>",
                        "<h2>Personnages 2/3</h2><br/>"+"<h3>"+"Hingo : Fabrice Hoguin<br/>"+"Jean : Adrien Loupforest<br/>"+"Marteau : Yves Martel<br/>"+"</h3>",
                        "<h2>Personnages 3/3</h2><br/>"+"<h3>"+"Bastien : Kevin Ostyn<br/>"+"Frederic : Baptiste Rouxel<br/>"+"Roger : Paul Vilard<br/>"+"</h3>",
                        "<h2>Testeurs</h2><br/>"+"<h3>"+"David Auger<br/>"+"Inès Suy<br/>"+"Santos Suy<br/>"+"Denis Taupin<br/>"+"Gregory Verrier<br/>"+"</h3>",
                        "<h1>"+"Merci d'avoir joué à notre Jeu !"+"</h1>"+"<br/><h2>L'equipe du jeu</h2>"
                    ];                   
                    
                    zoneAntiClic("6","antiClicTransition","0.4");
                    
                    for(var i=0, l = tabGenerique.length; i< l ; i++) 
                    {           
                        (function(i) {           
                            timer = setTimeout(function(){
                                document.getElementById("panneauTransition").style.display="block";
                                styleTexte=document.getElementById("texteTransition");
                                styleTexte.innerHTML=tabGenerique[i];                            
                            }, duree= i*3000);
                        }(i));         
                    }                                           
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
    
    if(progression===1)
    {
        setTimeout(function(){                         
           genereContenuID("div","Bien joué ! Vous avez terminer le Premier chapitre ! <br/> :)","texteTransition","MessageMdp");
           $('#MessageMdp').fadeIn("slow").animate({"margin-top": 35}, "slow");
       }, 2000);       
    }
    else
    {
        setTimeout(function(){                         
           genereContenuID("div","Voici le mot de passe du chapitre "+(progression)+" : <br/><strong>"+Angoka(progression)+"</strong><br/><br/>Recopiez-le la prochaine fois dans <strong>Charger partie</strong><br/> si vous souhaitez revenir à ce chapitre.<br/>","texteTransition","MessageMdp");
           $('#MessageMdp').fadeIn("slow").animate({"margin-top": 35}, "slow");
       }, 2000);       
    }     
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
    if(mdp ==="lol")
        return 2;
    else if (mdp ==="wof")
        return 3; 
    else
    {
        msgErreurMdp();
        return false;   
    }
}

function Angoka(courant)
{   
    if(courant === 2)
        message= "lol";
    else if (courant ===3)
        message ="wof"; 
    
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
                            objectifCourant+=1;
                            if(element)
                                removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                        }
                        if(tab.length>1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                        {
                            genereContenuID("span",tabDeTousLesChapitre[i]["objectifs"][j+1][1]+"<br/>","panneauAgenda",tabDeTousLesChapitre[i]["objectifs"][j+1][1].replace(/ /g, ""));
                            element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));            
                            objectifCourant+=1;
                            if(element)
                                removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                        }           
                        if(tab.length>=3)
                            stylePanneau.style.height=(tab.length*10)+100+"px";
                    }                
                    //Quand on arrive au dernier objectif
                    if(tab.length>1&&((eval(tabDeTousLesChapitre[i]["objectifs"][j][0]))===true))
                    {                 
                        element = document.getElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, "")); 
                        objectifCourant+=1;
                        if(element)
                            removeElementById(tabDeTousLesChapitre[i]["objectifs"][j][1].replace(/ /g, ""));
                    }
                    break;                    
                }
            }
        }

    }         

}
