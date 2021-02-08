//Ajoute un événement
function addFiche(){
    supprimeFiltre();//suprime filtre de recherche
    let body = document.getElementById('body1');//récupére le DOM avec l'id "body1" 
	let span = document.createElement('span');//crée un DOM span 
	span.setAttribute('class','col-lg-4 col-md-6 mb-4')//met la class dans le DOM span
	//écrit dans "texte" le code HTML d'un événement avec les éléments du formulaire "créer un événement" 
    let texte = '<div class="card h-100"><a href="#"><img class="card-img-top ml-0" src="./image/';
	try {texte += document.getElementById("fichier").files[0].name;} 
	catch(error) {}
	texte += '" alt=""></a><div class="card-img-overlay d-flex align-items-start"><button type="button" class="close" data-toggle="modal" data-target="#supprimeModal" aria-label="Close"><div aria-hidden="true" class="fiche">&times;';
	texte += '</div></button></div><div class="card-body" ><div class="row"><div class="col-md-8"><h4 class="card-title text-info"><a>';
	texte += document.getElementById("titre").value;
	texte += '</a></h4></div><div class="col-2 col-sm-2 col-md-4"><img class="img-fluid" src="./image/';
	texte += document.getElementById("icone").value;
	texte += '"></div></div><h5>';
	texte += document.getElementById("lieu").value;
	texte += '</h5><p class="card-text">';
	texte += document.getElementById("description").value;
	texte += '</p></div><div class="card-footer"><div class="row"><div class="col"><small class="text-muted float-left">Début</small></div><div class="col"><small class="text-muted float-right">Fin</small></div></div><div class="row"><div class="col"><small class="text-muted float-left">';
	texte += document.getElementById("dateDebut").value;
	texte += '</small></div><div class="col"><small class="text-muted float-right">';
	texte += document.getElementById("dateFin").value;
	texte += '</small></div></div></div></div></span>';
	span.innerHTML = texte;//écrite le texte HTML dans le DOM span
	body.appendChild(span);//ajoute le DOM span au DOM avec l'id "body1"
	triDate();//trie les événements par dates
} 

//renvoie le nombre d'événements
function nbr_lignes(row){
	return document.getElementById(row).getElementsByTagName('span').length; 
	} 

//rend visible tous les événements
function supprimeFiltre(){
	let nbLignes = nbr_lignes('body1');
	//retire "none" du style display du DOM span d'un événement (événement caché)
	for(var i=0; i<nbLignes; i++){
		if (document.getElementById('body1').getElementsByTagName('span')[i].style.display == 'none'){
			document.getElementById('body1').getElementsByTagName('span')[i].style.display = '';
		}
	}
}

//supprime un événement
function supFicheTab(){
	let inc;
	let span;
	let suppr = false;
	let nbLignes = nbr_lignes('body1');
	for(var i=0; i<nbLignes; i++){
		//si l'événement a une classe "fermer" 
		if (document.getElementById('body1').getElementsByTagName('span')[i].getElementsByClassName('fermer')[0]){
			inc=i;
		}
	}
	span = document.getElementById('body1').getElementsByTagName('span')[inc];
	span.parentNode.removeChild(span);//supprime l'événement avec la classe "fermer"
}

//copie une événement (DOM span)
function bougeFiche(num){
	let span = document.createElement('span');
	span.setAttribute('class','col-lg-4 col-md-6 mb-4')
	let fiche = document.getElementById('body1').getElementsByTagName('span')[num];
	span.innerHTML = fiche.innerHTML;
	document.getElementById('body1').appendChild(span);//ajoute l'événement à la fin du body1
}

