<?php

//Fonction qui va permettre d'inserer des donnee dun fichier csv dans un tableau
function csvIntoArray ($csvFile)
{
	if (file_exists($csvFile)) 
	{
		$array;
		$fp = file($csvFile, FILE_SKIP_EMPTY_LINES);
		$numRow = count($fp);
		$i; $j = 0; 
		$fileCSV = fopen($csvFile,"r");
		
		for ($i = 0; $i < $numRow; $i++)
		{
			$array[$j] = fgetcsv($fileCSV,1024,';');			
			$j++;
		}
		return $array;
	} 
	else 
	{
		echo "Fichier inexistant";
	} 
}

//Fonction qui va permettre d'inserer des donnee dun tableau csv dans une table 
function arrayIntoTable ($array)
{
	$numRow = count($array);
	$numCol = count($array[0]);
	$i;$j;
	
	echo "<table BORDER=1>";
	for ($i = 0; $i < $numRow; $i++)
	{	
		echo "<tr>";
			for ($j = 0; $j < $numCol; $j++)
			{
				$memoire = json_encode($array[$i][$j]);
				echo "<td>".$memoire."</td>";
			}
		echo "</tr>"; 
	}
	echo "</table>";
}


$tabItem = csvIntoArray ('item.csv');

//echo arrayIntoTable ($tabItem);

?>