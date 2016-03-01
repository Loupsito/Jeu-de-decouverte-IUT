var isOnPage = false;
//Creation du clavier
function clavier(placement)
{    
    var touches="0123456789azertyuiopqsdfghjklmwxcvbn";  
    clavier=document.createElement("div");
    clavier.id="clavier";
    clavier.style.textAlign="center";
    clavier.style.display="none";
    clavier.style.backgroundColor="rgba(0, 0, 0, 0.50)";
    clavier.style.padding="10px";
    document.getElementById(placement).appendChild(clavier);
    for(var i = 0;i<touches.length;i++)
    {
        if(i===10)
            genereContenuID('span','<button type="button" onmouseout="" onmouseover =""  onclick="retourValeurTouche('+"'"+"<--"+"'"+')" width="8" height="8"><--</button>',"clavier","delete");
        if(i===10 || i===20 || i===30)
            genereContenu('span','<br/>','clavier');
        
        genereContenuID('span','<button type="button" onmouseout="" onmouseover =""  onclick="retourValeurTouche('+"'"+touches.charAt(i)+"'"+')" width="8" height="8">'+touches.charAt(i)+'</button>',"clavier",touches.charAt(i));
    }
    genereContenuID('span','<br/><br/><button type="button" onmouseout="" onmouseover =""  onclick="retourValeurTouche('+"'"+"Valider"+"'"+')" width="8" height="8">Valider</button>',"clavier","valider");
}
//Creation de la barre de saisie
function barreDeSaisie(placement)
{
    genereContenuID('div',"",placement,"barreDeSaisie");
    barre = document.getElementById("barreDeSaisie");    
    barre.style.width=160+"px";
    barre.style.height=22+"px";
    barre.style.backgroundColor="white";
    barre.style.marginLeft="auto";
    barre.style.marginRight="auto";
    barre.style.marginBottom=10+"px";
    barre.style.border=1+"px solid";
    barre.style.display="none";
}

function retourValeurTouche(touche)
{    
    var texte = document.getElementById("barreDeSaisie").textContent;
    var max =19;
    if(texte.length>max &&touche!=="<--")
    {
        alert("Chaine trop longue : "+max+" caracteres maximum");       
    }
    if(touche==="<--")
    {
        val = texte.substring(0,texte.length-1);
        document.getElementById("barreDeSaisie").innerHTML=val;    
    }
    else if(touche==="Valider")
    {
        //alert("Votre message : "+texte);
        //alert(pasuwado(texte));
        progression = pasuwado(texte);  
        $('#accueil').fadeOut("slow");
        transitionChapitre("Chapitre  "+progression);
         setTimeout(function() {    
            fonctionGeneratricePrincipale();            
        }, 2000);
    }
    else if(texte.length<=max)
    {               
        texte+=touche;
        document.getElementById("barreDeSaisie").innerHTML=texte;    
    }
}

function cliquerBouton(bouton)
{    
    barreSaisie = document.getElementById("barreDeSaisie");
    $("#"+bouton).click(function (){
        if (bouton === "commencer")
        {
            //commencer = document.getElementById("accueil");
            //commencer.style.display="none";
            $('#accueil').fadeOut("slow");
            transitionChapitre("Chapitre  "+progression);
             setTimeout(function() {    
                fonctionGeneratricePrincipale();
                //dialogue("Vous etes sur le jeu de decouverte de l'IUT de velizy Villacoublay. Vous etes au chapitre "+progression+". Bon jeu !","dial"); 
            }, 2000);
        }
        else
        {
            if (isOnPage === false)
            {                           
                $('#barreDeSaisie').fadeIn("slow").animate({"margin-top": 20}, "slow");
                $('#clavier').fadeIn("slow").animate({"margin-top": 20}, "slow");
                isOnPage = true;
            }
            else
            {
                $("#barreDeSaisie").animate({"margin-top": 0}, "slow").fadeOut("slow");
                $("#clavier").animate({"margin-top": 0}, "slow").fadeOut("slow");
                isOnPage = false;
            }
        }
    });
}

//barreDeSaisie("accueil");//panneauTransition
//clavier("accueil");
//cliquerBouton("commencer");
//cliquerBouton("continuer");