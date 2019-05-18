import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import Modal from 'react-modal';
import 'react-html5-camera-photo/build/css/index.css';
import ReactMapGL, {GeolocateControl, Marker} from 'react-map-gl';

Modal.setAppElement('#root');

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXo4aSIsImEiOiJjanZzcmhhMGYwdGQ0NGJtc3A4bDMwcmdyIn0.O6_AwMPZunhNX33o-Lrq7g';

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 5
};

export default class PhotoView extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            dataUri: null,
            viewport: {
                latitude: 37.8,
                longitude: 0,
                zoom: 3,
                bearing: 0,
                pitch: 0
            }
        }

        this.onTakePhoto = this.onTakePhoto.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.onViewportChange = this.onViewportChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onTakePhoto(dataUri) {
        this.setState({
            dataUri: dataUri,
            modalIsOpen: true
        });
    }

    afterOpenModal() {
    }

    onViewportChange(viewport) {
        this.setState({viewport});
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log('Submit form');
        this.props.history.push('/map');
    }

    render() {
        const {viewport} = this.state;
        return <div>
                <Camera onTakePhoto = { (dataUri) => this.onTakePhoto(dataUri)}/>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                >
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height="80%"
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        onViewportChange={this.onViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        children={this.props.children}
                    >
                        <GeolocateControl
                            style={geolocateStyle}
                            onViewportChange={this.onViewportChange}
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        ></GeolocateControl>
                        <Marker
                            latitude={this.state.viewport.latitude}
                            longitude={this.state.viewport.longitude}
                        >
                        <img src="MapMarker.svg" style={{position: 'relative', left:'-26px', top:'-64px'}}></img>
                        </Marker>
                    </ReactMapGL>
                    <form onSubmit={this.onFormSubmit}>
                        <input type="text" placeholder="Do you know what company this is?"></input>
                        <input type="text" placeholder="Any comments?"></input>
                        <input type="submit" title="Send report"></input>
                    </form>
                </Modal>
            </div>
    }
}