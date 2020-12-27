export class Slider {
	constructor(selector) {
		this.container = document.querySelector(selector);
		this.slider =  [
			{ image: '../img/slider/intro.jpg', titre: 'Votre vélo réservé en quelques clicks !', para: '' },
			{ image: '../img/slider/instruction1.png', titre: '1 - Selectionnez une station', para: 'Cliquez ou zoomez sur le marqueur indiquant la zone où vous souhaitez louer votre vélo' },
			{ image: '../img/slider/instruction2.png', titre: '2 - Consultez les informations', para: 'Prenez connaissance de l\'adresse de la station et vérifiez la disponiblé de votre vélo' },
			{ image: '../img/slider/instruction3.png', titre: '3 - Réservez votre vélo', para: 'Remplissez le formulaire et consultez le récapitulatif de votre réservation ' },
		];
		this.i = 0;
		this.time = 5000;
		this.timer;
		this.containerLecteur = this.container.querySelector(".slider-player-controls");
		this.playButton = this.container.querySelector('.play-button');  
		this.pauseButton = this.container.querySelector('.pause-button');
		this.displayPauseButton = this.container.querySelector(".pause-button");
		this.leftArrow = this.container.querySelector('.left-arrow');
		this.rightArrow = this.container.querySelector('.right-arrow');
		this.installEventHandlers();   
	}

	installEventHandlers = () => {
		document.addEventListener('keydown', this.checkKey.bind(this));   
		this.leftArrow.addEventListener('click', this.prevImageAndText.bind(this));
		this.rightArrow.addEventListener('click', this.nextImageAndText.bind(this));
		this.playButton.addEventListener('click', this.playButtonControls.bind(this));
		this.pauseButton.addEventListener('click', this.pauseButtonControls.bind(this)); 

	}

	refresh = () => {
		document.querySelector(".slider-img").src = this.slider[this.i].image;
		document.querySelector(".main-instruction").innerHTML = this.slider[this.i].titre;
		document.querySelector(".additional-instructions").innerHTML = this.slider[this.i].para;
	}
	
	nextImageAndText = () => {
		if (this.i < this.slider.length - 1) {
			this.i++;
		}
		else {
			this.i = 0;
		}
		this.refresh(); 
	}
	
	prevImageAndText = () => {
		if (this.i <= 0) {
			this.i = this.slider.length - 1;
		}
		else {
			this.i--;
		}
		this.refresh();
	}

	checkKey = (event) => {
		if (event.key == 'ArrowLeft') {
			this.prevImageAndText();
			event.stopPropagation();
		}   
		
		else if (event.key == 'ArrowRight') {
			this.nextImageAndText();
			event.stopPropagation();
		}
	}

	changeImageAndText = () => {
		this.timer = setInterval(changeImageAndText => {
		this.nextImageAndText();
		}, this.time);
	}

	playButtonControls = () => {
		this.changeImageAndText();
		this.containerLecteur.replaceChild(this.pauseButton, this.playButton);
		this.displayButton();
	}

	pauseButtonControls = () => {
		this.pauseTimer();
		this.containerLecteur.replaceChild(this.playButton, this.pauseButton);
	}

	displayButton = () => {
		this.displayPauseButton.classList.remove("hide");
	}

	pauseTimer = () => {
		clearTimeout(this.timer);
	}
}

