const address = [59.938845466098286, 30.323036669716675];
const myMap = L.map('mapid').setView(address, 18);
const popup = L.popup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidW5zaGFkeSIsImEiOiJja3UybDVnZ3kycWgzMnJxdG5kdWwyZmY5In0.Jy6WrtsPkS4v3Z-oSOBuuQ'
}).addTo(myMap);

const myIcon = L.icon({
  iconUrl: './img/map-pin.svg',
  shadowUrl: './img/map-pin-shadow.png',
  iconSize: [67, 99],
  shadowSize: [118, 100],
  iconAnchor: [20, 55],
  popupAnchor: [0, 0],
  shadowAnchor: [20, 55]
});

const marker = L.marker(address, {icon: myIcon}).addTo(myMap);

const pinnedAddress = L.popup({maxWidth: 200})
  .setLatLng([59.93899, 30.323108])
  .setContent('г. Санкт-Петербург, ул. Большая Конюшенная, д. 19/8, офис 101')
  .openOn(myMap);

L.popup(pinnedAddress);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Текущие кооринаты на карте " + e.latlng.toString())
    .openOn(myMap);
}

myMap.on('click', onMapClick, {once: true})
