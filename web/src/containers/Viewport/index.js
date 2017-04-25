import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {validate} from "jsonschema";
import {rxConnect} from "rx-connect";
import Rx from "rx";
import "rx-dom";

import "./style.scss";

import Navigation from "components/Navigation";
import Stats from "containers/Stats";
import Vnc from "components/Vnc";


const schema = {
    "id": "/selenoid",
    "type": "object",
    "properties": {
        "total": {
            "type": "number"
        },
        "used": {
            "type": "number"
        },
        "queued": {
            "type": "number"
        },
        "pending": {
            "type": "number"
        },
        "browsers": {
            "id": "/browser",
            "type": "object",
            "patternProperties": {
                ".*": {
                    "id": "/version",
                    "type": "object",
                    "patternProperties": {
                        ".*": {
                            "id": "/quota",
                            "type": "object",
                            "patternProperties": {
                                ".*": {
                                    "type": "object",
                                    "properties": {
                                        "count": {
                                            "type": "number"
                                        },
                                        "sessions": {
                                            "type": "array",
                                            "items": {
                                                "id": "/session",
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "string"
                                                    },
                                                    "vnc": {
                                                        "type": "boolean"
                                                    },
                                                    "screen": {
                                                        "type": "string"
                                                    }
                                                },
                                                "required": [
                                                    "id"
                                                ]
                                            }
                                        }
                                    },
                                    "required": [
                                        "count"
                                    ]
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "required": [
        "total",
        "used",
        "pending",
        "queued",
        "browsers"
    ]
};

@rxConnect(() => {
    const open = new Rx.Subject();
    return Rx.Observable.merge(
        Rx.DOM.fromEventSource('/events', open)
            // .doOnNext(event => console.log(event))
            .map(event => JSON.parse(event))
            .map(event => {
                if (event.errors) {
                    return {
                        status: "error",
                        errors: event.errors
                    };
                }

                const validation = validate(event, schema);
                if (validation.valid) {
                    return {
                        status: "ok",
                        selenoid: event
                    };
                } else {
                    console.error("Wrong data from backend", validation.errors);
                    return {
                        status: "error",
                        errors: validation.errors
                    };
                }
            })
            .catch(error => {
                console.error('SSE Error', error);
                return Rx.Observable.just(
                    {
                        sse: "error",
                        status: "unknown"
                    }
                );
            }),
        open.map(event => ({
            sse: "ok"
        }))
    ).startWith({
        sse: "unknown",
        status: "unknown",
        selenoid: {
            "total": 0,
            "used": 0,
            "queued": 0,
            "pending": 0,
            "browsers": {}
        }
    });
})
export default class Viewport extends Component {
    render() {
        const links = [
            {href: "/", title: "STATS", exact: true},
            {href: "/vnc/", title: "VNC"}
        ];

        return (
            <Router>
                <div className="viewport">
                    <div className="navigation-top">
                        <Navigation links={links}/>
                    </div>

                    <Route exact={true} path="/" render={() => (
                        <Stats {...this.props}/>
                    )}/>

                    <Route exact={true} path="/vnc/" component={Vnc}/>
                    <Route path="/vnc/:session" render={({match}) => (
                        <Vnc session={match.params.session}
                             browser={{name: "firefox", version: "55.0"}}/>
                    )}/>
                </div>
            </Router>
        );
    }
}