//trie les événement par date
function triDate(){
	let span;
	let nbLignes = nbr_lignes('body1');
	let tableau = new Array(nbLignes);
	//crée un tableau avec la date et la position de chaque événement
	for(var i=0; i<nbLignes; i++){
		    tableau[i] = new Array(2);
			tableau[i][0] = document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('small')[2].innerHTML;//récupére la date
			tableau[i][1] = i;//position
	}
	tableau.sort();//trie le tableau par date
	//ajoute les événements triés par date à la fin du body1
	for(var i=0; i<nbLignes; i++){
		if (document.getElementById('body1').getElementsByTagName('span')[i].style.display != 'none'){
			bougeFiche(tableau[i][1]);
		}
	}
	//supprime les événements non triés
	for(var i=nbLignes-1; i>=0; i--){
		if (document.getElementById('body1').getElementsByTagName('span')[i].style.display != 'none'){
			span = document.getElementById('body1').getElementsByTagName('span')[i];
			span.parentNode.removeChild(span);
		}
	}
}

var log = new Map();//Map contenant les identifiants et les mots de passe
//Connection si l'identifiant et le mot de passe sont correctes
function connection(){
	let texte;
    let id = document.getElementById('identifiant').value
    let passe = document.getElementById('passe').value
	//si l'identifiant existe
    if (log.has(id)) {
		//si le mot de passe est correcte
        if (log.get(id) == passe) {
			texte = "Bonjour "+id+", vous êtes bien connecté !";
			document.getElementById('message').innerHTML = texte ;
			$('#messageModal').modal('show');
			$('#loginModal').modal('hide');
			document.getElementById('connecte').innerHTML = 'Bonjour '+ id;//change le texte du bouton "se connecter - Inscription"
        }
		//message si mot de passe incorrecte
        else{
			texte = "Mot de passe incorrecte";
			document.getElementById('message').innerHTML = texte ;
			$('#messageModal').modal('show');
        }
    }
	//message si identifiant n'existe pas
    else{
		texte = "Votre compte n'existe pas. Veuillez-vous inscrire";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
    }
}

//Ajout dans la Map l'identifiant est le mot de passe
function inscription() {
	let texte;
    let id = document.getElementById('identifiant').value;
	let passe = document.getElementById('passe').value;
    let idfaux = /^[A-Za-z-0-9]*$/.test(id);//test si l'identifiant ne contient que des lettres, des chiffres ou des tirets
	
	//message si l'identifiant non conforme à l'expression régulière
    if (idfaux == false) {
		texte = "L'identifiant ne peut contenir que des lettres des chiffres et des '-'";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
    }
	//message si identifiant vide
	else if (id == "") {
		texte = "Vous devez remplir le champ 'identifiant'";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
	}
	//message si mot de passe vide
	else if (passe == "") {
		texte = "Vous devez remplir le champ 'Mot de passe '";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
	}
	//ajout dans Map et message identifiant correcte et mot de passe non vide
	else{
		log.set(id, passe);//ajout identifiant et mot de passe dans la Map
		texte = "Le compte est bien crée";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
		$('#loginModal').modal('hide');//cache le code modal de connection  
	}
}

//test si connection
function testConnecte(){
	let texte = 'message';
	//message si le texte du bouton "Se connecter - Inscription" n'a pas changé (non connecté) 
	if(document.getElementById('connecte').innerHTML == 'Se connecter - Inscription'){
		texte = "Vous devez être connecté pour créer un évennement";
		document.getElementById('message').innerHTML = texte ;
		$('#messageModal').modal('show');
		}
	//rend visible le code modal du formulaire de création d'événement si connection
	else{$('#formulaireModal').modal('show');}
}

//retire la classe "fermer" aux boutons close des événement 
function resetClose(){
	let closes = document.getElementsByClassName('close');
	let htmlString = '<div aria-hidden="true" class="fiche">&times;</div>';
	let nbLignes = closes.length;
	for(var i=0; i<nbLignes; i++){
		closes[i].innerHTML=htmlString;	
	}
}

