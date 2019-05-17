import React, { Component } from "react";

import axios from "axios";

const apiUrl = process.env.API_URL || 'localhost:8080';

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
        this.loadPhotos = this.loadPhotos.bind(this);
    }

    componentWillMount() {
        this.loadPhotos();
    }

    async loadPhotos() {
        const result = await axios.get(apiUrl + '/photos');
        if (result.status === 200) {
            this.setState({ photos: result.data });
        }
    }

    render() {
        return (
            <div>
                <h1>Photos</h1>

                {this.state.photos.map((value, index) => { return <h4 key={index}>{value}</h4> })}
            </div>
        )
    }
}
