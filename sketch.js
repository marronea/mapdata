const key = 'pk.eyJ1IjoicG9zdHBsYXN0aWMiLCJhIjoiY2tpamJyNm1zMDE0OTJ0czU5cDkyNjE3ciJ9.VRXSaQR1sQoWudM3Bgp9Lg';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 12,
  style: 'mapbox://styles/postplastic/ckm3sqtvr13bt17p9510n79ky',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  meteorites = loadTable('Meteorite_Landings.csv','csv','header');
  img = createImg('https://www.usnews.com/dims4/USNEWS/bb996bf/17177859217/thumbnail/256x256/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F8d%2F8f3c53319d560b2f4139af68c9a77c%2Fcollege-photo_28775.jpg');
  img.hide();
}


function draw() {
   clear();
  //noFill();
  stroke(0);
  strokeWeight(5);
  const zoom = myMap.zoom();
  const athens = myMap.latLngToPixel(39.3292, -82.1013);
  ellipse(athens.x, athens.y, 10 * zoom, 10 * zoom);
  if (dist(athens.x, athens.y, mouseX, mouseY) < (zoom * 10) / 2) {
   
     textSize(32);
    noFill();
      strokeWeight(2);

    text("this is athens",athens.x,athens.y);
    image(img,athens.x,athens.y,200,200);
     
     fill(0, 100);
  } else {
    fill(255, 100);
  }


  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);

    const place = meteorites.getString(i,'name');
    
    let size = meteorites.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    stroke(0);
    ellipse(pos.x, pos.y, size, size);
    
    if(dist(pos.x,pos.y,mouseX,mouseY) < size){
      textSize(32);
      text(place,pos.x,pos.y);
    }
  
}
  
  
 
}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


