import React, { Component } from 'react';
import './About.css';
import classes from './About.css';


class About extends Component {

    render() {
        return (

            <div className="container">
            <div className={classes.Container}>
                <div className="row">
                    <div className="jumbotron">
                        <h1 className="display-4">Hello, world!</h1>
                            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                                {/* <hr className="my-4"> */}
                            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title 1</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title 2</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title 3</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
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