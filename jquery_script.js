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

