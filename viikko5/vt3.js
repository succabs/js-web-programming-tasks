//1-tason vaatimusten mukaisesti tehty.

"use strict";


//ajetaan skripti, kun dom-objektit ovat latautuneet.
$( document ).ready(function() {

  //asetetaan kartan koko ja luodaan se. Kartta keskitetään rastien keskipisteeseen aliohjelmien avulla.
  var div = $("#map");
  div.css("width", "50vw");
  div.css("height", "100vh");
  let mymap = new L.map('map', {
     crs: L.TileLayer.MML.get3067Proj()
   }).setView([annaLat(), annaLon()], 8);
L.tileLayer.mml_wmts({ layer: "maastokartta" }).addTo(mymap);

  //säädetään kartalla- ja joukkueosioiden koot samaan tapaan kuin kartan, koska
  //se on kätevää tässä. Suoraa copypastea ylemmästä, eri arvoilla vain.
  var div = $("#drop");
  div.css("width", "25vw");
  div.css("height", "100vh");

  //kts. ylempi
  var div = $("#joukkue");
  div.css("width", "25vw");
  div.css("height", "100vh");

//kutsutaan aliohjelmia.
Joukkueet();
piirraRastit(mymap);
lisaaKarttaan();
lisaaJoukkueeseen();

//muuttuja, jota lisaaKarttaan ja lisaaJoukkueeseen-aliohjelmat käyttävät
//hyödykseen.
let rastitKartalla = [];

//laitetaan joukkueen nimen droppaamiselle event, joka kertoo mitä tehdään.
//otetaan joukkueen nimi text-muodossa, ja haetaan sen perusteella id jonka
//perusteella haetaan joukkueen kulkemat rastit piirraReitti-aliohjelmalla.
function lisaaKarttaan() {
let drop = document.getElementById("drop");
drop.addEventListener("dragover", function(e) {
  e.preventDefault();
 e.dataTransfer.dropEffect = "move"
});
drop.addEventListener("drop", function(e) {
 e.preventDefault();
 var dataa = e.dataTransfer.getData("text");
 e.target.appendChild(document.getElementById(dataa));
 let target = e.target;
 if (target.className == "droppable") target = target.parentNode;
if (target.className == "drop") {
    if (reverse == true) { // Jos siirretään Kartalla->Joukkue, poistetaan piirretty viiva
        target.appendChild(document.getElementById(data));
        for (var i = 0; i < rastitKartalla.length; i++) {
            if (rastitKartalla[i]["id"] == data) {
                kartta.removeLayer(rastitKartalla[i]["polyline"]);
            }
        }
      }
    }
 let array = [];
 let joukkue;
 for(let i in data.joukkueet) {
   if(data.joukkueet[i].id == dataa) {
     joukkue = data.joukkueet[i];
   }
 }
     for(let i in joukkue.rastit) {
       for(let k in data.rastit) {
         if(data.rastit[k].id == joukkue.rastit[i].id) {
           let rasti = [];
             rasti.push(data.rastit[k]["lat"]);
             rasti.push(data.rastit[k]["lon"]);
             array.push(rasti);
         }
       }
     }
     let piirrettyJo = [];
     let firstChild = target.firstChild;
if (firstChild != null) target.insertBefore(document.getElementById(dataa), firstChild);
else target.appendChild(document.getElementById(dataa));
     piirrettyJo["id"] = dataa;
     let vari = document.getElementById(dataa).style.backgroundColor;
         let polyline = L.polyline(array, {color: vari}).addTo(mymap);
         piirrettyJo["polyline"] = polyline;
        rastitKartalla.push(piirrettyJo);
});
}

//lähes suora copypaste aiemmasta, mutta piirtämisen sijaan poistetaan viiva.
//olisi varmaan saanut järkevästi tehtyä jonkun yhteisen aliohjelman, en keksinyt
//niin tuli tämmöinen purkkaratkaisu. Toimii kuitenkin.
function lisaaJoukkueeseen() {
let drop = document.getElementById("joukkue");
drop.addEventListener("dragover", function(e) {
  e.preventDefault();
 e.dataTransfer.dropEffect = "move"
});

drop.addEventListener("drop", function(e) {
 e.preventDefault();
 var dataa = e.dataTransfer.getData("text");
 e.target.appendChild(document.getElementById(dataa));
 let target = e.target;
 if (target.className == "droppable") target = target.parentNode;
 let array = [];
 let joukkue;
 for(let i in data.joukkueet) {
   if(data.joukkueet[i].id == dataa) {
     joukkue = data.joukkueet[i];
   }
 }
     for(let i in joukkue.rastit) {
       for(let k in data.rastit) {
         if(data.rastit[k].id == joukkue.rastit[i].id) {
           let rasti = [];
             rasti.push(data.rastit[k]["lat"]);
             rasti.push(data.rastit[k]["lon"]);
             array.push(rasti);
         }
       }
     }
     if (target.className == "drop") {
                         target.appendChild(document.getElementById(dataa));
                         for (var i = 0; i < rastitKartalla.length; i++) {
                             if (rastitKartalla[i]["id"] == dataa) {
                                 mymap.removeLayer(rastitKartalla[i]["polyline"]);
                             }
                         }
                       }

});
}

});

