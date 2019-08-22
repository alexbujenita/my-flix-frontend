import React from "react";

import "./ActorCard.css";

const ActorCard = ({ actor }) => {
    const { profile_path, name, character } = actor;
    return (
      <div className="actor-card">
        <div className="actor-card-inner">
          <div className="actor-card-front">
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : "https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png"
              }
              alt="Actor profile"
            />
          </div>
          <div className="actor-card-back">
            <h1>{name}</h1>
            <h2>"{character}"</h2>
          </div>
        </div>
      </div>
    );
  }

export default ActorCard;
