<!DOCTYPE html> 
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS_affichage.css" type="text/css">
        <title>Jeu de découverte de l'IUT de Vélizy</title>
        <?php
            include("textes.php");
        ?>
    </head>
    <body id ='corps'>
        <!-- ______________________________________________________ --> 
        <!-- _________________________Le jeu_______________________ -->
            <div id="console">
                
                <!-- ______________________________________________________ --> 
                <!-- ____________________L'ecran du jeu____________________ -->
                <div id ="ecran">
                        <div id="deplacement"></div>
                        <div id="objet"></div>
                        <div id="inventaire">		
                                <b>Inventaire</b>
                                <hr/>
                        </div>                        
                        <?php                  
                            echo '<script type="text/javascript">var listeLiens = '.json_encode($listeLiens).';</script>';	
                            echo '<script type="text/javascript">var tabDeTousLesItems = '.json_encode($tabDeTousLesItems).';</script>';	
                            echo '<script type="text/javascript">var listeCases = '.json_encode($listeCases).';</script>';					
                        ?>                                       
                    <div id ="infoBulleMenu"></div>
                </div>
                <!-- ______________________________________________________ --> 
                <!-- ____________Le menu et la boite de dialogue___________ --> 
                <div id="dialogue">
                    <div id="menu"></div>
                    <div id="actions"></div>
                    <div id='choixPorte'></div>
                    <div id='msgLambda'></div>
                </div>               
                <script src="pageAffichage.js"></script>
            </div>
        <!-- ______________________________________________________ --> 
        <!-- ______________________________________________________ --> 
    </body>
</html>