import { MarkerPanel } from "./InformationMarkerPanel.js";
export class Map {
  constructor() {
    this.mymap = L.map('map', { scrollWheelZoom: false }).setView([45.760210, 4.841985], 13);
    this.stamenToner = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoianVsaWVuNzc0MTAiLCJhIjoiY2s4enMwdzBtMHVrazNnczc3OHpmYzM1diJ9.Gr9wYY-xjxGeA5SBFmJg3A',
    })
    this.panel = new MarkerPanel();                  
    this.mymap.addLayer(this.stamenToner);   
    this.panelStationsInformations = document.querySelector(".station-informations-panel");
    this.panelBikesReservations = document.querySelector(".bike-reservation-panel");
    this.stopMapDraggingInforamationPanel();
    this.stopMapDraggingReservationPanel();
  }

  addMarkers = (data, onClickMarker) => {

    var markers = new L.MarkerClusterGroup();

    for (let p = 0; p < data.length; p++) {

      const marker = L.marker(data[p].position)

      markers.addLayer(marker)

      marker.bindPopup('<strong>Station : </strong>' + (data[p].name))

      marker.on('mouseover', function () {
        this.openPopup();
      })

      marker.on('click', () => {
        this.panel.openPanel(data[p]);
        onClickMarker(data[p]);
      })

      this.mymap.addLayer(markers);      
    }   
  }

  stopMapDraggingInforamationPanel = () => {
    this.panelStationsInformations.addEventListener('mouseover', this.panelMouseOver);
    this.panelStationsInformations.addEventListener('mouseout', this.panelMouseOut);
  }

  stopMapDraggingReservationPanel = () => {
    this.panelBikesReservations.addEventListener('mouseover', this.panelMouseOver);
    this.panelBikesReservations.addEventListener('mouseout', this.panelMouseOut);
  }

  panelMouseOver = () => {
    this.mymap.dragging.disable();
  }
  
  panelMouseOut = () => {
    this.mymap.dragging.enable();
  }
}






