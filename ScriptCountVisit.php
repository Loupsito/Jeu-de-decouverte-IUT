<?php
//---------------------------------------------------------------------------
//---------------------------------Functions---------------------------------
//---------------------------------------------------------------------------
	/*
	* This function write a line  - the line number must be indicate
	* @param $fichier {string} - the name of the file
	* @param $texte {string} - the value to write in the file
	* @param $i {number} - the number of the line
	*/	
	function finsert_ligne($fichier , $texte , $i)
	{
		// on lit le fichier dans un tableau.
		$contenu_fichier = file($fichier);
		// on ajoute le texte a la fin de la $i-ieme ligne.
		$contenu_fichier[$i]=trim($texte)."**".trim($contenu_fichier[$i]);
		// on va ecrire le nouveau contenu dans le fichier
		$fp = fopen ($fichier, "w+");
		//on re-insere toutes les lignes du tableau dans le fichier
		for ($k=0;$k<sizeof($contenu_fichier);$k++)
		{
			fwrite($fp, (trim($contenu_fichier[$k])." \n"));
		}
		fclose ($fp);
		return true;
	}	
	
	/*
	* This function delete the line indicate with his number
	* @param $fichier {string} - the name of the file	
	* @param $i {number} - the number of the line
	*/
	function fdelete_ligne($fichier , $i)
	{
		// on lit le fichier dans un tableau.
		$contenu_fichier = file($fichier);
		// on ajoute le texte a la fin de la $i-ieme ligne.
		$contenu_fichier[$i]="";
		// on va ecrire le nouveau contenu dans le fichier
		$fp = fopen ($fichier, "w+");
		//on re-insere toutes les lignes du tableau dans le fichier
		for ($k=0;$k<sizeof($contenu_fichier);$k++)
		{
			fwrite($fp, (trim($contenu_fichier[$k])." \n"));
		}
		fclose ($fp);
		return true;
	}	
	
	/**
	*
	* This function recover the values of every global variable, these values will be use for the program
	* @param $file {string} - the name of the file
	*/
	function recoverDataFromFile($file)
	{
		if (file_exists($file)) 
		{		
			$fileTXT = fopen($file,"r+");
			
			//IP adress
			$content=fgets($fileTXT);
			$GLOBALS["IP"] = explode("**", $content);
			
			//last date of IP adress
			$content2=fgets($fileTXT);
			$GLOBALS["IPdate"] = explode("**", $content2);
			
			//Number of visite
			$content3=fgets($fileTXT);
			$GLOBALS["compteurVisite"] = explode("**", $content3);
			
			//last days save of IP adress
			$content4=fgets($fileTXT);
			$GLOBALS["daysFromFile"] = explode("**", $content4);
			
			//last hour save of IP adress
			$content5=fgets($fileTXT);
			$GLOBALS["hourFromFile"] = explode("**", $content5);
			
			fclose($fileTXT);		
		} 
		else 
		{
			echo "Fichier inexistant";
			return false;
		}
	}
//---------------------------------------------------------------------------	
//---------------------------------------------------------------------------	
//---------------------------------------------------------------------------

	//Global array
	$IP; //Array of IP adress
	$IPdate; //Array of last date of IP adress
	$compteurVisite; //Number of visite of the user
	$daysFromFile; //Array of last days save of IP adress
	$hourFromFile;//Array of last hour save of IP adress
	
	//Initialized variable
	$timeWithoutIncrement = 20; //minutes
		
	//The file
	$fichier = "compteur_visites.txt";
	
	//------------------------Recover every data necessary for the program------------------------
		recoverDataFromFile($fichier);
		
		//Values recover from the user
		$valeurIP = $_SERVER["REMOTE_ADDR"];
		$valHeure = date("H:i");		
		$valJours = date("D d F");		
		$valDate = date("D d F H:i");		
	//--------------------------------------------------------------------------------------------
	
	//-------------------------------------Update of the file-------------------------------------
		if(!in_array($valeurIP,$IP))
		{
			finsert_ligne($fichier , $valeurIP ,0);
			finsert_ligne($fichier , $valDate ,1);		
			finsert_ligne($fichier , 1 ,2);		
			finsert_ligne($fichier , $valJours ,3);		
			finsert_ligne($fichier , $valDate ,4);		
		}
		else
		{
			for($i=0;$i<sizeof($IPdate);$i++)
			{
				if($IP[$i] == $valeurIP)
				{
					$timeBetwennTwoConnection = (strtotime($valHeure) - strtotime($GLOBALS["hourFromFile"][$i])) / 60; // unit : minutes
					$daysBetwennTwoConnection = (strtotime($valJours) - strtotime($GLOBALS["daysFromFile"][$i])) / 86400; // unit : days
					// echo "Temps passe entre deux connection = ".$timeBetwennTwoConnection." min";
					
					if($timeBetwennTwoConnection>=$timeWithoutIncrement or $daysBetwennTwoConnection > 0)
					{
						$compteurVisite[$i]++;				
						// echo "(".strtotime($valHeure).")===========(".strtotime($GLOBALS["hourFromFile"][$i]).") ==>>>".$timeBetwennTwoConnection;
						fdelete_ligne($fichier,1);		
						fdelete_ligne($fichier,2);		
						fdelete_ligne($fichier,3);		
						fdelete_ligne($fichier,4);
						finsert_ligne($fichier , $valDate ,1);
						finsert_ligne($fichier , $compteurVisite[$i] ,2);
						finsert_ligne($fichier , $valJours ,3);		
						finsert_ligne($fichier , $valHeure ,4);											
						break;
					}
					else
					{
						break;
					}							
				}					
			}		
		}
	//--------------------------------------------------------------------------------------------
?>



