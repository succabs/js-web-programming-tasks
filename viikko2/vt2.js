// voit tutkia tarkemmin käsiteltäviä tietorakenteita konsolin kautta
// tai json-editorin kautta osoitteessa http://jsoneditoronline.org/
// Jos käytät json-editoria niin avaa datat osoitteista:
// http://appro.mit.jyu.fi/tiea2120/vt/vt2/data.json
// http://appro.mit.jyu.fi/tiea2120/vt/vt2/tupa.json
//
// http://jsoneditoronline.org/?url=http%3A%2F%2Fappro.mit.jyu.fi%2Ftiea2120%2Fvt%2Fvt2%2Fdata.json
// http://jsoneditoronline.org/?url=http%3A%2F%2Fappro.mit.jyu.fi%2Ftiea2120%2Fvt%2Fvt2%2Ftupa.json

"use strict";

window.onload = function() {

console.log(data);

console.log(tupa);

//TASO 1 koodi alkaa tästä

/** Tehdään taulukko, jossa joukkueet aakkosittain ja pisteet.
    Pisteet tasolla 1 on kaikilla nolla. **/
var jlista = document.getElementById("tupa");
var taulukko = document.createElement("table");
jlista.appendChild(taulukko);

var otsikko = document.createElement("caption");
otsikko.textContent = "Tulokset";
taulukko.appendChild(otsikko);

var tr = document.createElement("tr");
var thJ = document.createElement("th");
var thP = document.createElement("th");
thJ.textContent = "Joukkue";
thP.textContent = "Pisteet";
taulukko.appendChild(tr);
tr.appendChild(thJ);
tr.appendChild(thP);

/** järjestetään joukkueet aakkosittain **/
data.joukkueet.sort(function(a, b) {
    return (a.nimi > b.nimi) ? 1 : -1;
});

/** käydään aliohjelmassa silmukalla läpi aakkostettu joukkuelista.
    Jokainen joukkue laitetaan omalle rivilleen "tulokset"-otsikon alle.
    **/
function joukkueetTulostus() {
  let joukkueet = data.joukkueet;
  for (let i in joukkueet) {
    var tr = document.createElement("tr");
    var thJ = document.createElement("td");
    var thP = document.createElement("td");
    thJ.textContent = joukkueet[i].nimi;
    thP.textContent = " 0";
    taulukko.appendChild(tr);
    tr.appendChild(thJ);
    tr.appendChild(thP);
    }
}

joukkueetTulostus(); //käytetään edellistä funktiota.

/** Tehdään taulukko, jossa rastien koodit ja koordinaatit.
     Lista on järjestelty koodin mukaan aakkosjärjestyksessä.  **/
var rastit = document.createElement("table");

document.body.appendChild(rastit);

var Rtaulukko = document.createElement("table");

rastit.appendChild(Rtaulukko);

/** järjestetään rastit aakkosittain **/
function rastitAakkosittain() {
data.rastit.sort(function(a, b) {
    return (a.koodi > b.koodi) ? 1 : -1;
});
}

function rastitTulostus() {

  var trR1 = document.createElement("tr");
  var thRas1 = document.createElement("th");
  var thLat1 = document.createElement("th");
  var thLon1 = document.createElement("th");
  thRas1.textContent = "Rasti";
  thLat1.textContent = "Lat";
  thLon1.textContent = "Lon";
  Rtaulukko.appendChild(trR1);
  trR1.appendChild(thRas1);
  trR1.appendChild(thLat1);
  trR1.appendChild(thLon1);

  let rastit = data.rastit;
  for (let i in rastit) {
    var trR = document.createElement("tr");
    var thRas = document.createElement("td");
    var thLat = document.createElement("td");
    var thLon = document.createElement("td");
    thRas.textContent = rastit[i].koodi;
    thLat.textContent = rastit[i].lat;
    thLon.textContent = rastit[i].lon;
    Rtaulukko.appendChild(trR);
    trR.appendChild(thRas);
    trR.appendChild(thLat);
    trR.appendChild(thLon);
    }

}

rastitAakkosittain(); //käytetään aakkostusfunktiota.
rastitTulostus(); //käytetään edellistä funktiota.


/**Rastinlisäyslomake **/
var form = document.getElementsByTagName("form") [0];
var fieldset = document.createElement("fieldset");
form.appendChild(fieldset);
var legenda = document.createElement("legend");
legenda.textContent ="Rastin tiedot";
fieldset.appendChild(legenda);

//Lat-kohta
var p1 =  document.createElement("p");
var l1 = document.createElement("label");
l1.textContent = "Lat ";
var inputLat = document.createElement("input");
inputLat.setAttribute("type", "text");
inputLat.setAttribute("value", "");
fieldset.appendChild(p1);
p1.appendChild(l1);
l1.appendChild(inputLat);

//Lon-kohta

var p2 =  document.createElement("p");
var l2 = document.createElement("label");
l2.textContent = "Lon ";
var inputLon = document.createElement("input");
inputLon.setAttribute("type", "text");
inputLon.setAttribute("value", "");
fieldset.appendChild(p2);
p2.appendChild(l2);
l2.appendChild(inputLon);

//koodi-kohta

var p3 =  document.createElement("p");
var l3 = document.createElement("label");
l3.textContent = "Koodi ";
var inputKoodi = document.createElement("input");
inputKoodi.setAttribute("type", "text");
inputKoodi.setAttribute("value", "");
fieldset.appendChild(p3);
p3.appendChild(l3);
l3.appendChild(inputKoodi);

//nappi

var p4 =  document.createElement("p");
var b = document.createElement("button");
b.textContent = "Lisää rasti";
b.setAttribute("name", "rasti");
b.setAttribute("id", "rasti");
fieldset.appendChild(p4);
p4.appendChild(b);

/** katsotaan, että kaikissa kohdissa on tekstiä. Jos ei, kertoo siitä konsoliin.
    Jos kaikissa kohdissa tekstiä, lisätään uusi rasti ja päivitetään lista
    alapuolelle. **/
let button = document.querySelector("button");
button.addEventListener("click", function(e) {
  e.preventDefault();
  inputLat.setAttribute("value", inputLat.value);
  inputLon.setAttribute("value", inputLon.value);
  inputKoodi.setAttribute("value", inputKoodi.value);
  if(inputKoodi.getAttribute("value") === "" ||  inputLon.getAttribute("value") === "" ||  inputLat.getAttribute("value") === "") {
  console.log("kaikkia kohtia ei ole täytetty!")
} else {
  var uusiRasti = {
        "lon": inputLon.value,
        "koodi": inputKoodi.value,
        "lat": inputLat.value
  };

  lisaaRasti(uusiRasti);
  paivitaRastit();
}

});

/**funktio, joka lisää rastin tietorakenteeseen **/
function lisaaRasti(nimi) {
  data.rastit.push(nimi);

}

function paivitaRastit() {
  while(Rtaulukko.firstChild) {
      Rtaulukko.removeChild(Rtaulukko.firstChild);
  }
  rastitAakkosittain(); //käytetään aakkostusfunktiota.
  rastitTulostus(); //käytetään edellistä funktiota.
  }
}
