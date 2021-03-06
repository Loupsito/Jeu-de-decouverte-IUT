<!DOCTYPE html> 
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS_affichage.css" type="text/css">
        <link rel="icon" type="images/png" href="images/icone.ico" />
        <link rel="shortcut icon" href="images/favicon.ico" />        
        <title>Jeu de découverte de l'IUT de Vélizy</title>
         <script src="Scripts/utils.js"></script>
         <script src="Scripts/jquery-2.2.0.js"></script>
         <script src="Scripts/jquery_script.js"></script>    
    </head>
    <body id ='corps'> 
        <div id="sousCorps">             
        <div id="bordGauche">              
            <img src="images/logoUVSQ.png" alt="logoUvsq" class="logoBord" />
        </div>
           
        <!-- ______________________________________________________ --> 
        <!-- _________________________Le jeu_______________________ -->
            <div id="console">                 
                <div id="accueil">
                    <h1>Jeu découverte de l'IUT de Vélizy</h1>
                    <div id="accueilMenu">
                        <ul id="accueilListe">
                            <li class="accueilChoixMenu" id="commencer">Commencer le jeu</li>
                            <li class="accueilChoixMenu" id="continuer">Charger partie</li>
                        </ul>
                    </div>
                </div>
                <div id ="ecran">
                    <div id="blocNomScene1"></div>
                    <div id="blocNomScene2"></div>
                    <div id="blocInfoBulle"></div>
                    <div id="agenda" style="display:block "></div>
                    <div id="panneauTransition">
                        <div id="texteTransition"></div>
                    </div>
                    <div id="pnj" ></div>
                    <div id="chargement" style="text-align:center"><img src="images/engrenages.gif" alt="chargement" /></div>                    
                    <div id="deplacement"></div>
                    <div id="objet"></div>
                    <div id="inventaire">		
                        <div id ="t1" class="caseInventaire"></div><div id ="t2" class="caseInventaire"></div>
                        <div id ="t3" class="caseInventaire"></div><div id ="t4" class="caseInventaire"></div>
                        <div id ="t5" class="caseInventaire"></div><div id ="t6" class="caseInventaire"></div>
                        <div id ="t7" class="caseInventaire"></div><div id ="t8" class="caseInventaire"></div>
                        <div id ="t9" class="caseInventaire"></div><div id ="t10" class="caseInventaire"></div>
                        <div id ="t11" class="caseInventaire"></div><div id ="t12" class="caseInventaire"></div>
                    </div>                                                                                    
                    <div id="menu"></div>
                    <div class="bandesNoires" id="bandeNoiresHautes"></div>
                    <div class="bandesNoires" id="bandeNoiresBasses"></div>
                    <div id="dialogue">           
                        <div id="actions"></div>
                        <div id='msgDescription'></div>                        
                    </div>                      
                </div>            
                <script src="Scripts/pnj.js"></script>
                <script src="Scripts/mecaniquesJeu.js"></script>
                <script src="Scripts/multimedia.js"></script>
                <script src="Scripts/chapitre.js"></script>
                <script src="Scripts/scenario.js"></script>
                <script src="Scripts/menuAccueil.js"></script>
                <script src="Scripts/recupXML.js"></script>
            </div>
        <!-- ______________________________________________________ --> 
        <!-- ______________________________________________________ --> 
        <div id="bordDroite">     
            <img src="images/logoUVSQ.png" alt="logoUvsq" class="logoBord"/>
        </div>
        
        <footer id="telechargement">
            <a href="displayCountVisit.php" target="_blank">Statistiques</a>
			 <?php           
				include("ScriptCountVisit.php");
			?>
        </footer>      
        
        </div>
       
    </body>
    
    
    
</html>