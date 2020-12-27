import {Canvas} from "./Canvas.js";
export class Reservation {
  constructor() {
    this.canvas = new Canvas();
    this.cnv = document.querySelector('.canvas'); 
    this.webStorage = document.querySelector('.store');
    this.inputFirstname = document.querySelector(".firstname");
    this.inputLastname = document.querySelector('.lastname');
    this.warningMessage = document.querySelector('.warning-message');
    this.reservationPanel = document.querySelector('.reservation-confirmation-panel');     
    this.userInformation = document.querySelector('.user-information'); 
    this.stationAddress = document.querySelector('.station-address'); 
    this.reservationDate = document.querySelector('.réservation-date')
    this.address = document.querySelector(".reservation-station");
    this.cancelButton = document.querySelector(".cancel-reservation");
    this.currentStation = null;
    this.init();     
  }
  
  init = () => {
    this.clickOnReservationButon(); 
    this.hideWarningMessage(); 
    this.onClickCancelReservation();
    this.canvas.initCanvas();
    this.canvas.cleanCanvas();
    this.informationReservationPanel();
  }

  checkCanvas = () => {
    if (this.isCanvasEmpty(this.cnv))
      alert('Il vous faut signer le formulaire de réservation');
    else
      console.log('Signature chargée');
  };

  isCanvasEmpty = (cnv) => {
    const blank = document.createElement('canvas');
    blank.width = this.cnv.width;
    blank.height = this.cnv.height;
    return this.cnv.toDataURL() === blank.toDataURL();
  }

  
  clickOnReservationButon = () => {    
    this.webStorage.addEventListener('click', (e)=> {
      e.preventDefault()
      if(localStorage.length > 1) {       
        this.currentReservation();
      } else {
        this.verificationInformationForm();
        this.checkCanvas();
        this.store(this.currentStation);      
        this.informationReservationPanel();
        this.cleanFormAfterReservationOrCancellation();
      }
    })
  }
  
  currentReservation = () => {      
    this.verificationInformationForm();
    this.checkCanvas();

    if (this.inputFirstname.value != '' && this.inputLastname.value!='' && !this.isCanvasEmpty(this.cnv)) {
      if (confirm('Vous avez déjà une réservation en cours, souhaitez-vous la remplacer ?')) {
        this.store(this.currentStation);    
        this.informationReservationPanel(); 
        this.cleanFormAfterReservationOrCancellation(); 
      } else {
        console.log('Réseration annulée')
      }
    }
  }

  store = (data) => {          
    if(this.inputFirstname.value == '' || this.inputLastname.value == '' || this.isCanvasEmpty(this.cnv)) {
      console.log('Champs vides détectés')
    } else { 
      let userData = {
        firstName : this.inputFirstname.value,
        lastName : this.inputLastname.value
      }
  
      let userJsonData = JSON.stringify(userData);
      localStorage.setItem("user",userJsonData);
      
      let date1 = new Date();
      let dateLocale = date1.toLocaleString('fr-FR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'}
      );
  
      let stationInformations = {
        number: data.number,
        name: data.name,
        address: data.address,
        createdAt: dateLocale
      };
  
      let stationInformations_json = JSON.stringify(stationInformations);
      sessionStorage.setItem("station", stationInformations_json);  
    } 
  }

  informationReservationPanel = () => {
    if(( this.inputFirstname.value != '' && this.inputLastname.value!='' && !this.isCanvasEmpty(this.cnv)) || localStorage.length > 1) { 
      $(document).ready(function () {
        $(".reservation-confirmation-panel").slideDown();
        $(function() {
          function scrollTo( target ) {
            if( target.length ) {
                $("html, body").stop().animate( { scrollTop: target.offset().top }, 1500);
            }
          }
          scrollTo( $(".cancel-reservation") );
        });
      });
      
      let userJsonData = localStorage.getItem("user");
      let userData = JSON.parse(userJsonData);
  
      let stationJsonData = sessionStorage.getItem("station");
      let stationData = JSON.parse(stationJsonData);

      this.reservationDate.innerText = "Effectuée le " + stationData.createdAt;
      this.userInformation.innerText = "Titulaire : " + userData.firstName + ' ' + userData.lastName;
      this.stationAddress.innerText = "Vélo réservé à la station : " + stationData.address;
    }
  }

  verificationInformationForm = () => {  
    if (this.inputFirstname.value == '' || this.inputLastname.value == '') {
      this.warningMessage.innerHTML= "Veuillez indiquer votre nom et votre prénom"
    } else if (this.inputFirstname.value == '' && this.inputLastname.value == '') {
      this.warningMessage.innerText= "Veuillez indiquer votre nom et votre prénom"
    } else {
      console.log('Informations vérifiées');
    }
  }
  
  hideWarningMessage = () => {
    this.inputFirstname.addEventListener("change", () => {
      this.warningMessage.innerHTML="";
    })
    this.inputLastname.addEventListener("change", () => {
      this.warningMessage.innerHTML="";
    })
    this.cnv.addEventListener("click", () => {
      this.warningMessage.innerHTML="";
    })
    if(this.inputFirstname.value != '' && this.inputLastname.value != '') {
      this.warningMessage.innerHTML="";
    }
  }

  cleanFormAfterReservationOrCancellation = () => {
    if(this.inputFirstname.value != '' && this.inputLastname.value !='' && !this.isCanvasEmpty(this.cnv)) {    
      this.inputFirstname.value='';
      this.inputLastname.value=''; 
      this.canvas.cleanCanvasAfterReservation();                         
    }
  }
  
  onClickCancelReservation = () => {
    this.cancelButton.addEventListener('click', () => {
      localStorage.removeItem('user');
      sessionStorage.removeItem("min");
      sessionStorage.removeItem("sec");  
      sessionStorage.removeItem("station"); 
      alert('Reservation annulée');  

      $(document).ready(function () {
          $('.reservation-confirmation-panel').slideUp();
      });
    });
  }
}




