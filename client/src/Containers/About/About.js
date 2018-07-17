import React, { Component } from 'react';
import './About.css';
import classes from './About.css';
import Joe from './assets/images/joe.png';
import Mike from './assets/images/mike.png';
import Sam from './assets/images/sam.png'




class About extends Component {

    render() {

        let displayMike = "";
        let displaySam = "";
        let displayJoe = "";


        displayMike = Mike;
        displaySam = Sam;
        displayJoe = Joe;



        return (

            <div className="container">
            <div className={classes.Container}>
                <div className="row">
                    <div className="jumbotron">
                        <h1 className="display-4">welcome, neighbors!</h1>

                        <h2>... simplifying the art of making new friends since 2018 </h2>
                            <br />
                        <p className="lead">
                                In the age of social media, research shows that face-to-face human interaction is on a strong decline. Our motivation was to help people (like me and you) build real, platonic relationships with members of your hyper local community.
                        </p>
                    </div>
                </div>

                <br />
                <br />

                <div className="row">
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sam Hughes</h5>
                                <img src={displaySam} alt="sam" />

                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Joe Vega</h5>
                                
                                <img src={displayJoe} alt="joe" />
                                

                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Mike McVeigh</h5>
                                <img src={displayMike} alt="mike" />

                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            

            
            
        );
    }
  }


  export default About;