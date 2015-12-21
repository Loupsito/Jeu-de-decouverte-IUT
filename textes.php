<?php
//entrée
$entree = array(0,"entrée", $item= array(),"images/1- Début.JPG");  

//couloir point de vue A
$couloirA = array(1,"couloir A", $item= array(),"images/2- Couloir vue A.JPG"); 

//couloir point de vue B
$couloirB = array(2,"couloir B", $item= array(),"images/3- Couloir vue B.JPG");  

//salle G25 objets
$g25Objets = array(3, "G25 A", $item= array("cle","stylo","brosse"),"images/6- G25 Machines (avec objets).JPG");  

//salle G25 porte (vers i21)
$g25_portei21 = array(4, "G25 B", $item= array("carte"),"images/7- G25 Porte.JPG");   

//salle G23 porte
$g23_porteCouloirB = array(5, "G23", $item= array(),"images/5- G23 Salle (avec objets).JPG");					

//salle G23 tableau
$g23Tableau = array(6, "G23 tableau blanc", $item= array("tableau"),"images/4- G23 Tableau (vide).JPG");		

//salle I21 
$i21 = array(7,"I21", $item= array(),"images/8- Arrivée.JPG");		


//------------------------------------repertorie toutes les salles------------------------------------
$listeCases = array($entree,$couloirA,$couloirB, $g25Objets, $g25_portei21,$g23_porteCouloirB, $g23Tableau, $i21 );

// idsalle,idsalle2,accès
//entrée ========= couloir A
        $lien1 = array(0,1,true);

//couloir A ========= couloir B
        $lien2 = array(1,2,true);

//couloir A ========= G25 objets
        $lien3 = array(1,3,true);

//G25 objets ========= G25 porte vers I21
        $lien4 = array(3,4,true);

//G25 porte vers I21 ========= I21
        $lien5 = array(4,7,false);

//couloir B ========= G23
        $lien6 = array(2,5,false);

//G23 ========= G23 tableau
        $lien7 = array(5,6, true);

//---------------------repertorie tous les liens---------------------
$listeLiens = array($lien5,$lien3,$lien4,$lien7,$lien1,$lien2,$lien6);

//----La-cle----
                $tabAction1 = array("ouvrir_porte");
                $description1="Sert a ouvrir quelque chose";
                $lienIMG1="images/cle.jpg";
                $possession = false;
                $tabInfos1 = array($tabAction1,$description1,$lienIMG1,$possession);
        $tabItem2 = array("cle",$tabInfos1);

//----Le-stylo----
                $tabAction2 = array("stylo");
                $description2="Un stylo qui va me servir a ecrire sur le tableau";
                $lienIMG2="images/stylo.jpg";
                $possession2 = false;
                $tabInfos2 = array($tabAction2,$description2,$lienIMG2,$possession2);
        $tabItem3 = array("stylo",$tabInfos2);

//----La-brosse----	
                $tabAction3 = array("brosser");
                $description3="une brosse qui semble use par le temps";
                $lienIMG3="images/brosse.jpg";
                $possession3 = false;
                $tabInfos3 = array($tabAction3,$description3,$lienIMG3,$possession3);
        $tabItem4 = array("brosse",$tabInfos3);																			

//---Répertoriassions-de-tous-les-items-dans-un-seul-tableau---	
$tabDeTousLesItems=array($tabItem2,$tabItem3,$tabItem4);

