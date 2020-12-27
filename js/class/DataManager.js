export class DataManager {
  constructor() {
    this.STORAGE_KEY = 'station data';
    this.data = this.loadDataFromLocalStorage(this.STORAGE_KEY);
  }

  async fetchData () {
    try {
      const response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a2862ba46ef012dea649c3c885b3e1ddce849dd6');
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData
      } else {
        console.error('server response : ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  saveDataToLocalStorage = (key, data) => {
    let jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  loadDataFromLocalStorage = (key) => {
    let jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData);
  }

  getData() {
    return new Promise((resolve, reject) => {
      if (this.data == null) {
        this.fetchData()
          .then((data) => {
            this.saveDataToLocalStorage(this.STORAGE_KEY, data);
            resolve(data);
          });
      } else {
        resolve(this.data);
      }
    })
  }
}





