import {Slider} from "./Slider.js";
import {DataManager} from "./DataManager.js";
import {Map} from "./Map.js";
import {Reservation} from "./Reservation.js";
export class App {
	constructor() {
		this.slider = new Slider('.main-slider');
		this.dataManager = new DataManager();
		this.map = new Map();
		this.reservation = new Reservation();
	}

	init(){
		this.dataManager.getData()
			.then(data => {
					const addMarkers = this.map.addMarkers 
					addMarkers(data, this.onClickMarker);
			})
	}

	onClickMarker = (data) => {
		this.reservation.currentStation = data;
	}
}



