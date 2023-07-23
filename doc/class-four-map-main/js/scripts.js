
console.log(myPoints)

console.log(typeof myPoints)

mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

const NYC_COORDINATES = [-74.00214, 40.71882]
const BRONX_ZOO_COORDINATES = [-73.87708, 40.85999]

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: NYC_COORDINATES, // starting position [lng, lat]
    zoom: 10, // starting zoom
    bearing: 0,
    pitch: 0
});


map.on('load', function () {

    // add the point source and layer
    map.addSource('my-points', {
        type: 'geojson',
        data: myPoints
    })

    map.addLayer({
        id: 'circle-my-points',
        type: 'circle',
        source: 'my-points',
        paint: {
            'circle-color': '#3358ff',
            'circle-radius': 8,
            'circle-opacity': .6
        }
    })

    // add the linestring source and layer
    map.addSource('my-lines', {
        type: 'geojson',
        data: myLines
    })

    map.addLayer({
        id: 'line-my-lines',
        type: 'line',
        source: 'my-lines',
        paint: {
            'line-width': 4,
            'line-color': '#f56289'
        },
        layout: {
            'line-cap': 'round'
        }
    })

    // add the polygon source and layer
    map.addSource('my-polygons', {
        type: 'geojson',
        data: myPolygons
    })

    map.addLayer({
        id: 'fill-my-polygons',
        type: 'fill',
        source: 'my-polygons',
        paint: {
            'fill-color': '#1bc440'
        }
    })

    // add a line layer that uses the polygon source
    // demonstrate that two layers can use the same source
    map.addLayer({
        id: 'line-my-polygons',
        type: 'line',
        source: 'my-polygons',
        paint: {
            'line-color': '#1b4223',
            'line-width': 3,
        },
        layout: {
            'line-cap': 'round'
        }
    })

    // import our pluto data that we converted to wgs84 in QGIS
    map.addSource('pluto-downtown-bk', {
        type: 'geojson',
        data: './data/downtown-bk-small.geojson'
    })

    map.addLayer({
        id: 'fill-pluto-downtown-bk',
        type: 'fill',
        source: 'pluto-downtown-bk',
        paint: {
            'fill-color': [
                'match',
                ['get', 'LandUse'],
                '01',
                '#f4f455',
                '02',
                '#f7d496',
                '03',
                '#FF9900',
                '04',
                '#f7cabf',
                '05',
                '#ea6661',
                '06',
                '#d36ff4',
                '07',
                '#dac0e8',
                '08',
                '#5CA2D1',
                '09',
                '#8ece7c',
                '10',
                '#bab8b6',
                '11',
                '#5f5f60',
                '12',
                '#5f5f60',
                /* other */ '#ccc'
            ]
        }
    }, 'road-label-simple')



    map.on('click', 'fill-pluto-downtown-bk', (e) => {
        console.log('foo', e.features)


        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.Address)
        .addTo(map);
        });


    // demonstrate the layers that are already on the map
    console.log(map.getStyle().layers)

})
