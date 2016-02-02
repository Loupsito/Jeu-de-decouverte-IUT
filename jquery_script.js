function defiler ()
{
    (function($){  
        setInterval(function(){  
            $("#nomScene").animate({"margin-left": 0}, 290, function(){  
                $(this).appendTo("#nomScene");  
        });  
      }, 1100);   
    })(jQuery);
}


