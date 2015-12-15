<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="CSS_affichage.css" type="text/css">
    <title>Jeu de découverte de l'IUT de Vélizy</title>
	<?php
		include("textes.php");
		include("test.php");
	?>
	
</head>
	<body>
		<h1 style="text-align:center;">Affichage du jeu - Console</h1>	
		<!-- ______________________________________________________ --> 
		<!-- _____________________L'écran du jeu___________________ -->
		<div id="console">
			<div id ="ecran">
			<hr/>
				<div id="menu"></div>
				<div id="deplacement"></div>
				<?php
					//Recuperation des tableaux associatifq php vers des tableaux associatifs JavaScript
					echo '<script type="text/javascript">var tabItem = '.json_encode($tabItem).';</script>';				
					echo '<script type="text/javascript">var t1 = '.json_encode($t1).';</script>';
					echo '<script type="text/javascript">var t2 = '.json_encode($t2).';</script>';
					echo '<script type="text/javascript">var t3 = '.json_encode($t3).';</script>';
					echo '<script type="text/javascript">var t4 = '.json_encode($t4).';</script>';
					echo '<script type="text/javascript">var t5 = '.json_encode($t5).';</script>';
					echo '<script type="text/javascript">var t6 = '.json_encode($t6).';</script>';
					echo '<script type="text/javascript">var t7 = '.json_encode($t7).';</script>';
					
					//Recuperation du tabItemleau associatif php vers tabItemleau associatif JavaScript
					
						//salle G25
								$g25Nord = "Il y a des fenêtres en face de vous, vous voyez le vent souffler sur les branches d'arbres dehors...";
								$g25Ouest = "Vous voyez des postes et des tables en face de vous, tout au fond un mur.";
								$g25Sud = "En face de vous se trouve une porte qui mène vers le couloir...";
								$g25Est = "Il y a des postes et des tables en face de vous. Au fond, un tableau blanc et un bureau, surement celui du professeur...";
							$g25Orientation = array($N = array(0,null,$g25Nord,false),$O = array(1,null,$g25Ouest,false),$S = array(2,1,$g25Sud,true),$E = array(3,null,$g25Est,false));
						$g25 = array(0, "G25", $g25Orientation); 	
						
						//couloir 1
								$couloir1Nord = "En face de vous, une porte menant à la salle G25...";
								$couloir1Ouest = "Un long couloir s'étend en face de vous, vous pouvez avancer...";
								$couloir1Sud = "Il y a un mur en face de vous, rien de bien intéressant, pivotez...";
								$couloir1Est = "Vous voyez une intersection, cependant, une force mysterieuse vous empêche d'avancer dans cette direction, pivotez.";						
							$couloir1Orientation = array($N = array(0,0,$couloir1Nord,true),$O = array(1,2,$couloir1Ouest,true),$S = array(2,null,$couloir1Sud,false),$E = array(3,null,$couloir1Est,false));
						$couloir1 = array(1, "couloir1", $couloir1Orientation); 	
						
						//couloir 2
								$couloir2Nord = "En face de vous, une porte menant à la salle I21...";
								$couloir2Ouest = "Un long couloir s'étend en face de vous. Une force inconnue vous empêche d'avancer dans cette direction...";
								$couloir2Sud = "Il y a un mur en face de vous, des affiches du prochain concert de Virya y sont affichées...";
								$couloir2Est = "Un couloir s'étend en face de vous, vous pourrez aller en salle g25 si vous avancez...";							
							$couloir2Orientation = array($N = array(0,3,$couloir2Nord,false),$O = array(1,null,$couloir2Ouest,false),$S = array(2,null,$couloir2Sud,false),$E = array(3,1,$couloir2Est,true));
						$couloir2 = array(2, "couloir2", $couloir2Orientation); 	

						//salle I21
								$i21Nord = "Il y a des fenêtres fermées et un radiateur en face de vous. Les radiateurs semblent être allumés, il fait chaud...";
								$i21Ouest = "Vous voyez tables en face de vous, tout au fond un mur affichant en gros 'I21'.";
								$i21Sud = "En face de vous se trouve une porte qui mène vers le couloir...";
								$i21Est = "Il y a des postes et des tables en face de vous. Au fond, un tableau blanc et un bureau, surement celui du professeur...";							
							$i21Orientation = array($N = array(0,null,$i21Nord,false),$O = array(1,null,$i21Ouest,false),$S = array(2,2,$i21Sud,false),$E = array(3,null,$i21Est,false));
						$i21 = array(3, "I21", $i21Orientation); 							
							
					$listeCases = array($g25, $couloir1, $couloir2, $i21);						
							
					$listeCases = array($g25, $couloir1, $couloir2, $i21);
					
					echo '<script type="text/javascript">var listeCases = '.json_encode($listeCases).';</script>';		
				?>
				<script>
					//Variable qui contient tout le dialogue, la variable php $dialogue1 est contenu dans le textes.php
					var didi ='<?php echo $dialogue1; ?>';
					var didi2 = "Vous avez trouvez : ";
					var tabDeTab = [t1,t2,t3,t4,t5,t6,t7]; //Différent tab des choix
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//Fonction qui permet de creer la balise que l'on veut (<p>,<span>,etc.)
					function genereContenu(element,contenu,divMere)
					{
						nouveauDiv = document.createElement(element);			  //creation de l'element
						nouveauDiv.innerHTML = contenu							  //Attribution d'un contenu
						document.getElementById(divMere).appendChild(nouveauDiv); //pour insérer dans une div qu'on aura donnee au prealable
					}
					
					//---------------------------------------------------------------------------------------------------------------------------
					//--------------------------------------------------------DEPLACEMENT--------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//classe joueur pour connaître la position de l'utilisateur
					function Joueur (idSalle, idOrientation)
					{
						//salle
						this.idSalle = idSalle || 2;
						//orientation du joueur
						this.idOrientation = idOrientation || 0;
					}
									
					//fonction générant le texte et les boutons
					function genererTexte()
					{
						//chaîne indiquant la position du joueur (la salle)
						var positionJoueur = positionJoueur = '<b>Position du joueur =></b> '+listeCases[joueur.idSalle][1];
						
						//chaîne indiquant l'orientation du joueur
						if (joueur.idOrientation == 0)
							var orientationJoueur = '<b>Orientation du joueur =></b> NORD'; 	
						else if (joueur.idOrientation == 1)
							var orientationJoueur = '<b>Orientation du joueur =></b> OUEST'; 	
						else if (joueur.idOrientation == 2)
							var orientationJoueur = '<b>Orientation du joueur =></b> SUD'; 	
						else if (joueur.idOrientation == 3)
							var orientationJoueur = '<b>Orientation du joueur =></b> EST'; 
							
						//Ce que voit le joueur
						var visionJoueur = '<b>Description des lieux :</b><br/><br/>'+listeCases[joueur.idSalle][2][joueur.idOrientation][2];	
						//affichage du texte
						genereContenu('p',positionJoueur,'deplacement');
						genereContenu('p',orientationJoueur,'deplacement');
						genereContenu('p',visionJoueur,'deplacement');		
						//affichage des boutons
						//bouton gauche
						genereContenu('span','<button type="button" onclick="pivoterGauche(joueur, joueur.idOrientation)">pivoter à gauche</button>','deplacement');
						//bouton avancer, n'est affiché que si le déplacement est possible (case d'en face présente)
						if (!(listeCases[joueur.idSalle][2][joueur.idOrientation][1] == null))
							genereContenu('span','<button type="button" onclick="avancer(joueur, joueur.idSalle)">avancer</button>','deplacement');
						//bouton droite
						genereContenu('span','<button type="button" onclick="pivoterDroite(joueur, joueur.idOrientation)">pivoter à droite</button>','deplacement');						
					}			
					//fonction pivoter à gauche
					function pivoterGauche(joueur, orientation)
					{			
						if (orientation == 3)
							joueur.idOrientation = orientation - 3;
						else
							joueur.idOrientation = orientation+1;
						
						//supprime les div existants
						document.getElementById('deplacement').innerHTML = "";
						//genere le nouveau texte (avec la nouvelle orientation
						genererTexte();
					}
					//fonction pivoter à droite
					function pivoterDroite(joueur, orientation)
					{			
						if (orientation == 0)
							joueur.idOrientation = orientation + 3;
						else
							joueur.idOrientation = orientation-1;
							
						//supprime les div existants	
						document.getElementById('deplacement').innerHTML = "";
						//genere le nouveau texte (avec la nouvelle orientation
						genererTexte();
					}
					//fonction permettant d'avancer
					function avancer(joueur, salle)
					{	
						//test si une case lointaine est présente
						if(!(listeCases[joueur.idSalle][2][joueur.idOrientation][1] == null))
						{
							//test la case lointaine est accessible
							if (listeCases[joueur.idSalle][2][joueur.idOrientation][3] == false)
								alert("La porte est vérrouillé, il doit y avoir une clé près d\'ici...");
							//case lointaine accessible => le joueur peut avancer
							else 
								joueur.idSalle = listeCases[joueur.idSalle][2][joueur.idOrientation][1]; 
						}
						//else 
						//{
							//alert("vous ne pouvez avancer");
						//}
						
						document.getElementById('deplacement').innerHTML = "";
						genererTexte();
					}
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------INTERACTION-------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//Fonction qui change le contenu de l'ecran
					function changementAff(val,texte)
					{
						//Recuperation de tous les span dans la div menu
						var	queryAll = document.querySelectorAll('#menu span');
						
						//Decoupage la val
						var chaine_a_decoupe = val;
						tab_de_la_chaine  = chaine_a_decoupe.split(' ');
						
						for(var i = 0; i<queryAll.length;i++)
						{
							if (queryAll[i].textContent == val)
							{
								//on supprime tous le contenu de la division 'menu'
								document.getElementById('menu').innerHTML = "";
							
								//Puis on ajoute les elements que l'on veut
								var1 = t1[i][0];
								
								for(var j = 0; j<=6;j++)
								{
									if(var1==t1[j][0])
										generePage(texte+tab_de_la_chaine[2],tabDeTab[j],didi2);	
								}
							}
						}
					}
					
					function generePage(texte,tabActions,texte2)
					{
						genereContenu('p',texte,'menu');
						for(var i=0;i < tabActions.length;i++)
						{
							genereContenu('span','<button type="button" onclick="changementAff('+"'Interaction avec "+tabActions[i][0]+"',"+"'"+texte2+"'"+')">Interaction avec '+tabActions[i][0]+'</button>','menu');
						}
					}
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//instanciation du joueur
					var joueur = new Joueur(); 					
					generePage(didi,tabItem,didi2); // (le premier texte a afficher , le tableau des actions , le texte suivant a afficher)
					//gerere le texte et les boutons
					genererTexte();
					
				</script>
				<hr/>
			</div>		
		</div>
		<!-- ______________________________________________________ --> 
		<!-- ______________________________________________________ --> 
	</body>
</html>