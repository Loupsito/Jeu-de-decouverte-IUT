<?php
//entrée
$entree = array(0,"entrée", $item= array(),"images/1- Début.JPG");

//couloir point de vue A
$couloirA = array(1,"couloir A", $item= array(),"images/2- Couloir vue A.JPG"); 

//couloir point de vue B
$couloirB = array(2,"couloir B", $item= array(),"images/3- Couloir vue B.JPG");

//salle G25 objets
$g25Objets = array(3, "G25 A", $item= array("stylo","brosse"),"images/6- G25 Machines (sans objets).JPG");

//salle G25 porte (vers i21)
$g25_portei21 = array(4, "G25 B", $item= array(),"images/7- G25 Porte.JPG");   

//salle G23 porte
$g23_porteCouloirB = array(5, "G23", $item= array("cleI21"),"images/5- G23 Salle (sans objets).JPG");

//salle G23 tableau
$g23Tableau = array(6, "G23 tableau blanc", $item= array("tableau"),"images/4- G23 Tableau (vide).JPG");		

//salle I21 
$i21 = array(7,"I21", $item= array(),"images/8- Arrivée.JPG");		

//------------------------------------repertorie toutes les salles------------------------------------
$listeCases = array($entree,$couloirA,$couloirB, $g25Objets, $g25_portei21,$g23_porteCouloirB, $g23Tableau, $i21 );

// idsalle,idsalle2,accès
//entrée ========= couloir A
        $lien1 = array(0,1,true,$coordonneesHitbox=array($face1=array(311,164),$face2=array(485,177)));

//couloir A ========= couloir B
        $lien2 = array(1,2,true,$coordonneesHitbox=array($face1=array(15,290),$face2=array(250,350)));

//couloir A ========= G25 A
        $lien3 = array(1,3,true,$coordonneesHitbox=array($face1=array(90,170),$face2=array(420,180)));

//G25 A ========= G25 B
        $lien4 = array(3,4,true,$coordonneesHitbox=array($face1=array(250,350),$face2=array(250,350)));

//G25 B ========= I21
        $lien5 = array(4,7,false,$coordonneesHitbox=array($face1=array(290,130),$face2=array(250,350)));

//couloir B ========= G23
        $lien6 = array(2,5,true,$coordonneesHitbox=array($face1=array(115,190),$face2=array(0,130)));

//G23 ========= G23 tableau
        $lien7 = array(5,6, true,$coordonneesHitbox=array($face1=array(495,165),$face2=array(250,350)));

//---------------------repertorie tous les liens---------------------
$listeLiens = array($lien5,$lien3,$lien4,$lien7,$lien1,$lien2,$lien6);
        
//----Le-stylo----
                $tabAction2 = array("ecrire");
                $description2="Un stylo qui va servir a ecrire sur le tableau de la salle G23";
                $lienIMG2="images/stylo.png";
                $possession2 = false;
                $tabCoordonnees2=[500,350];
                $tabInfos2 = array($tabAction2,$description2,$lienIMG2,$possession2,$tabCoordonnees2);
        $tabItem3 = array("stylo",$tabInfos2);

//----La-brosse----	
                $tabAction3 = array("effacer");
                $description3="Une brosse qui va permettre d'effacer le tableau de la salle G23";
                $lienIMG3="images/brosse.png";
                $possession3 = false;
                $tabCoordonnees3=[110,365];
                $tabInfos3 = array($tabAction3,$description3,$lienIMG3,$possession3,$tabCoordonnees3);
        $tabItem4 = array("brosse",$tabInfos3);
        
//----La-carte----	
                $tabAction4 = array("affiche_plan");
                $description4="Carte qui montre le plan de l'IUT";
                $lienIMG4="images/carte.jpg";
                $possession4 = false;
                $tabCoordonnees4=[];
                $tabInfos4 = array($tabAction4,$description4,$lienIMG4,$possession4,$tabCoordonnees4);
        $tabItem5 = array("carte",$tabInfos4);	
        
//----La-cle passe-partout----
                $tabAction6 = array("ouvrir_porte");
                $description6="Sert a ouvrir toutes les portes de l'IUT";
                $lienIMG6="images/cle.jpg";
                $possession6 = false;
                $tabCoordonnees6=[];
                $tabInfos6 = array($tabAction6,$description6,$lienIMG6,$possession6,$tabCoordonnees6);
        $tabItem6 = array("cle ultime",$tabInfos6);

//----La-cle i21----
                $tabAction7 = array("ouvrir_porte_i21");
                $description7="Sert a ouvrir la porte de la salle I21 se trouvant dans la salle G25";
                $lienIMG7="images/cleI21.png";
                $possession7 = false;
                $tabCoordonnees7=[52,399];
                $tabInfos7 = array($tabAction7,$description7,$lienIMG7,$possession7, $tabCoordonnees7);
        $tabItem7 = array("cleI21",$tabInfos7);

//----La-cle g25-g23----
                $tabAction8 = array("ouvrir_porte_g25_g23");
                $description8="Sert a ouvrir l'acces a la salle G25 et G23";
                $lienIMG8="images/cle.jpg";
                $possession8 = false;
                $tabCoordonnees8=[];
                $tabInfos8 = array($tabAction8,$description8,$lienIMG8,$possession8, $tabCoordonnees8);
        $tabItem8 = array("cle G25/G23",$tabInfos8);
       
//---Répertoriassions-de-tous-les-items-dans-un-seul-tableau---	
$tabDeTousLesItems=array($tabItem3,$tabItem4,$tabItem5,$tabItem6,$tabItem7,$tabItem8);