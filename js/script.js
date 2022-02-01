window.addEventListener("DOMContentLoaded", (event) => {

    //Chargement
    /*Création d'une fonction Chargement qui va ajouter la class hidden 
    pour cacher la div qui comporte la class chargement et enlever la class scroll de la balise html le tout au bout de 3500ms*/
    function Chargement() {
        document.querySelector('.chargement').classList.add('hidden');
        document.querySelector('html').classList.remove('scroll');
    }
    setTimeout(Chargement, 3500);

    //CURSEUR
    //création de deux variable qui va récuperer les balises qui comporte la class curseur et curseur2
    var mouseCursor = document.querySelector(".curseur", ".curseur2");
    var mouseCursor2 = document.querySelector(".curseur2");


    //j'ajoute un eventlistener des mouvements de la souris 
    window.addEventListener('mousemove', cursor);

    //Je créer une fonction qui va déplacer la div en fonction de la position du curseur
    function cursor(curs) {
        mouseCursor.style.top = curs.pageY + 'px';
        mouseCursor.style.left = curs.pageX + 'px';
    }

    //Je fais la meme chose que le premier curseur pour avoir un petit point au millieu 
    window.addEventListener('mousemove', cursor2);

    function cursor2(curs2) {
        mouseCursor2.style.top = curs2.pageY + 'px';
        mouseCursor2.style.left = curs2.pageX + 'px';
    }

    window.addEventListener('mouseenter', function(e) {
        mouseCursor.classList.toggle('liencurseur');
    });

    //Popup mention légale
    /*Création de 3 variables où on va selectionner le boutton pour activer le popup "var popUpBtn", 
    le popup pour l'activer et le désactiver désactiver "var volet" et le bouton pour le fermer "var closevolet" */
    var popUpBtn = document.getElementById('volet-btn');
    var volet = document.getElementById('volet');
    var closevolet = document.querySelector(".volet-invisible a.close");

    //fonction qui detecte le click pour afficher le volet en ajoutant une class
    popUpBtn.addEventListener('click', function(e) {
        volet.classList.add('volet-visible');
    });

    //fonction qui detecte le click pour cacher le volet avec la supression d'une class
    closevolet.addEventListener('click', function(e) {
        e.preventDefault()
        volet.classList.remove('volet-visible');
    });

    //fonction qui detecte le click pour cacher le volet avec la supression d'une class
    window.addEventListener('mouseup', function(e) {
        if (e.target !== volet && e.target.parentNode !== volet) {
            volet.classList.remove('volet-visible');
        }
    });

    //on va chercher le fichier .json et on crée la fonction response
    fetch('js/analogies.json').then(function(response) {
        response.json().then(function(data) {
            function ajouteanal(data) {
                //avec la fonction data qui contien le json on crée fonction qui va chercher avec le parametre f
                data.forEach(function(d) {
                    //on crée une nouvelle section 
                    var blocAnal = document.createElement("section");
                    //on ajoute une class à cette section
                    blocAnal.classList.add('bg-section' + d.num);
                    //on ajoute du contenu dans le "blocAnal"
                    blocAnal.innerHTML =
                        '<div class="block">' +
                        '<div class="si"> SI J\'ÉTAIS ' + d.si + '</div>' +
                        '<div class="serais"> JE SERAIS ' + d.serais + '</div>' +
                        '<div class="justification-img ' + d.even + '">' +
                        '<div class="tel"><img src="' + d.img + '" alt="' + d.alt + '"></div>' +
                        '<p class="justification">' + d.txt + '</p>' +
                        '</div>' +
                        '</div>';
                    //on ajoute le "blocAnal" dans une balise main
                    document.querySelector("main").append(blocAnal);
                });
            }
            ajouteanal(data)
        })
    })

    //on set les valeur par defaut du formulaire dans le stockage local du naviguateur
    localStorage.setItem("siJetais", "(Article + Mot)");
    localStorage.setItem("jeSerais", "(Article + mot)");
    localStorage.setItem("justif", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolore eveniet optio dolores dignissimos voluptatem nesciunt neque explicabo. Voluptatibus voluptas odit tempora corrupti nobis consectetur molestiae deleniti commodi. Consequuntur laborum in unde eaque. Maiores, amet? In odio atque dicta velit placeat doloremque nam cum assumenda alias nemo distinctio, numquam temporibus inventore animi praesentium voluptatum blanditiis sint a iste impedit! Commodi.");
    localStorage.setItem("image", "https://cdn.discordapp.com/attachments/734179817502539779/929024303368925225/exemple.jpg");


    /* On recupere les les valeurs du formulaire apres le click */
    //On crée des variable des inputs
    var si = document.getElementById("si");
    console.log(si);
    var serais = document.getElementById("serais");
    console.log(serais);
    var justification = document.getElementById("justification");
    console.log(justification);
    var image = document.getElementById("image");
    console.log(image);



    /* On recupere les les valeurs du formulaire pendant l'écriture */
    /* je met les valeurs dans le stockage local du naviguateur */
    si.addEventListener('input', (e) => {
        localStorage.setItem("siJetais", e.target.value);
        afficheItems()
    })

    serais.addEventListener('input', (e) => {
        localStorage.setItem("jeSerais", e.target.value);
        afficheItems()
    })

    justification.addEventListener('input', (e) => {
        localStorage.setItem("justif", e.target.value);
        afficheItems()
    })

    image.addEventListener('input', (e) => {
        localStorage.setItem("image", e.target.value);
        afficheItems()
    })




    /* Création du bloc envoyer en insérant les valeurs du stockage du naviguateur */
    //On crée une function qui va permettre de detecter si il y a un input modifier et de l'afficher dans ce cas 
    function afficheItems() {
        var blocenvoyer;
        if (document.querySelector(".bg-section-newblock") == undefined) {
            blocenvoyer = document.createElement("section");
            blocenvoyer.classList.add('bg-section-newblock');
        } else {
            blocenvoyer = document.querySelector(".bg-section-newblock");
        }

        //dans le bloc "blocenvoyer" on ajoute les valeurs des input
        blocenvoyer.innerHTML =
            '<div class="block">' +
            '<div class="si"> SI J\'ÉTAIS ' + localStorage.getItem("siJetais") + '</div>' +
            '<div class="serais"> JE SERAIS ' + localStorage.getItem("jeSerais") + '</div>' +
            '<div class="justification-img even">' +
            '<div class="tel"><img class="img-crée" src="' + localStorage.getItem("image") + '" alt=""></div>' +
            '<p class="justification">' + localStorage.getItem("justif") + '</p>' +
            '<p id="confirmation"></p>'
        '</div>' +
        '</div>';
        //on ajoute "blocenvoyer" dans une section avec la class bg-section
        document.querySelector("section.bg-section").append(blocenvoyer);
    }

    //on crée des variable avec les id du formulaire, du boutton envoyer et du boutton modifier
    var envoyer = document.getElementById('button');
    var form = document.getElementById('form');
    var modifform = document.getElementById('modifform');

    envoyer.addEventListener('click', function(e) {
        //api pour envoyer les données du formulaire dans une base de données
        var urlapi = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=drissbenadjal&courriel=" + document.querySelector("#mail").value + "&message=Si j'étais :" + si + " je serais ... " + serais + " Justification : " + justification + "Lien image" + image;

        fetch(urlapi).then(function(responseapi) {
                responseapi.json().then(function(api) {
                    if (api.status == "success") {
                        document.getElementById("confirmation").innerHTML = "Votre message a bien été reçu, si vous voulez supprimez la proposition de notre base de donnée contactez <a href='mailto:'>philippe.gambette@univ-eiffel.fr</a>";
                        document.getElementById("confirmation").style.color = "green"
                    } else {
                        document.getElementById("confirmation").innerHTML = "Problème : votre message n'a pas été reçu";
                        document.getElementById("confirmation").style.color = "red";
                    }


                    function cacher() {
                        document.getElementById('confirmation').classList.add('hidden');
                    }
                    setTimeout(cacher, 5500);
                })
            })
            //Quand on click sur le boutton envoyer le formulaire devient invisible et le boutton modifier apparait
        form.classList.add('form-invisible');
        modifform.classList.remove('modif-form-invisible');
    });

    //Quand on click sur le boutton envoyer le boutton modifier devient invisible et le formulaire apparait  
    modifform.addEventListener('click', function(e) {
        modifform.classList.add('modif-form-invisible');
        form.classList.remove('form-invisible');
    });

});