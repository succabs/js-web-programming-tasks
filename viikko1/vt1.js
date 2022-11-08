"use strict";

// 1-VAIHE ALKAA TÄSTÄ!

/** funktio, joka tulostaa joukkueet omalle rivilleen **/
function joukkueetTulostus() {
  let joukkueet = data.joukkueet;
  console.log(joukkueet);
  for (let i in joukkueet) {
    console.log(i + " : " + joukkueet[i].nimi);
    }
}

/**funktio, joka lisää joukkueen tietorakenteeseen **/
function lisaaJoukkue(nimi) {
  data.joukkueet.push(nimi);
}

/** joukkue, joka lisätään tietorakenteeseen **/
var malliJoukkue = {
      "nimi": "Mallijoukkue",
      "last": "2017-09-01 10:00:00",
      "jasenet": [
        "Tommi Lahtonen",
        "Matti Meikäläinen"
      ],
      "sarja": 5639189416640512,
      "seura": null,
      "id": 99999
};

lisaaJoukkue(malliJoukkue); //lisätään joukkue tietorakenteeseen aiemmalla funktiolla
joukkueetTulostus(); //tulostetaan joukkueet, mukana myös äsken lisätty joukkue

var lukuRastit = {}; //tähän tallenneteaan kaikki rastit, joissa kokonaisluku alussa

/** funktio, joka tulostaa kaikki kokonaisluvulla alkavien rastien koodit **/
function kokonaisLuku() {
  let rastit = data.rastit;
  for(let i=0; i<rastit.length; i++) {
  let koodi = rastit[i].koodi;
  if (parseInt(koodi)) {
  lukuRastit[i] = koodi;
  }
  }
}

kokonaisLuku(); //käytetään edellistä funktiota
console.log(lukuRastit); //tulostetaan edellisen funktion rastit

// 3-VAIHE ALKAA TÄSTÄ!

//funktio, joka osaa poistaa nimen perusteella joukkueen
function poistaJoukkue(e) {
  let joukkueet = data.joukkueet;
  for(let i=0; i<joukkueet.length; i++) {
    let jnimi = joukkueet[i].nimi;
    if (jnimi === e) {
      joukkueet.splice(i, 1);
    }
  }
}

/** poistetaan edellisellä funktiolla kolme joukkuetta **/
poistaJoukkue("Vara 1");
poistaJoukkue("Vara 2");
poistaJoukkue("Tollot");

/** järjestetään joukkueet aakkosittain **/
data.joukkueet.sort(function(a, b) {
    return (a.nimi > b.nimi) ? 1 : -1;
});

/** ruvetaan käymään tupaa läpi aliohjelmien avulla, otetaan joukkue kerrallaan
    pisteet ylös. Selvitetään tiimin ID ja pisteet rasteittain, viimeinen
    aliohjelma laskee joukkueen pisteet yhteen. pisteLasku() tulostaa
    lopuksi konsoliin joukkueen nimen ja pisteet. **/
function pisteLasku() {
  let tiimi = data.joukkueet;
  for(let i=0; i<tiimi.length; i++) {
    let tiiminID = katsoId(tiimi[i].id);
    let pisteet = rastinPisteet(tiiminID);
    console.log(data.joukkueet[i].nimi + " " + pisteet);

  }
}

//tarkistaa joukkueen id:n, että data vastaa tupaa
function katsoId(id) {
  let joukkueenid = tupa.joukkueen_id;
  for(let i=0; i<25; i++) {
    if (id == joukkueenid[i]) {
      return i;
    }
  }
}

// tarkistaa joukkueen id:n avulla rasteista saadut pisteet. Käyttää apuna
// pisteHaku-aliohjelmaa.
function rastinPisteet(id) {
  let apu = tupa.tupa;
  let tulos = 0;
  let aputulos = 0;
  for(let i=0; i < apu.length; i++) {
    let y = apu[i];
    if(id==y.j){
      aputulos = pisteHaku(y.r);
      tulos+=aputulos;
    }
  }
  return tulos;
}

function pisteHaku(y) {
  let haettava=tupa.rastin_id;
  let x=haettava[y];
  let tulos = laskeKaikkiYhteen(x);
  return tulos;
}

//katsotaan lopussa parseintillä ja isintegerillä, että eka merkki on numero.
//jos on, niin lasketaan se pisteisiin. lopussa palautetaan tiimin pisteiden
//yhteismäärä.
function laskeKaikkiYhteen(x) {
  let haettavat = data.rastit;
  let lasku=0;
  for(let i=0; i < haettavat.length;i++) {
    let y=haettavat[i];
    if(x==y.id){
      let A=y["koodi"].substring(0,1);
      let B=parseInt(A);
      if(Number.isInteger(B)) {
        lasku = lasku + B;
        return lasku;
      }
    }
  }
  return lasku;
}

//kutsutaan pisteLasku()-aliohjelmaa.
pisteLasku()
