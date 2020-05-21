import React from 'react';
import Widget from '../Widget';

export const NoResourceFound = ({ resourceName }) => {
    return (
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 fundsCardStyle">
              <Widget>
                <div className="d-flex mb-2"> 
                </div>
                  <div className="container z-depth-1">
                      <section className="dark-grey-text">
                        <div className="row pr-lg-5">
                        <div className="col-md-7 mb-1">
                      <div className="view">
                        <img src="https://i.ibb.co/6bPGZXP/undraw-empty-xct9.png" className="img-fluid" alt="smaple image"></img>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                      <div>
                        <h2 className="mr-2 mb-0 jr-font-weight-medium mb-2 noResourceFound">No {resourceName}</h2>
                      <p>You are seeing this because no {resourceName} exists.
                      </p>
                      <div className="d-flex flex-row mb-3">    
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                </div>
              </Widget>
            </div>
    )
}
