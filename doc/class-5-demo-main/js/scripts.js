mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    bounds: [-74.24250, 40.46565, -73.59283, 41.06611]
});

// add the geocoder
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

// add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

$.getJSON('data/community-districts.geojson', function (data) {
    console.log(data);

    // clean the data to convert pop2010 strings to numbers
    const cleanFeatures = data.features.map(function (feature) {
        const newFeature = feature
        newFeature.properties.pop2010 = parseInt(feature.properties.pop2010)
        return newFeature
    })

    console.log('cleanFeatures', cleanFeatures)


    map.on('load', function () {



        // add boroughs
        map.addSource('borough-boundaries', {
            type: 'geojson',
            data: 'data/borough-boundaries.geojson'
        })

        // add community districts
        map.addSource('community-districts', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: cleanFeatures
            },
            generateId: true
        })

        // dummy source for highlighting 
        // map.addSource('highlighted-polygon', {
        //     type: 'geojson',
        //     data: {
        //         type: 'FeatureCollection',
        //         features: []
        //     }
        // })

        map.addLayer({
            id: 'fill-borough-boundaries',
            type: 'fill',
            source: 'borough-boundaries',
            paint: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'pop2020'],
                    500000,
                    '#f0f9e8',
                    1000000,
                    '#bae4bc',
                    1500000,
                    '#7bccc4',
                    2000000,
                    '#43a2ca',
                    2500000,
                    '#0868ac',
                ]
            }
        })

        // add community districts fill
        map.addLayer({
            id: 'fill-community-districts',
            type: 'fill',
            source: 'community-districts',
            paint: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'pop2010'],
                    100000,
                    '#f0f9e8',
                    125000,
                    '#bae4bc',
                    150000,
                    '#7bccc4',
                    175000,
                    '#43a2ca',
                    200000,
                    '#0868ac',
                ]
            },
            layout: {
                visibility: 'none'
            }
        })

        // layer for highlighting community districts
        map.addLayer({
            'id': 'line-cd-highlight',
            'type': 'line',
            'source': 'community-districts',
            'layout': {},
            'paint': {
                'line-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0
                ]
            }
        });

        map.addLayer({
            id: 'line-borough-boundaries',
            type: 'line',
            source: 'borough-boundaries',
            paint: {
                'line-color': '#4f4f4f'
            }
        })

        map.on('click', 'fill-borough-boundaries', (e) => {
            const feature = e.features[0]
            // use jQuery to populate the sidebar with data from the clicked feature
            $('#sidebar').html(`
            <div>
                <h3>
                    ${feature.properties.boro_name}
                </h3>
                <p>The population of ${feature.properties.boro_name} as of the 2020 census was ${numeral(feature.properties.pop2020).format('0.0a')}</p>
            </div>
            `)
        })

        map.on('zoom', () => {

            const zoom = map.getZoom()
            console.log(`The zoom level is ${zoom}`);

            if (zoom > 10.15) {
                // show cd layer
                map.setLayoutProperty('fill-community-districts', 'visibility', 'visible')
                // hide borough layers
                map.setLayoutProperty('fill-borough-boundaries', 'visibility', 'none')
                map.setLayoutProperty('line-borough-boundaries', 'visibility', 'none')
            } else {
                // hide cd layer
                map.setLayoutProperty('fill-community-districts', 'visibility', 'none')
                // show borough layers
                map.setLayoutProperty('fill-borough-boundaries', 'visibility', 'visible')
                map.setLayoutProperty('line-borough-boundaries', 'visibility', 'visible')
            }
        });

        let hoveredStateId = null

        // update featurestate when the mouse moves around within the cd layer
        map.on('mousemove', 'fill-community-districts', (e) => {
            if (e.features.length > 0) {
                if (hoveredStateId !== null) {
                    map.setFeatureState(
                        { source: 'community-districts', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                    { source: 'community-districts', id: hoveredStateId },
                    { hover: true }
                );
            }
        });

        // when the mouse leaves the cd layer, make sure nothing has the hover featurestate
        map.on('mouseleave', 'fill-community-districts', () => {
            if (hoveredStateId !== null) {
                map.setFeatureState(
                    { source: 'community-districts', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = null;
        });
    })

})
