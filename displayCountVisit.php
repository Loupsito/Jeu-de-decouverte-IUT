<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="cssCouterVisit.css" type="text/css">
        <link rel="icon" type="images/png" href="images/icone.ico" />
        <link rel="shortcut icon" href="images/favicon.ico" />        
        <title>Jeu de d&eacutecouverte de l'IUT de Vélizy</title>
         <script src="Scripts/utils.js"></script>
         <script src="Scripts/jquery-2.2.0.js"></script>
         <script src="Scripts/jquery_script.js"></script>    
    </head>
    <body id ='corps'> 
	<br/>
	<h1>Statistiques</h1>
<?php
	include("ScriptCountVisit.php");
	//Global array
	$IP; //Array of IP adress
	$IPdate; //Array of last date of IP adress
	$compteurVisite; //Number of visite of the user
	$daysFromFile; //Array of last days save of IP adress
	$hourFromFile;//Array of last hour save of IP adress

	//---------------------------------------Update display---------------------------------------
		// recoverDataFromFile($fichier);
		// echo "<table border='6' cellpadding='4' style='color : red; ' >";
		// echo "<th>Adresse IP</th><th>Date</th><th>Nombre de visite</th>";
		// for($i = 0; $i<count($IP); $i++) 
		// {
			// echo "<tr ><td>".$IP[$i]."</td><td>".$IPdate[$i]."</td><td>".$compteurVisite[$i]."</td></tr>";
		// }	
		// echo "</table>";recoverDataFromFile($fichier);		
		$total=0;		
		for($i = 0; $i<count($IP); $i++) 
		{
			$total+=$compteurVisite[$i];
		}	
		echo "<table>";
		echo "<th>Nombre total de visites</th><th>Date de la derni&egravere connexion avant vous</th><th>Nombre de visiteurs diff&eacuterents</th>";
		echo "<tr ><td>".$total."</td><td>".$IPdate[sizeof($IPdate)-2]."</td><td>".sizeof($compteurVisite)."</td></tr>";
		echo "</table>";
	//--------------------------------------------------------------------------------------------
?>

	<p>Mise en place des statistiques : 25/09/2016</p>

</body>
</html>
