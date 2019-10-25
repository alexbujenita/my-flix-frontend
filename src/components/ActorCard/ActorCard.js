import React from "react";
import { Link } from "react-router-dom";

import "./ActorCard.css";

const ActorCard = ({ actor }) => {
  const { profile_path, name, character, id } = actor;

  return (
    <div
      key={id}
      className="actor-card"
    >
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
          <Link
            to={{
              pathname: `/actor/${id}`,
              state: { profilePhoto: profile_path }
            }}
            key={`${name}=${id}`}
          >
            <h1>{name}</h1>
          </Link>
          <h2>"{character}"</h2>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
