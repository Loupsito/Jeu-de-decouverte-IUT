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
					
					

						
				echo '<script type="text/javascript">var tabDeTousLesItems = '.json_encode($tabDeTousLesItems).';</script>';	
				echo '<script type="text/javascript">var listeCases = '.json_encode($listeCases).';</script>';					
				?>
				<script>
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
		
					
					var tampon;
					var manger = {"nomAction" : "manger","prerequis" : ["joueur.idSalle==0","verifPossessionItem('cle') == true"]};
					var ecraser = {"nomAction": "ecraser","prerequis" : ["joueur.idSalle==0"]};
					var listesActions = [ecraser,manger];	
					
					//Fonction qui permet de creer la balise que l'on veut (<p>,<span>,etc.)
					function genereContenu(element,contenu,divMere)
					{
						nouveauDiv = document.createElement(element);			  //creation de l'element
						nouveauDiv.innerHTML = contenu							  //Attribution d'un contenu
						document.getElementById(divMere).appendChild(nouveauDiv); //pour insérer dans une div qu'on aura donnee au prealable
					}
					function genereContenuID(element,contenu,divMere,idd)
					{
						nouveauDiv = document.createElement(element);			  //creation de l'element
						nouveauDiv.innerHTML = contenu							  //Attribution d'un contenu
						nouveauDiv.id=idd;
						document.getElementById(divMere).appendChild(nouveauDiv); //pour insérer dans une div qu'on aura donnee au prealable
					}
					
					//---------------------------------------------------------------------------------------------------------------------------
					//--------------------------------------------------------DEPLACEMENT--------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//classe joueur pour connaître la position de l'utilisateur
					function Joueur (idSalle)
					{
						//salle
						this.idSalle = idSalle || 2;
						//orientation du joueur
					}
									
					//fonction générant le texte et les boutons
					function genererTexte()
					{
						//position du joueur
						var positionJoueur = '<b>Position du joueur =></b> '+listeCases[joueur.idSalle][1];
						genereContenu('p',positionJoueur,'deplacement');
					  
						//affichage des boutons de scènes (portes ou longs couloirs)
						var boutonsDeplacement = '<b>Salles adjacentes :</b><br/>';
						genereContenu('p',boutonsDeplacement,'deplacement'); 
							
						for (i = 0; i < listeCases[joueur.idSalle][2].length; i++)
						{
							//affiche le nom de la scène dans les boutons créés.
							genereContenu('span','<button type="button" onclick="avancer(listeCases[joueur.idSalle][2]['+i+'][0],'+i+')">'+listeCases[joueur.idSalle][2][i][1]+'</button>','deplacement');
						} 
						

						
						//affiche boutons items  
						var caseInventaire = '<b>Objets que vous voyez :</b><br/>';
						genereContenu('p',caseInventaire,'deplacement'); 
						for (i = 0; i < listeCases[joueur.idSalle][3].length; i++)
						{
							genereContenu('span','<button type="button">'+listeCases[joueur.idSalle][3][i]+'</button>','objet');
						}
						
						//-----------------------------------------------------------------------------------------------------------------------------
						//----------------------------------------------Analyse-des-boutons-et-traitement----------------------------------------------
							var	captureBouton = document.querySelectorAll('#objet span');
							document.getElementById('objet').innerHTML = "";
							for(var i = 0; i<captureBouton.length;i++)
							{
								//genereContenu('span','<button type="button" onclick="selectionObjet('+"'"+captureBouton[i].textContent+"'"+')">'+captureBouton[i].textContent+'</button>','objet');
								placementItem(captureBouton[i].textContent);
							}
						//-----------------------------------------------------------------------------------------------------------------------------
						//-----------------------------------------------------------------------------------------------------------------------------
						
					  
					 }		
					
					
					function avancer(newScene,indice)
					{	
					//test la case lointaine est accessible
					
						//affiche une alerte si non accessible
						if (listeCases[joueur.idSalle][2][indice][2] == false)			
							alert("La porte est vérrouillé, il doit y avoir une cle près d\'ici...");
						//case lointaine accessible => le joueur peut avancer
						else 
							joueur.idSalle = newScene;
					
						document.getElementById('deplacement').innerHTML = "";
						document.getElementById('objet').innerHTML = "";
						genererTexte();
					}
					
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------INTERACTION-------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					
					//Fonction qui change le contenu de l'ecran : affiche les actions

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
		
						//var laListeAction = joueur.idSalle == 0;
						
						//if (laListeAction)
							//alert(laListeAction);	
						
						
						var captureBouton = document.querySelectorAll('#objet span');
						document.getElementById('objet').innerHTML = "";
						for(var i = 0; i<captureBouton.length;i++)
						{
							//alert(captureBouton[i].textContent);
							//efface la div des actions pour faire le test de verification de prerequis.
							
				
							
							//parcours le tableau d'actions
							for(var j = 0; j <listesActions.length;j++)
							{
								//compare les chaines de caractères contenues dans le tableau d'objet et celui des actions
								if (captureBouton[i].textContent == listesActions[j]["nomAction"])
								{
									//alert(listesActions[j][0]);
									//verifiePrerequis("manger",eval(machin));
									//alert("dessus");
									verifiePrerequis(listesActions[j]["nomAction"]);
									//verifiePrerequis("ecraser");
									//alert("dessous");
								}
							}
						}
					}
					
					function afficheResultat(val)
					{
						document.getElementById('objet').innerHTML = "<h1>Vous avez "+val+" la "+tampon+"!</h1>";
					}
					
					// Efface que la première occurrence pour la valeur
					function arrayUnsetByValue(array, value)
					{ 
						array.splice(array.indexOf(value), 1);
					}
					
					//Verifie si l'item est dans l'inventairer ou pas
					function verifPossessionItem(leItem)
					{
						for(var i = 0; i<tabDeTousLesItems.length;i++)
						{
							if (tabDeTousLesItems[i][0] == leItem)
							{
								//alert(tabDeTousLesItems[i][1][3]);//true ou false
								return tabDeTousLesItems[i][1][3];
							}
						}
					}
					
					//Place l'item en fonction de son booleen
					function placementItem(leItem)
					{
						if (verifPossessionItem(leItem) == true)//Si c'est dans l'inventaire
						{
							//ne rien faire
						}
						else 									//Si c'est dans la salle
						{
							//alert("FALSE");
							genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
						}	
					}
					
					function placementItemDansInventaire(leItem)
					{
						if (verifPossessionItem(leItem) == true)//Si c'est dans l'inventaire
						{
							genereContenuID('span','<button type="button" onclick="changementAff('+"'"+leItem+"'"+')">'+leItem+'</button>','inventaire',leItem);
						}
						else 									//Si c'est dans la salle
						{
							genereContenuID('span','<button type="button" onclick="selectionObjet('+"'"+leItem+"'"+')">'+leItem+'</button>','objet',leItem);
						}	
					}
										
					//Fonction utilise lors de la selection d'un item
					function selectionObjet(leItem)
					{
						for(var i = 0; i<tabDeTousLesItems.length;i++)
						{
							if (tabDeTousLesItems[i][0] == leItem)
							{
								tabDeTousLesItems[i][1][3] = true;//true ou false
							}
							else
							{
								//ne rien faire
							}
						}	
						//suppresion de l'item
						var monItem = document.getElementById(leItem);
						monItem.parentNode.removeChild(monItem);
						
						placementItemDansInventaire(leItem);
					}
					
					function debutInventaire()
					{
						for(var i = 0; i<tabDeTousLesItems.length;i++)
							{
								if (tabDeTousLesItems[i][1][3] == true)
								{
									genereContenuID('span','<button type="button" onclick="changementAff('+"'"+tabDeTousLesItems[i][0]+"'"+')">'+tabDeTousLesItems[i][0]+'</button>','inventaire',tabDeTousLesItems[i][0]);
								}
								else
								{
									//ne rien faire
								}
							}	
					}
					//Fonction verifiant les prerequis des actions
					function verifiePrerequis(action)
					{
						var erreurs = 0 ;
						for(i=0;i<listesActions.length;i++)
						{
							if (listesActions[i]['nomAction']==action)//identification du nom de l'action
								{
									//alert(listesActions[i]['nomAction']+" = "+action);
									for(j=0;j<listesActions[i]['prerequis'].length;j++)//verification validation prerequis
									{
										if (eval(listesActions[i]['prerequis'][j]))
										{
											//alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  : prerequis respecte");
										}
										else
										{	
											alert("ACTION = "+listesActions[i]['nomAction']+"    Position :  ==>"+listesActions[i]['prerequis'][j]+"  :prerequis non respecte");
											erreurs +=1;
										}
									}
									if (erreurs != 0)
										alert(erreurs+" prerequis pas respecte pour " +listesActions[i]['nomAction']);
									else
									{
										//alert("Affichage des actions pour " +listesActions[i]['nomAction']);
										genereContenu('span','<button type="button" onclick="afficheResultat('+"'"+listesActions[i]['nomAction']+"'"+')">'+listesActions[i]['nomAction']+'</button>','objet');
									}	
								}
								
							else
								{
									//alert(listesActions[i]['nomAction']+" =/= "+action + "  :  NOPE");
								}
						}
					}
					
					
					//Fontion qui genere des actions en fonction d'un item
					function genereAction(tabActions)
					{
						document.getElementById('objet').innerHTML = "";
						for(var i=0;i < tabActions.length;i++)
						{	
							genereContenu('span','<button type="button" onclick="">'+tabActions[i]+'</button>','objet');
						}
					}
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					//---------------------------------------------------------------------------------------------------------------------------
					debutInventaire();
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