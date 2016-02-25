/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var scenario1={"localisation":1,"texte":"Texte de la premiere partie du scenario","asEteVu":false};
var scenario2={"localisation":2,"texte":"Texte de la deuxieme partie du scenario","asEteVu":false};
var scenario3={"localisation":3,"texte":"Texte de la troisieme partie du scenario","asEteVu":false};

var tabScenario = new Array(scenario1,scenario2,scenario3);

function placementScenario(positionCourant)
{
    for(var i=0;i<tabScenario.length;i++)
    {
        if((tabScenario[i]["localisation"]===positionCourant) && (tabScenario[i]["asEteVu"]===false))
        {
            dialogue(tabScenario[i]["texte"],"texteScenario");
            tabScenario[i]["asEteVu"]=true;
        }
    }
}


