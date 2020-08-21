import React from "react";
import { string, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";

import "../styles/Card.css";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { skills, name, idea, lookingFor } = data[i];

  const skillRows = [ skills.slice(0, 3), skills.slice(3, 6) ];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <div
          style={{
            textAlign: `center`,
          }}
        >
          <h1
            style={{
              fontWeight: `800px`,
            }}
          >
            {name}
          </h1>
          <h3>Project Idea</h3>
          <div
            style={{
              marginTop: `-5px`,
              marginLeft: `15px`,
              marginRight: `15px`,
              marginBottom: `35px`,
              borderRadius: `10px`,
            }}
          >
            <p>{idea}</p>
          </div>
          <h3>Offering</h3>
          {skillRows.map(row => row.length &&
            <div
              style={{
                padding: `25px`,
                marginTop: `-45px`,
                marginLeft: `15px`,
                marginRight: `15px`,
                display: `flex`,
                borderRadius: `10px`
              }}
            >
              {row.map(skill => (
                <>
                  <i
                    className={skill.icon}
                    style={{
                      padding: `10px`,
                      fontSize: `50px`,
                    }}
                  ></i>
                </>
              ))}
            </div>
          )}
          <h3>Looking For</h3>
          <div
            style={{
              padding: `25px`,
              marginTop: `-45px`,
              marginLeft: `15px`,
              marginRight: `15px`,
              display: `flex`,
              overflow: `hidden`,
              borderRadius: `10px`,
            }}
          >
            {lookingFor.map((look) => (
              <i
                className={look.icon}
                style={{
                  padding: `10px`,
                  fontSize: `50px`,
                }}
              ></i>
            ))}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  skills: array,
  name: string,
  idea: string,
  lookingFor: array,
};

export default Card;
