"use strict";

window.onload = function any_function_name()
{

  //laitetaan pöllö liikkumaan
  var e = document.getElementById("pollo");
  e.className = "pollo";


  //taustalla olevat palkit ilmestymään tietyin aikavälein. setIntervalia ei saanut käyttää,
  // mutta setTimeoutia ei kielletty, joten oletan että se on sallittu. Oli järkevin tapa
  //mielestäni saada toimimaan, requestAnimationFramella epäonnistuin.
  var aika = 10;
  for (let i = 0; i < 10; i++) {
  var timeoutID = window.setTimeout(palkit, aika);
  aika+= 250;
}
  //funktio, joka kopioi alkuperäisen palkin ja tekee siitä kopion.
  function palkit() {
    var palkki = document.getElementById("palkki");
    palkki.className = "palkki";
    var uusiPalkki = palkki.cloneNode(true);
    uusiPalkki.className = "palkki";
    document.body.appendChild(uusiPalkki);
}



  //tehdään kanin vasemmalle puoliskolle canvas ja laitetaan animoitumaan.
  let canvas = document.getElementById('canvas');
  canvas.className = "bunnyleft";
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('kani');
  ctx.drawImage(img, 0, 0, 191, 600, 0, 0, 191, 600);

  //tehdään kanin oikealle puoliskolle canvas ja laitetaan animoitumaan.
    let canvas2 = document.getElementById('canvas2');
    canvas2.className = "bunnyright";
    let ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(img, 191, 0, 191, 600, 191, 0, 191, 600);


}
