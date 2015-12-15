<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="CSS_affichage.css" type="text/css">
    <title>Jeu de découverte de l'IUT de Vélizy</title>
	<?php
		include("textes.php");
		//include("test.php");
	?>
</head>
	<body>
		<h1 style="text-align:center;">Affichage du jeu - Console</h1>	
		<!-- ______________________________________________________ --> 
		<!-- _____________________L'écran du jeu___________________ -->
		<div id="console">
			<div id ="ecran">	
				<div id="deplacement"></div>
				<div id="objet"></div>
				<div id="inventaire">		
					<h2>Inventaire</h2>
					<hr/>
				</div>
				<?php
					echo '<script type="text/javascript">var listeCases = '.json_encode($listeCases).';</script>';	
					echo '<script type="text/javascript">var tabDeTousLesItems = '.json_encode($tabDeTousLesItems).';</script>';				
				?>
				<script>
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					var tampon;
					var inventaire =[] ;
					
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
						//----------------------------------------------------chaîne indiquant la position du joueur (la salle)
						var positionJoueur = '<b>Position du joueur =></b> '+listeCases[joueur.idSalle][1];

								
						//----------------------------------------------------chaîne indiquant l'orientation du joueur
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
						
						//----------------------------------------------------affichage des boutons de déplacement
						//bouton gauche
						genereContenu('span','<button type="button" onclick="pivoterGauche(joueur, joueur.idOrientation)">pivoter à gauche</button>','deplacement');
						//bouton avancer, n'est affiché que si le déplacement est possible (case d'en face présente)
						if (!(listeCases[joueur.idSalle][2][joueur.idOrientation][1] == null))
							genereContenu('span','<button type="button" onclick="avancer(joueur, joueur.idSalle)">avancer</button>','deplacement');
						//bouton droite
						genereContenu('span','<button type="button" onclick="pivoterDroite(joueur, joueur.idOrientation)">pivoter à droite</button>','deplacement');
						
						//----------------------------------------------------Affiche les objets de la salle
						var caseInventaire = '<b>Objets que vous voyez :</b><br/>';
						genereContenu('p',caseInventaire,'deplacement');	
						for (i = 0; i < listeCases[joueur.idSalle][2][joueur.idOrientation][4].length; i++)
						{
							genereContenu('span','<button type="button">'+listeCases[joueur.idSalle][2][joueur.idOrientation][4][i]+'</button>','objet');
						}
						
						//-----------------------------------------------------------------------------------------------------------------------------
						//----------------------------------------------Analyse-des-boutons-et-traitement----------------------------------------------
							var	captureBouton = document.querySelectorAll('#objet span');
							document.getElementById('objet').innerHTML = "";
							for(var i = 0; i<captureBouton.length;i++)
							{
								genereContenu('span','<button type="button" onclick="selectionObjet('+"'"+captureBouton[i].textContent+"'"+')">'+captureBouton[i].textContent+'</button>','objet');
							}
						//-----------------------------------------------------------------------------------------------------------------------------
						//-----------------------------------------------------------------------------------------------------------------------------
					}//genererTexte()		
					
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
						document.getElementById('objet').innerHTML = "";
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
						document.getElementById('objet').innerHTML = "";
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
						document.getElementById('objet').innerHTML = "";
						genererTexte();
					}
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------INTERACTION-------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//Fonction qui change le contenu de l'ecran : affiche les actions
					function changementAff(val)
					{	
						for(var i = 0; i<tabDeTousLesItems.length;i++)
						{
							if (tabDeTousLesItems[i][0] == val)
							{
								//On suvegarde la valeur de l'objet pour pouvoir l'utiliser plus tard
								tampon = val;
								//on supprime tous le contenu de la division 'objet'
								document.getElementById('objet').innerHTML = "";
								//puis on ajoute nos nouveaux elements
								genereAction(tabDeTousLesItems[i][1][0]);	
								break;
							}
							else
							{
								document.getElementById('objet').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
							}
						}
					}
					
					// Efface que la première occurrence pour la valeur
					function arrayUnsetByValue(array, value)
					{ 
						array.splice(array.indexOf(value), 1);
					}
					
					//Fonction utilise lors de la selection d'un item
					function selectionObjet(leItem)
					{
						//On recupere les bouton item
						//Seul pb : c'est un tableau d'element HTML...
						//...et pour supprimer notre item de la div "objet"...
						//...on identifie l'item à supprimer avec son nom (qui est de type chaine de caractere)
						var	captureItem = document.querySelectorAll('#objet span');
						
						//On cree donc un nouveau tableau pour supprimer l'indice que l'on veut...
						var tableau =[] ;
						
						//...puis on met tous les elements (de type chaine de caractere) dans notre nouveau tableau
						for(var i = 0; i<captureItem.length;i++)
						{
							tableau.push(captureItem[i].textContent);
						}
						//Suppression de l'item
						arrayUnsetByValue(tableau,leItem);
						
						//On supprime le contenue de la div "objet" ...
						document.getElementById('objet').innerHTML = "";
						
						//...puis on reaffiche les item restant
						for(var i = 0; i<tableau.length;i++)
						{
							genereContenu('span','<button type="button" onclick="selectionObjet('+"'"+tableau[i]+"'"+')">'+tableau[i]+'</button>','objet');
						}
						
						//Enfin, on affiche l'item choisie dans l'inventaire
						genereContenu('span','<button type="button" onclick="changementAff('+"'"+leItem+"'"+')">'+leItem+'</button>','inventaire');
					}
					
					//Fontion qui genere des actions en fonction d'un item
					function genereAction(tabActions)
					{
						document.getElementById('objet').innerHTML = "";
						for(var i=0;i < tabActions.length;i++)
						{	
							genereContenu('span','<button type="button" onclick="changementAff('+"'"+tabActions[i]+"'"+')">'+tabActions[i]+'</button>','objet');
						}
					}
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//instanciation du joueur
					var joueur = new Joueur(); 					
					//gerere le texte et les boutons
					genererTexte();					
				</script>
			</div>		
		</div>
		<!-- ______________________________________________________ --> 
		<!-- ______________________________________________________ --> 
	</body>
</html>