import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import NotificationTour from '../../../tours/NotificationTour';
import { HydratedProfile } from '../../../interfaces/profile';
import { Button } from '@material-ui/core';

export default function ({ show, onClose, matchedUser, onContactClick }:
  { show: boolean, onClose: () => void, matchedUser: HydratedProfile, onContactClick: (props: string[]) => void | Promise<void> }
) {
  const { skills, name, idea, lookingFor, email, discord } = matchedUser;
  console.log({matchedUser});
  const skillRows = [skills?.slice(0, 5), skills?.slice(5, 10)];

  return (
    <div>
      <Dialog
        open={show}
        onClose={onClose}
      >
        <div style={{ width: `300px` }}>
          {
            !!name &&
            <div className="font-opensans" style={{ textAlign: `center` }}>
              <h2 className="name">
                <small>You matched with</small> <br /> {name}!
              </h2>
              <h3>Project Idea</h3>
              <div
                style={{
                  marginTop: `-5px`,
                  marginLeft: `15px`,
                  marginRight: `15px`,
                  marginBottom: `35px`,
                  borderRadius: `10px`,
                  paddingBottom: `0px`,
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

                <Button
                  className="slack-button"
                  fullWidth={true}
                  color="primary"
                  onClick={() => onContactClick([`Discord username`, `@${discord}`])}
                >Discord: @{discord}</Button>

                <Button
                  className="email-button"
                  fullWidth={true}
                  color="primary"
                  onClick={() => onContactClick([`Email`, email!])}
                >Email: {email}</Button>
            </div>
          }
        </div>
        <NotificationTour />
      </Dialog>
    </div>
  );
};
