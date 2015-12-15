<?php
//------------------------------------------------------------LES-SALLES------------------------------------------------------------

//salle G25
			$g25Nord = "Il y a des fenêtres en face de vous, vous voyez le vent souffler sur les branches d'arbres dehors...";
			$g25Ouest = "Vous voyez des postes et des tables en face de vous, tout au fond un mur.";
			$g25Sud = "En face de vous se trouve une porte qui mène vers le couloir...";
			$g25Est = "Il y a des postes et des tables en face de vous. Au fond, un tableau blanc et un bureau, surement celui du professeur...";
		$g25Orientation = array($N = array(0,null,$g25Nord,false, $objet= array()),$O = array(1,null,$g25Ouest,false, $objet= array("brosse")),$S = array(2,1,$g25Sud,true, $objet= array()),$E = array(3,null,$g25Est,false, $objet= array("crayon","pomme")));
	$g25 = array(0, "G25", $g25Orientation); 	
						
//couloir 1
			$couloir1Nord = "En face de vous, une porte menant à la salle G25...";
			$couloir1Ouest = "Un long couloir s'étend en face de vous, vous pouvez avancer...";
			$couloir1Sud = "Il y a un mur en face de vous, rien de bien intéressant, pivotez...";
			$couloir1Est = "Vous voyez une intersection, cependant, une force mysterieuse vous empêche d'avancer dans cette direction, pivotez.";						
		$couloir1Orientation = array($N = array(0,0,$couloir1Nord,true, $objet= array()),$O = array(1,2,$couloir1Ouest,true, $objet= array()),$S = array(2,null,$couloir1Sud,false, $objet= array()),$E = array(3,null,$couloir1Est,false, $objet= array()));
	$couloir1 = array(1, "couloir1", $couloir1Orientation); 					
	
//couloir 2
			$couloir2Nord = "En face de vous, une porte menant à la salle I21...";
			$couloir2Ouest = "Un long couloir s'étend en face de vous. Une force inconnue vous empêche d'avancer dans cette direction...";
			$couloir2Sud = "Il y a un mur en face de vous, des affiches du prochain concert de Virya y sont affichées...";
			$couloir2Est = "Un couloir s'étend en face de vous, vous pourrez aller en salle g25 si vous avancez...";							
		$couloir2Orientation = array($N = array(0,3,$couloir2Nord,false, $objet= array()),$O = array(1,null,$couloir2Ouest,false, $objet= array()),$S = array(2,null,$couloir2Sud,false, $objet= array()),$E = array(3,1,$couloir2Est,true, $objet= array()));
	$couloir2 = array(2, "couloir2", $couloir2Orientation); 	

//salle I21
			$i21Nord = "Il y a des fenêtres fermées et un radiateur en face de vous. Les radiateurs semblent être allumés, il fait chaud...";
			$i21Ouest = "Vous voyez tables en face de vous, tout au fond un mur affichant en gros 'I21'.";
			$i21Sud = "En face de vous se trouve une porte qui mène vers le couloir...";
			$i21Est = "Il y a des postes et des tables en face de vous. Au fond, un tableau blanc et un bureau, surement celui du professeur...";							
		$i21Orientation = array($N = array(0,null,$i21Nord,false, $objet= array()),$O = array(1,null,$i21Ouest,false, $objet= array()),$S = array(2,2,$i21Sud,false, $objet= array()),$E = array(3,null,$i21Est,false, $objet= array()));
	$i21 = array(3, "I21", $i21Orientation); 														
						
//ensemble des actions
	$ouvrirPorte = array("cle = true","porte = false","case != null");
	$pivoter = array();
																		
$listeAction = array("ouvrirPorte" => $ouvrirPorte);											
$listeCases = array($g25, $couloir1, $couloir2, $i21);

//----------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------LES-OBJETS------------------------------------------------------------
//----Le-crayon----
		$tabAction1 = array("ecrit","colorié","detruit");
		$description1="un crayon a papier normal";
		$lienIMG1="images/crayon.jpg";
		$tabInfos1 = array($tabAction1,$description1,$lienIMG1);
	$tabItem2 = array("crayon",$tabInfos1);

//----La-pomme----
		$tabAction2 = array("mangé","epluché","ecrasé");
		$description2="une belle pomme rouge";
		$lienIMG2="images/pomme.jpg";
		$tabInfos2 = array($tabAction2,$description2,$lienIMG2);
	$tabItem3 = array("pomme",$tabInfos2);

//----La-brosse----	
		$tabAction3 = array("effacé","depoussieré","jeté");
		$description3="une brosse qui semble use par le temps";
		$lienIMG3="images/brosse.jpg";
		$tabInfos3 = array($tabAction3,$description3,$lienIMG3);
	$tabItem4 = array("brosse",$tabInfos3);																			

//---Répertoriassions-de-tous-les-items-dans-un-seul-tableau---	
	$tabDeTousLesItems=array($tabItem2,$tabItem3,$tabItem4);
//----------------------------------------------------------------------------------------------------------------------------------

?>












