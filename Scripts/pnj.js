//variable global
var exerciceFini = false;
var divTexte;
var divTexte2;
var typeDialogue;
var noMoney = false;
var augerAeteParle = false;
//tableau de choix
var nomChoix = [["INCENDIE","id1"],["DEFAILLANCE","id2"],["CANULAR","id3"],["ENTRAINEMENT","id4"]];
var choixMaths = [["000","id1"],["101","id2"],["111","id3"],["1000","id4"]];
var choixAiderRoger = [["OUI...","id1"],["OUI, je suis trop sympa.","id2"],["OUI, chef!","id3"]];
var choixPayerBastien = [["O-O-OUI... ne me fait pas de mal...","id1"],["NON, et puis quoi encore !","id2"]];
var choixPayerRepasAuger = [["Payer le repas","id1"],["Ne pas payer le repas","id2"]];

function verifDialPrerequis(tab)
{
        if (tab !== "normal" && tab !== "last")
            return 0;
        else if (tab === "normal")
            return 1;
        else if (tab === "last")
            return -1;
}
function changementEtat(tab)
{
    if (tab === "depotcle_notif"){if (tabDeTousLesItems[0][1][3] === false){tabDeTousLesItems[0][1][3] = true;placementItemDansInventaire("cleAmphiA",0);genererNotification("M. Martel vous donne la clé de l'amphi A");}}
    else if(tab === "alarme_incendie") {panneauNarration("Á ce moment là, un bruit assourdissant se fit entendre dans l'amphi. L'alarme incendie sonnait, encore et encore... <br/>\"J'ai un mauvais pressentiment.\" me suis-je dit.");}
    else
    {
        eval(tab);
    }
}
function placementPNJ(positionCourante)
{
    var idImages;
    var i=0;
    for(var i=0;i<tabPNJ.length;i++)
    {               
        if(tabPNJ[i]["localisation"]===positionCourante)
        {        
            if(!(document.getElementById(tabPNJ[i]["nom"])))
            {            
                CreationImage = document.createElement('img');
                CreationImage.id=tabPNJ[i]["idImage"];
                CreationImage.src =tabPNJ[i]["image"];
                CreationImage.height=400;

                image = document.getElementById('pnj').appendChild(CreationImage);
                $(image).click(function () {
                    idImages = this.id;
                    afficherBoiteDialogue(); 
                    testDialogue (idImages);  
                    return;
                });
                $(image).mouseover(function(){
                    this.style.cursor = "pointer";
                });                  
                //image.style.marginRight=-100+"px";
                image.style.marginRight=10+"px";
                image.style.marginBottom=-411.4+"px";  
                image.style.position ='relative';
                image.style.zIndex = 1; 
            }
        }
    }
}

