import React from "react";
import { animated, interpolate } from "react-spring/hooks";
import { HydratedProfile } from "../../interfaces/profile";

import "../../styles/Card.scss";

const Card = ({ i, x, y, rot, scale, trans, bind, data }: any) => {
  const { skills, name, idea, lookingFor }: HydratedProfile = data[i];

  const skillRows = [skills.slice(0, 5), skills.slice(5, 10)];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        )
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          boxShadow: interpolate(
            [x], (x) => {
              if(x > -5 && x < 5) return null;
              const opacity = Math.abs(x)/300;
              const color = x > 0 ? `rgba(100, 237, 136, ${opacity})` : `rgba(237, 100, 100, ${opacity})`;
              return `${x*1.5}px 0 80px -80px ${color} inset`;
            }
          )
        }}
      >
        <div className="hacker-profile-card"
          style={{
            textAlign: `center`,
          }}
        >
          <h2 className="name" style={{ margin: `1rem` }}>
            {name}
          </h2>
          <h3>Project Idea</h3>
          <div
            style={{
              marginTop: `-5px`,
              marginLeft: `15px`,
              marginRight: `15px`,
              marginBottom: `25px`,
              borderRadius: `10px`,
            }}
          >
            <p
              style={{
                fontSize: `13px`,
              }}
            >
              {idea}
            </p>
          </div>
          <h3>Offering</h3>
          {skillRows.map(
            (row, index) =>
              !!row.length && (
                <div
                  key={index}
                  style={{
                    paddingTop: `25px`,
                    paddingBottom: `5px`,
                    marginTop: `-35px`,
                    marginLeft: `15px`,
                    marginRight: `15px`,
                    display: `flex`,
                    justifyContent: `center`,
                    borderRadius: `10px`,
                  }}
                >
                  {row.map((skill, index) => (
                      <div key={index}>
                        <img
                          src={skill.icon}
                          alt={skill.title}
                          className="card-skill-image"
                        />
                        <p className="card-skill-title font-black"> {skill.title} </p>
                      </div>
                  ))}
                </div>
              )
          )}
          <h3>Looking For</h3>
          <div
            style={{
              paddingTop: `25px`,
              marginTop: `-35px`,
              marginLeft: `15px`,
              marginRight: `15px`,
              display: `flex`,
              justifyContent: `center`,
              borderRadius: `10px`,
            }}
          >
            {lookingFor.map((look, index) => (
              <div key={index}>
                <img
                  src={look.icon}
                  alt={look.title}
                  className="card-skill-image"
                />
                <p className="card-skill-title font-black"> {look.title} </p>
              </div>
            ))}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Card;