//funktio, joka kutsuu aakkosaliohjelmaa sekä luo joukkuelistan ja tekee siitä dragattavan
//sekä dropattavan.
function Joukkueet(){
  JoukkueetAakkosittain();
  let joukkueet = data.joukkueet;
  let joukkue=document.getElementById("joukkue");
  joukkue.className = "drop";
  for (let i in joukkueet) {
    let li = document.createElement("li");
              joukkue.appendChild(li);
              li.textContent = data.joukkueet[i].nimi;
              li.id = data.joukkueet[i].id;
              li.className = "droppable";
              li.setAttribute("draggable", "true");
              li.style.backgroundColor = annaVari(i);
              li.addEventListener("dragstart", function(e) {
                  e.dataTransfer.setData("text/plain", li.getAttribute("id"));
            });
          }

}

//funktio, joka piirtää rastit punaisiksi pisteiksi kartalle.
//halkaisija 150, kuten ohjeessa oli.
function piirraRastit(map){
  for(let i in data.rastit) {
    var circle = L.circle(
        [data.rastit[i].lat, data.rastit[i].lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0,
            radius: 150
        }
      ).addTo(map);
  }
}

/** järjestetään joukkueet aakkosittain (aiemmalla viikolla tekemäni aliohjelma) **/
function JoukkueetAakkosittain(){
  data.joukkueet.sort(function(a, b) {
      return (a.nimi > b.nimi) ? 1 : -1;
  });
}

//annetaan jokaiselle uniikki väri taulukosta. ei kätevin ratkaisu, mutta toimii.
function annaVari(i) {
  let varit = ["red","tomato","DarkOrange","Orange","Yellow","Chartreuse","Lime","LimeGreen","DarkTurquoise","DeepSkyBlue","MediumBlue","DarkBlue","Navy","SlateBlue","Purple","PaleVioletRed","Orchid",
                "LightSalmon","HotPink","Fuchsia","DeepPink","DarkOrchid","BlueViolet"];
  return varit[i];
}

//seuraavaksi haetaan kaikkien koordinaattien lat- ja lon keskiarvot ja keskitetään
//kartta niihin, eli siis rastien keskipisteeseen.
function annaLat() {
    let rastit = data.rastit;
    let lat = 0;
    for(var i = 0; i < rastit.length; i++) {
        lat += parseFloat(rastit[i]["lat"]);
    }
    lat = (lat / rastit.length).toFixed(6);
    return lat;
}

//kts. ylempi
function annaLon() {
    let rastit = data.rastit;
    let lon = 0;
    for(var i = 0; i < rastit.length; i++) {
        lon += parseFloat(rastit[i]["lon"]);
    }
    lon = (lon / rastit.length).toFixed(6);
    return lon;
}
