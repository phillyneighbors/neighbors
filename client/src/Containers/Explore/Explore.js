import React, { Component } from 'react';
import './Explore.css';
import classes from './Explore.css';

class Explore extends Component {

    render() {
        return (
                <div className={classes.explore}>
                    <div className="container">
                    <div className="row">
                        <div class="card">
                            <div class="card-body">
                                <h1 className="explore-header"> explore philadelphia header card ... below we can add the map component to one of the cards and place data in diff cards, etc..  </h1>
                            </div>
                        </div>
                    </div>

                        <br />
                            <div className="row">
                                <div className="col-md">
                                    <div class="card">
                                        <div class="card-body">
                                            row 2 column 1 CARD 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                <div class="card">
                                        <div class="card-body">
                                            row 2 column 2 CARD 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                <div class="card">
                                        <div class="card-body">
                                            row 2 column 3 CARD 
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <br />

                            {/* <div className="row">
                                <div className="col-md">
                                    <p className="row-two">
                                        row 3 column 1
                                    </p>
                                </div>
                            </div>   */}


                        </div>
                    </div>
                
                );
    }
  }


  export default Explore;