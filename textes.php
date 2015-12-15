<?php
//salle G25
  $g25scenesAdjacentes = array($scene1 = array(1,"couloir 1",true),$scene2 = array(3,"I21",false));
 $g25 = array(0, "G25", $g25scenesAdjacentes, $item= array("cle","pomme","brosse"));  

//couloir 1
  $couloir1scenesAdjacentes = array($scene1 = array(0,"G25",true),$scene2 = array(2,"couloir 2",true));
 $couloir1 = array(1, "couloir1", $couloir1scenesAdjacentes, $item= array());      

//couloir 2
  $couloir2scenesAdjacentes = array($scene1 = array(1,"couloir 1",true),$scene2 = array(3,"I21",false));
 $couloir2 = array(2, "couloir2", $couloir2scenesAdjacentes, $item= array());  

//salle I21
  $i21scenesAdjacentes = array($scene1 = array(0,"G25",true),$scene2 = array(2,"couloir 2",true));
 $i21 = array(3, "I21", $i21scenesAdjacentes, $item= array("brosse"));					

$listeCases = array($g25, $couloir1, $couloir2, $i21);

//----La-cle----
                $tabAction1 = array("ouvrir porte");
                $description1="Sert a ouvrir quelque chose";
                $lienIMG1="images/cle.jpg";
                $possession = false;
                $tabInfos1 = array($tabAction1,$description1,$lienIMG1,$possession);
        $tabItem2 = array("cle",$tabInfos1);

//----La-pomme----
                $tabAction2 = array("ecraser","manger");
                $description2="une belle pomme rouge";
                $lienIMG2="images/pomme.jpg";
                $possession2 = false;
                $tabInfos2 = array($tabAction2,$description2,$lienIMG2,$possession2);
        $tabItem3 = array("pomme",$tabInfos2);

//----La-brosse----	
                $tabAction3 = array("brosser");
                $description3="une brosse qui semble use par le temps";
                $lienIMG3="images/brosse.jpg";
                $possession3 = false;
                $tabInfos3 = array($tabAction3,$description3,$lienIMG3,$possession3);
        $tabItem4 = array("brosse",$tabInfos3);																			

//---Répertoriassions-de-tous-les-items-dans-un-seul-tableau---	
$tabDeTousLesItems=array($tabItem2,$tabItem3,$tabItem4);