function miseAJourDialogue(indicePNJ,nouveauDiagCourant)
{
    if (tabPNJ[indicePNJ]["numeroDialogueCourant"]!==nouveauDiagCourant){tabPNJ[indicePNJ]["numeroDialogueCourant"]=nouveauDiagCourant;}    
}
function testDialogue (idImages)
{
    if (!$("#nomPNJ").length)
    {        
        //créer la petite boîte contenant le nom du pnj
        genereContenuID("span","","ecran","nomPNJ");
        nomPNJ = document.getElementById("nomPNJ");
        //nomPNJ.innerHTML = "idImages";
    }
    
    for(var j=0;j<tabPNJ.length;j++)
    {
         if(tabPNJ[j]["idImage"]===idImages)
        {
            //verifie si le prerequis est validé et si ce n'est pas son dernier dialogue => si oui, on passe au dialogue suivant
            var verifDial = verifDialPrerequis(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][1]);
            var tabEtat = tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][2];
            var nomFake = tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][3];
            imagePNJ = document.getElementById(nomFake);
            initEtatImg(idImages);
            //si il y un prérequis
            if (verifDial === 0)   
            {
                if(eval(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][1]))
                {       
                    //tabPNJ[j]["numeroDialogueCourant"]++; 
                    typeDialogue=dialogueEnchaine(nomFake,idImages); 
                    changementEtat(tabEtat);
                    //met le dialogue suivant puis l'éxecute
                    miseAJourDialogue(j,tabPNJ[j]["numeroDialogueCourant"]+1);
                    testDialogue(idImages);
                    //dialogue(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,idImages,nomFake,tabEtat);                          
                    //tabPNJ[j]["numeroDialogueCourant"]++; 
                    return;
                }    
                else
                    typeDialogue = "dialoguePrerequis";             
            }               
            //si pas de prerequis et dialogue enchainé
            else if (verifDial === 1)
            {              
                //initEtatImg(idImages); 
                typeDialogue=dialogueEnchaine(nomFake,idImages); 
                //changementEtat(tabEtat);
                dialogue(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,idImages,nomFake,tabEtat);                          
                tabPNJ[j]["numeroDialogueCourant"]++;  
                return;
            }
            else if (verifDial === -1)
            {                           
                typeDialogue = "dialogueDernier";
				verifieProgression(progression);
            }        
            modifAffichageDialogue(nomFake,idImages);
            //initEtatImg(idImages);
            //changementEtat(tabEtat);        
            dialogue(tabPNJ[j]["dialogue"][tabPNJ[j]["numeroDialogueCourant"]][0],tabPNJ[j]["nom"]+"Dial",divTexte, divTexte2,typeDialogue,idImages,nomFake,tabEtat);
            return;
            //alert(typeDialogue);        
        }
    } 
}
function dialogueEnchaine(nomFake,idImage)
{
    typeDialogue = "dialogueEnchaine";
    modifAffichageDialogue(nomFake,idImage);   
    //les 2 suivants pour empecher le clic automatique
    removeElementById("antiClic");      
    return typeDialogue;
}
//Sert à changer le nom, et la luminosité de l'image de pnj (pour les dialogues entre pnj)
function modifAffichageDialogue(nomFake,idImage)
{
    //change le nom dans la boîte (nomFake);
    nomPNJ.innerHTML = nomFake;
    //change la luminosité de l'image
    eclairerImg(idImage);
}
function eclairerImg(idImage)
{
    $("#"+idImage).css("z-index","7").css("pointer-events","none");
}
function initEtatImg(idImage)
{
    $("#"+idImage).css("z-index","1").css("pointer-events","auto");
}
function blocChoix(idBlocChoix,tabChoix,msg)
{
    zoneAntiClic(49,"antiClicChoix","0");
    if (!$("#"+idBlocChoix).length)
    {
        
        genereContenuID("div","","ecran",idBlocChoix);
        genereContenuID("div",msg+"<br/><br/>",idBlocChoix,"idChoixTexte");
        choixTexte = document.getElementById("idChoixTexte");
        choixTexte.style.color="white";
        
        choixAl = document.getElementById(idBlocChoix);    
        choixAl.style.display = "none";
        choixAl.style.position = "absolute";
        choixAl.style.zIndex = "50";
        choixAl.style.width = 50+"%";
        choixAl.style.height = "auto";
        choixAl.style.padding = 5+"px";
        choixAl.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        choixAl.style.left="0";
        choixAl.style.right="0";    
        choixAl.style.margin="0 auto";
        choixAl.style.padding=15+"px";
        choixAl.style.textAlign="center";
        choixAl.style.border = "1px solid #BDBDBD";
        choixAl.style.fontFamily = 'century gothic';
        choixAl.style.fontSize= 12+'px';
          
        genererChoix(tabChoix,idBlocChoix);
        //texte pour l'echec éventuel
        genereContenuID("div","",idBlocChoix,"idEchecOuReussite");
        var texteEchec = document.getElementById("idEchecOuReussite");
        texteEchec.style.color="white";
        texteEchec.style.display = "none";
    }
    $("#"+idBlocChoix).fadeIn(500);           
}
function genererChoix(tabChoix,idBlocChoix)
{
    for (var i=0;i<tabChoix.length;i++)
    {
        genereContenuID("div","",idBlocChoix,tabChoix[i][1]);
        choix = document.getElementById(tabChoix[i][1]);
        choix.innerHTML = tabChoix[i][0];
        choix.style.position = "relative";
        choix.style.width = 45+"%";
        choix.style.height = "auto";
        choix.style.left="0";
        choix.style.right="0";    
        choix.style.margin="0 auto";    
        choix.style.padding=8+"px";  
        choix.style.marginTop=1+"px";
        choix.style.background="white"; 
        choix.style.color ="#2E2E2E";  
        choix.onmouseover = choix.style.cursor = "pointer";
        
        //$("#"+idBlocChoix ).find( "#"+tabChoix[i][1] ).onclick( "background-color", "red" );
        $("#"+tabChoix[i][1]).hover(function() {
            $(this).css("background-color","rgba(0, 0, 0, 0)").css("color","white");
        });
        $("#"+tabChoix[i][1]).mouseout(function() {
            $(this).css("background-color","white").css("color","#2E2E2E");
        });
        choisirChoix(tabChoix[i],idBlocChoix);
    }       
}
function choisirChoix(idDiv,idBlocChoix)
{
    if (idBlocChoix === "choixAlarme")
        choix.onclick = cliquerChoixFredMargaux(idDiv);
    if (idBlocChoix === "choixAide")
        choix.onclick = cliquerChoixAide(idDiv);
    if (idBlocChoix === "choixMaths")
        choix.onclick = cliquerChoixMaths(idDiv);
    if (idBlocChoix === "choixPayerBastien")
        choix.onclick = cliquerChoixPayerBastie(idDiv);
    if (idBlocChoix === "choixPayerRepasAuger")
        choix.onclick = cliquerChoixPayerAuger(idDiv);
}
function prepareChangeDialog()
{
    removeElementById("antiClicChoix");
    removeElementById("antiClic"); 
    removeElementById("antiClicSecond"); 
    removeElementById("antiClicProvisoire"); 
    removeElementById("msgDialogue");
}
function cliquerChoixPayerAuger(idDiv)
{
    $('#'+idDiv[1]).click(function(){
        if (idDiv[0] === "Payer le repas")  
        {
            prepareChangeDialog();
            if (noMoney === false)
                miseAJourDialogue(4,7);
            else
                miseAJourDialogue(4,11);
            testDialogue("auger");
            removeElementById("choixPayerRepasAuger");
        }
        else
        {
            prepareChangeDialog();
            miseAJourDialogue(4,9);
            testDialogue("auger");
            removeElementById("choixPayerRepasAuger");
        }
    });
}
function cliquerChoixPayerBastie(idDiv)
{
    $('#'+idDiv[1]).click(function(){
        if (idDiv[0].substring(0,3) === "O-O")  
        {
            prepareChangeDialog();
            miseAJourDialogue(3,7);
            testDialogue("bastien");
            removeElementById("choixPayerBastien");
            genererNotification("Vous avez perdu de quoi payer un repas.");
            noMoney = true;
        }
        else 
        {
            prepareChangeDialog();
            miseAJourDialogue(3,6);
            testDialogue("bastien");
            removeElementById("choixPayerBastien");      
        }
    });
}
function cliquerChoixAide(idDiv)
{
    $('#'+idDiv[1]).click(function(){
        miseAJourDialogue(2,3);
        prepareChangeDialog();
        removeElementById("choixAide");
        //initEtatImg();
        testDialogue("roger");
    });
}
function cliquerChoixFredMargaux (idDiv)
{
    $('#'+idDiv[1]).click(function(){
        prepareChangeDialog();
        afficherBoiteDialogue();
        if (idDiv[0] === "INCENDIE")    
        {
            miseAJourDialogue(0,5);
            testDialogue("frederic");
        }
        if (idDiv[0] === "DEFAILLANCE")   
        {
            miseAJourDialogue(1,6);
            testDialogue("margaux");
        }
        if (idDiv[0] === "ENTRAINEMENT")       
        {
            miseAJourDialogue(0,7);
            testDialogue("frederic");
        }
        if (idDiv[0] === "CANULAR")    
        {
            miseAJourDialogue(1,8);
            testDialogue("margaux");
            removeElementById("choixAlarme");
        }
        //initEtatImg();
        //testDialogue("FREDERIC");
        removeElementById(idDiv[1]);
        $("#choixAlarme").fadeOut(500); 
    });
}
function cliquerChoixMaths (idDiv)
{ 
    $('#'+idDiv[1]).click(function(){
        removeElementById(idDiv[1]);
        //$("#choixAlarme").fadeOut(500); 
        if (idDiv[0] !== "1000")
        {
            clearTimeout(timer);
            var texteEchec = document.getElementById("idEchecOuReussite");
            texteEchec.innerHTML = "<br/><br/><br/>";
            var timer = setTimeout(function() {
                $("#idEchecOuReussite").hide();
                texteEchec.innerHTML = "<br/><br/>Cela n'est pas correcte, réessayez";
                $("#idEchecOuReussite").fadeIn("slow");
            },100);  
            
            //genererNotification("Mauvaise réponse...!");
        }
        else if (idDiv[0] === "1000")
        {
            removeElementById("msgDialogue");
            miseAJourDialogue(1,4);
            testDialogue("martel");
            removeElementById("antiClicChoix");
            genererNotification("Bonne réponse !");
            removeElementById("choixMaths");
            exerciceFini = true;
        }
    });
}
function visibiltyPNJ(lePNJ,visibility)
{
    if (visibility === "hide")
        $(lePNJ).fadeOut("slow");
    else
        $(lePNJ).fadeIn("slow");
}

/*function carte ()
{
    genereContenuID("div","","ecran","carte");
    
    carte = document.getElementById("carte");
    carte.src="images/";
    carte.style.width=80+"%";
    carte.style.height=80+"%";
    
}*/
