// data-muuttuja sisältää kaiken tarvittavan ja on rakenteeltaan lähes samankaltainen kuin viikkotehtävässä 2
// Rastileimaukset on siirretty tupa-rakenteesta suoraan jokaisen joukkueen yhteyteen
//
// voit tutkia tarkemmin käsiteltävää tietorakennetta konsolin kautta
// tai json-editorin kautta osoitteessa http://jsoneditoronline.org/
// Jos käytät json-editoria niin avaa data osoitteesta:
// http://appro.mit.jyu.fi/tiea2120/vt/vt3/data.json

"use strict";

window.onload = function() {

/** järjestetään joukkueet aakkosittain **/
function aakkostus() {
data.joukkueet.sort(function(a, b) {
    return (a.nimi > b.nimi) ? 1 : -1;
});
}

aakkostus();

/** käydään aliohjelmassa silmukalla läpi aakkostettu joukkuelista.
    Jokainen joukkue laitetaan omalle rivilleen "tulokset"-otsikon alle.
    **/
var jlista = document.createElement("ul");
function joukkueetTulostus() {
  let joukkueet = data.joukkueet;
  document.body.appendChild(jlista);
  for (let i in joukkueet) {
    var li = document.createElement("li");
    li.textContent = joukkueet[i].nimi;
    jlista.appendChild(li);
    }
}

joukkueetTulostus();

// lomake globaalina talteen
var lomake;

// jäsenenlisäyssysteemit, jos viimeiseen laitetaan arvo ja klikataan muualle
// niin tulee uusi tyhjä ruutu.
function lomake() {
        // paikka, johon jäsenten lisäys tulee
        let p = document.getElementById("jlisa");
        lomake = document.createElement("fieldset");
        lomake.setAttribute("id", "lomake");
        p.parentNode.insertBefore(lomake, p.nextSibling);
        var legenda = document.createElement("legend");
        legenda.textContent ="Jäsenet";
        lomake.appendChild(legenda);

        lomake.appendChild( tekstikentta("jasen", "jäsen 1") );
        lomake.appendChild( tekstikentta("jasen", "jäsen 2") );
        lomake.appendChild( tekstikentta("jasen", "jäsen 3") );
        lomake.appendChild( tekstikentta("jasen", "jäsen 4") );
        lomake.appendChild( tekstikentta("jasen", "jäsen 5") );


}

function tekstikentta(nimi, teksti) {
        let label = document.createElement("label");
        label.textContent = teksti + " ";
        let input = document.createElement("input");
        label.style.display = "block";
        label.appendChild(input);
        input.setAttribute("name", nimi);
        input.setAttribute("type", "text");
        // uusien kenttien tarpeen tarkistus. ei käytössä nyt, sillä
        // tarvitsee vain 2-5 kpl jäseniä.
        //  input.addEventListener("blur", lisaa_ruutu);
        return label;
}

// jos viimeiseen tekstikenttään tulee tekstiä, luodaan uusi kenttä sen alle
//TODO: jäsenen järjestysnumero ei tule oikein, tulee vain "jäsen N". ei oleellinen
// kolmosviikon ykköstasolle.
function lisaa_ruutu(e) {

    let kentta = e.target;
    // lomakkeella seuraavana oleva objekti. Pitäisi olla label jos on vielä syöttökenttiä perässä
    let seuraava = kentta.parentNode.nextSibling;
    // jos kentän sisältö on tyhjä ja seuraavana tulee null eli lista loppuu, tehdään uusi ruutu.
    if ( kentta.value.trim() != "" && (seuraava == null) ) {
        lomake.insertBefore( tekstikentta("jasen", "Jäsen N"), seuraava);

    }
}

lomake();

//funktio, joka ottaa jäsenten nimet listasta.
function getJasenet() {
  let jasenet = [];
  var fields = document.querySelectorAll("input[name='jasen']");
  for(let i=0;i<fields.length; i++) {
    if ( fields[i].value.trim() != "" )
      jasenet.push(fields[i].value);
  }
  return jasenet;
}
//funktio sarjan tarkistamiseen.
function getSarja() {
  let valinta = "2h";
  if(document.getElementById("2h").checked) {
    valinta = document.getElementById("2h").value;
  }
  if(document.getElementById("4h").checked) {
    valinta = document.getElementById("4h").value;
  }
  if(document.getElementById("8h").checked) {
    valinta = document.getElementById("8h").value;
  }
  return valinta;
}
//tehdään globaali idlista-muuttuja.
let idLista = [];
//generoi satunnaisen id:n väliltä 1000000-999999.
function generoiId() {
  let luku = Math.floor((Math.random() * 9999999) + 1000000);
  tarkistaId(luku);
  idLista.push(luku);
  return luku;
}
//tarkistetaan, onko id jo olemassa. jos on, tehdään uusi ja tarkistetaan se.
function tarkistaId(id) {
  let lista = idLista;
  for(let i=0; i<lista.length; i++)
    if (id == lista[i]) {
      generoiId();
    }
    return id;

}

/**funktio, joka lisää uuden joukkueen tietorakenteeseen **/
function lisaaJoukkue(nimi) {
  data.joukkueet.push(nimi);

}
//funktio joukkueiden päivittämiseen.
function paivitaJoukkueet() {
  while(jlista.firstChild) {
      jlista.removeChild(jlista.firstChild);
  }
  aakkostus(); //käytetään aakkostusfunktiota.
  joukkueetTulostus(); //tulostetaan joukkuelista uudestaan.
  }

//katsoo, onko vähintään yksi leimaustapa valittu. Jos ei, pitää päivittää
//sivu uudelleen, että toimii.
  function CheckBoxCheck()
{
    var check = [];
    var fields = document.querySelectorAll("input[name='leimaustapa']");
    for (let i = 0; i<fields.length; i++) {
      if (fields[i].checked) {
        check.push(fields[i]);
      }
    }
    if (check.length == 0) {
       let checkbox = document.querySelector("input[name='leimaustapa']");
        checkbox.setCustomValidity("Valitse vähintään yksi. Päivitä sivu ja yritä uudelleen.");
        return false;
    }
    else
    {
        return true;
    }
}

//katsoo, onko jäseniä tarpeeksi.
function jasenCheck()
{
  var lista = [];
  var nimet = document.querySelectorAll("input[name='jasen']");
    for(let i=0;i<nimet.length; i++) {
      if ( nimet[i].value.trim() != "" )
        lista.push(nimet[i].value);
  }
  if (lista.length < 2)
  {
      let jasenet =  document.querySelector("input[name='jasen']");
      jasenet.setCustomValidity("Kirjoita vähintään kaksi nimeä! Päivitä sivu ja yritä uudelleen.");
      return false;
  }
  else
  {
      return true;
  }
}

// tarkistetaan, onko kentät valideja. tähän en keksinyt muuta
//ratkaisua, aika purkalta tuntuu. Toimii, mutta jos ei valitse yhtään
//checkboxia/on alle kaksi jäsentä, pitää päivittää sivu uudelleen.
    document.querySelector('form').addEventListener("submit", function (e) {
         e.preventDefault();
         let eteenpainko = CheckBoxCheck();
         if (eteenpainko == true) {
           let tarkistus = tarkistaNimi(nimi.value);
           if(tarkistus != 0) {
             let jasenmaara = jasenCheck();
             if (jasenmaara == true) {
                jatka(e);
             }
           }
         }

    });

//edellinen funktio jatkuu.
function jatka(e) {
  console.log("Onko lomake validi:" + e.target.checkValidity());

  document.forms[0].reportValidity();

  var uusiJoukkue = {
    "nimi": nimi.value,
    "jasenet": getJasenet(),
    "id": generoiId(),
    "sarja": getSarja(),
    "leimaustapa": getTavat(),
    "luontiaika": luontiaika.value
  };
  lisaaJoukkue(uusiJoukkue);
  paivitaJoukkueet();
}
//tarkistaa, onko nimi jo listassa. jos on, ilmoittaa siitä konsoliin.
function tarkistaNimi(nimi) {
  for(let i in data.joukkueet) {
    if(nimi == data.joukkueet[i].nimi) {
      console.log("tämänniminen joukkue on jo olemassa. Valitse uusi nimi.");
      return 0;
    }
  }
  return nimi;
}
//funktio, joka katsoo leimaustavat. Purkkaratkaisu taas, mutta toimii.
function getTavat() {
  var tavat = [];
  var leimaustapa = document.getElementById("gps");
  if(leimaustapa.checked == true) {
    tavat.push(leimaustapa.value);
  }
    var leimaustapa2 = document.getElementById("nfc");
    if(leimaustapa2.checked == true) {
      tavat.push(leimaustapa2.value);
    }
      var leimaustapa3 = document.getElementById("qr");
      if(leimaustapa3.checked == true) {
        tavat.push(leimaustapa3.value);
      }
        var leimaustapa4 = document.getElementById("lomaker");
        if(leimaustapa4.checked == true) {
          tavat.push(leimaustapa4.value);
        }

  return tavat;
}



console.log(data);

}