//rend invisible les événements en fonction des filtres sélectionnés
function recherche(){
	let titre;
	let regTitre = new RegExp(document.getElementById('formTitre').value, 'i');
	let regLieu = new RegExp(document.getElementById('formLieu').value, 'i');
	let regDesc = new RegExp(document.getElementById('formDescription').value, 'i');
	let regIcon1 = new RegExp(document.getElementById('icone1').value);
	let regIcon2 = new RegExp(document.getElementById('icone2').value);
	supprimeFiltre();
	let nbLignes = nbr_lignes('body1');
	for(var i=0; i<nbLignes; i++){
		//si check "Avant la date" 
		if($("#ckAvant").is(":checked")){
			//si date début événement >= date formulaire
			if(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('small')[2].innerHTML >= document.getElementById("dateAvant").value){
			  invisible(i);
			}
		}
		//si check "Après la date"   
		if($("#ckApres").is(":checked")){
			//si date de fin événement <= date formulaire
			if(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('small')[3].innerHTML <= document.getElementById("dateApres").value){
				invisible(i);
			}
		}
		//si check "Entre les 2 dates" 
		if($("#ckEntre").is(":checked")){
			//si date de début événement > date après formulaire ou date de fin événement < date avant formulaire 
		    if(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('small')[3].innerHTML < document.getElementById("dateAvant").value
			|| document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('small')[2].innerHTML > document.getElementById("dateApres").value){
				invisible(i);
			}
		}
		//si "Titre" formulaire non vide
		if(document.getElementById('formTitre').value != ''){
			//si Titre événement contient Titre formulaire
			if (regTitre.test(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('a')[1].innerHTML)!= true) {
				invisible(i);
			} 
		}
		//si "Lieu" formulaire non vide
		if(document.getElementById('formLieu').value != ''){
			//si Lieu événement contient Lieu formulaire
			if (regLieu.test(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('h5')[0].innerHTML)!= true) {
				invisible(i);
			} 
		}
		//si "Description" formulaire non vide
		if(document.getElementById('formDescription').value != ''){
			//si Description événement contient Description formulaire
			if (regDesc.test(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('p')[0].innerHTML)!= true) {
				invisible(i);
			} 
		}
		//si choix icone 1 ou choix icone 2
		if(document.getElementById('icone1').value != '' || document.getElementById('icone2').value != ''){
			//rien si icone événement = choix icone 1 formulaire 
			if (regIcon1.test(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('img')[1].src)== true
				&& document.getElementById('icone1').value != ''){}
			//rien si icone événement = choix icone 2 formulaire
			else if(regIcon2.test(document.getElementById('body1').getElementsByTagName('span')[i].getElementsByTagName('img')[1].src)== true
				&& document.getElementById('icone2').value != ''){}
			//sinon invisible
			else{invisible(i);}
		} 
	}
}

//rend invisible un événement
function invisible(row) {
    document.getElementById('body1').getElementsByTagName('span')[row].style.display = 'none';
}

//met la classe "fermer" au bouton close d'un événement si click sur la croix et connection
$(document.body).on('click', '.close' ,function(){
	var htmlString = '<div aria-hidden="true" class="fermer">&times;</div>';
	var texte = 'message';	
	//alert($( this ).html());
	//test si connecté
	if($( this ).html().indexOf('fiche') >= 0){
		//Message si non connecté
		if(document.getElementById('connecte').innerHTML == 'Se connecter - Inscription'){
			texte = "Vous devez être connecté pour supprimer un évennement";
			document.getElementById('message').innerHTML = texte ;
			$('#messageModal').modal('show');
		}
		//Rend visible le code modal de suppression d'événement et écrit la classe "fermer"
		else{
			$( this ).html(htmlString);
			$('#supprimeModal').modal('show');	
		}
	}
	
});	

//Lorsque la souris entre dans l'événement
$(document).on('mouseenter', 'span', function(){
    $(this).css("background-color", "#333");//On modifie la couleur de fond au span
});

//Lorsque la souris ressort de l'événement
$(document).on('mouseleave', 'span', function(){
    $(this).css("background-color", "#666");//On remet la couleur d'origine
});
