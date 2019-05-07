import React, { Component } from 'react';

import './ActorCard.css'

class ActorCard extends Component {

    render() {

        const { profile_path, name, character } = this.props.actor

        return (
            <div className="actor-card">
                <div className="actor-card-inner">
                    <div className="actor-card-front">
                        <img src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : 'https://propertymarketersllc.com/wp-content/uploads/2018/05/profile-picture-placeholder.png'} alt='' />
                    </div>
                    <div className="actor-card-back">
                        <h1>{name}</h1>
                        <h2>"{character}"</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActorCard