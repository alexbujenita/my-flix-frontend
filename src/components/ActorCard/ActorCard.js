import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

import "./ActorCard.css";

const ActorCard = ({ actor }) => {
  const { profile_path, name, character, id, gender } = actor;
console.log(gender)
  return (
    <LazyLoad height={100} width={145} once offset={30}>
      <div key={id} className="actor-card">
        <div className="actor-card-inner">
          <div className="actor-card-front">
            <img
              loading="lazy"
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
    </LazyLoad>
  );
};

export default React.memo(ActorCard);
