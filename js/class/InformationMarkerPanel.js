export class MarkerPanel {
  constructor() {    
    this.marker = L.marker();
    this.address = document.querySelector(".address-station");
    this.name = document.querySelector(".name-station");
    this.availableBikes = document.querySelector(".available-bikes");
    this.availableSeats = document.querySelector(".available-locations");
  }

  openPanel = (data) => {         
    $(document).ready(function () {
      $(".station-informations-panel").fadeIn();

      $(".reservation").click(function () {    
        $(".bike-reservation-panel").slideDown();
      });

      $(".close-panel").click(function () {
        $(".station-informations-panel").fadeOut();
      });

      $(".close-form").click(function () {
        $(".bike-reservation-panel").slideUp();
      });
    });

    this.address.innerHTML = data.address;
    this.name.innerHTML = data.name;
    this.availableBikes.innerHTML = data.available_bike_stands;
    this.availableSeats.innerHTML = data.available_bikes;
  }
}



