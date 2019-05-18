import React, { Component } from "react";
import ReactMapGL, { Marker } from 'react-map-gl';

import axios from "axios";

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXo4aSIsImEiOiJjanZzcmhhMGYwdGQ0NGJtc3A4bDMwcmdyIn0.O6_AwMPZunhNX33o-Lrq7g';

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            viewport: {
                latitude: 51,
                longitude: 0,
                zoom: 3,
                bearing: 0,
                pitch: 0
            }
        };
        this.loadPhotos = this.loadPhotos.bind(this);
        this.onViewportChange = this.onViewportChange.bind(this);
    }

    componentWillMount() {
        this.loadPhotos();
    }

    async loadPhotos() {
        const result = await axios.get('/api/photos');
        if (result.status === 200) {
            const photos = result.data;
            for(let photo of photos) {
                photo.longitude = photo.image_position.x;
                photo.latitude = photo.image_position.y;
            }
            this.setState({ photos: result.data });
        }
    }

    onViewportChange(viewport) {
        this.setState({ viewport });
    }

    render() {
        const { viewport } = this.state;
        return (
            <ReactMapGL
                width="100%"
                height="100%"
                {...viewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={this.onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                children={this.props.children}
            >
                {this.state.photos.map((value, index) => {
                    return <Marker
                        latitude={value.latitude}
                        longitude={value.longitude}
                    >
                        <img src="icons/MapMarker.svg" style={{ position: 'relative', left: '-26px', top: '-64px' }}></img>
                    </Marker>
                })}
            </ReactMapGL>
        )
    }
}
