import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
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
            showCamera: true,
            modalIsOpen: false,
            dataUri: null,
            viewport: {
                latitude: 51,
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
            modalIsOpen: true,
            showCamera: false
        });
    }

    afterOpenModal() {
    }

    onViewportChange(viewport) {
        this.setState({viewport});
    }

    async onFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            author: 'Jack',
            latitude: this.state.viewport.latitude,
            longitude: this.state.viewport.longitude,
            timestamp: new Date().toUTCString(),
            image: this.state.dataUri,
            company: formData.get('company'),
            comment: formData.get('comment')
        };

        console.log(data);

        await fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.props.history.push('/map');
    }

    render() {
        const {viewport} = this.state;
        return <div>
                {this.state.showCamera && <Camera
                    onTakePhoto = { (dataUri) => this.onTakePhoto(dataUri)}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    isImageMirror={false}
                />}
                <Modal
                    className='photo-submit-modal'
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                >
                    <div className='photo-submit-map-container'>
                        <ReactMapGL
                            className='photo-submit-map'
                            width="100%"
                            height="100%"
                            {...viewport}
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
                                offsetLeft={-26}
                                offsetTop={-64}
                            >
                                <img src="icons/MapMarker.svg" ></img>
                            </Marker>
                        </ReactMapGL>
                    </div>
                    <form className='photo-form' onSubmit={this.onFormSubmit} action=''>
                        <div>
                            <input name='company' type="text" placeholder="Do you know what company this is?"></input>
                        </div>
                        <div>
                            <input name='comment' type="text" placeholder="Comments?"></input>
                        </div>
                        <div>
                            <input type="submit" value="Send"></input>
                        </div>
                    </form>
                </Modal>
            </div>
    }
}
