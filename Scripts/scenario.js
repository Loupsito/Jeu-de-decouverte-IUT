/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
var scenario1={"localisation":1,"texte":"Texte de la premiere partie du scenario","asEteVu":false};
var scenario2={"localisation":7,"texte":"Texte de la deuxieme partie du scenario","asEteVu":false};
var scenario3={"localisation":2,"texte":"Texte de la troisieme partie du scenario","asEteVu":false};

var tabScenario = new Array(scenario1,scenario2,scenario3);
*/
var divTexte;
var divTexte2;
var tabScenario;

function placementScenario(positionCourant)
{
    for(var i=0;i<tabScenario.length;i++)
    {       
        var booleenAsEteVu;
        
        if(tabScenario[i]["asEteVu"]=="false")
            booleenAsEteVu=false;
        else
            booleenAsEteVu=true;
        
        if((tabScenario[i]["localisation"]==positionCourant) && (booleenAsEteVu===false))
        {     
            if( tabScenario[i]["choix"] =="dialogue")
            {
                afficherBoiteDialogue();
                dialogue(tabScenario[i]["texte"].toString(),"texteScenario",divTexte, divTexte2,"dialogueScenar","","","");
                tabScenario[i]["asEteVu"]=true;
            }
            else if(tabScenario[i]["choix"]=="narration")
            {
                panneauNarration(tabScenario[i]["texte"].toString());
                tabScenario[i]["asEteVu"]=true;
            }
            break;
        }
    }
}


function panneauNarration(texte)
{    
    zoneAntiClic(14,"antiClicNarration",0);
    
    LePanneauNarration = document.createElement("div");                
    LePanneauNarration.id="narration";    
    LePanneauNarration.style.width=80+'%';
    LePanneauNarration.style.height=80+'%';
    LePanneauNarration.style.top =40+'px';
    LePanneauNarration.style.left =0+'px';
    LePanneauNarration.style.right =0+'px';
    LePanneauNarration.style.position ='absolute';    
    LePanneauNarration.style.margin="0 auto"; 
    LePanneauNarration.style.zIndex = 15; 
    LePanneauNarration.style.backgroundColor="rgba(0, 0, 0, 0.5)";
    document.getElementById("ecran").appendChild(LePanneauNarration);           
    genereContenuID("div","","narration","texteNarration");
    $("#narration").css("border-radius","4px").css("border","2px solid white ").hide().fadeIn();
    
    $("#texteNarration").css("color","white").css("padding","10px");
    $("#texteNarration").empty();
    $("#texteNarration").append(texte).hide();;
    $("#texteNarration").fadeIn(2000);
    
    genereContenuID("div","Passer","narration","boutonPasser");
    $("#boutonPasser").css("background-color","#E1E1E1").css("width","100px").css("right","20px").css("position","absolute").css('text-align','center').css("border-radius","2px");
    $("#boutonPasser").mouseover(function() {
                $("#boutonPasser").css("background-color","#515151").css("cursor","pointer");
    });
    $("#boutonPasser").mouseout(function() {
                $("#boutonPasser").css("background-color","#E1E1E1");
    });
    $("#boutonPasser").click(function() {
               $("#narration").remove();
               $("#antiClicNarration").remove();
    });           
}



