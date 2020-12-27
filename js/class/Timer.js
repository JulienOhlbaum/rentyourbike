export class Timer {
    constructor() {

        this.reservationPanel = document.getElementById('active_reservation_panel');  
        this.counterMinute = document.querySelector('#minute');
        this.counterSeconde = document.querySelector('#seconde');
        this.minute = 0;
        this.sec = 10;
        this.test = null;
    }
  
    
    timer = () => {
        let test = setInterval(() => {

            let arrayCounterSec = [this.sec];
            let arrayCounterMinutes = [this.minute];
           
            let counterSecondes_json = JSON.stringify(arrayCounterSec);
            sessionStorage.setItem("sec", counterSecondes_json);  

            let counterMinutes_json = JSON.stringify(arrayCounterMinutes);
            sessionStorage.setItem("min", counterMinutes_json); 

            if(this.minute == 0 && this.sec == 0) {
                localStorage.removeItem('user');
                sessionStorage.removeItem("station"); 
                sessionStorage.removeItem("min"); 
                sessionStorage.removeItem("sec"); 
                console.log('RESERVATION ANNULEE')
                clearInterval(test);
                this.minute = 19;
                this.sec = 59;
            }
              
            this.sec--;
                   
            if (this.sec == -1) {               
                this.minute --;
                this.sec = 59;
                
                if (this.minute < 10) {
                    this.minute = '0' + this.minute
                }          
            }
            if(this.sec < 10) {
                this.sec = '0' + this.sec;   
            }  
       }, 1000);
    }
    
    stop = () => {
        clearTimeout(this.test);
    }

    try = () => {
        this.minute= 20;
        this.sec= 0;     
    }

    catch = () => {
        if(sessionStorage.length > 1) { 
        this.reservationPanel.classList.remove("display");
        
        let counterMin = sessionStorage.getItem("min");
        let stateCounterMin = JSON.parse(counterMin);

        let counterSec = sessionStorage.getItem("sec");
        let stateCounterSec = JSON.parse(counterSec);

        this.sec= stateCounterSec;
        this.minute= stateCounterMin;
        this.timer();



        //this.counterMinute.textContent = stateCounterMin;
        //this.counterSeconde.textContent = stateCounterSec;
        }
    }


}







