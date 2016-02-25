function defiler (idNomScene)
{
    (function($){  
        setInterval(function(){  
            $("#"+idNomScene+"").animate({"margin-left": 0}, 500, function(){  
                $(this).appendTo("#"+idNomScene+"");  
        });  
      }, 0);   
    })(jQuery);
}

function transitionChapitre(chapitreCourant)
{
    styleTexte=document.getElementById("texteTransition");
    styleTexte.innerHTML="<h1>"+chapitreCourant+"</h1>";
    $(function() {        
        $("#panneauTransition").fadeIn("3000");                                       
        setTimeout(function() {
            $("#panneauTransition").fadeOut("3000");
            removeElementById("texte");
        }, 2000);
    });
}

