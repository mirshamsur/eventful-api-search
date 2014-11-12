var latlng = new google.maps.LatLng(36.05178307933835, 42.49737373046878);

var mapElement = document.getElementById("map-canvas");

var map = new google.maps.Map(mapElement, {
  center: latlng,
  zoom: 4
});

var shows = {
  search: function(cb){
    $.getJSON('http://api.eventful.com/json/events/search?c=music&app_key=jcP6d2QX9tSJ6CDg&keywords=childish+gambino&callback=?', cb);  
  }
};


function plotPoint(latlng){
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}

var showList = {
  showTemplate: Handlebars.compile($('#show-template').html()),
  container: document.getElementById('show-list'),
  
  render: function(events){
    var html = '';
    
    for (var i = 0; i < events.event.length; i++) {
      html += this.showTemplate(events.event[i]);
      var latlng = new google.maps.LatLng(events.event[i].latitude, events.event[i].longitude);
      
      plotPoint(latlng);
    }

    this.container.innerHTML = html;
  }
};

shows.search(function(response){ 
 // console.log(response.events);
  showList.render(response.events);
});

