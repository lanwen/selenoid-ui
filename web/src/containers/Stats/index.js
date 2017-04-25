import React, {Component} from "react";
import PropTypes from 'prop-types';
import "./style.scss";

import Quota from "components/Quota";
import Queue from "components/Queue";
import Browsers from "components/Browsers";
import Status from "components/Status";

export default class Stats extends Component {
    static propTypes = {
        sse: PropTypes.string,
        status: PropTypes.string,
        selenoid: PropTypes.object
    };

    render() {
        const {sse, status, selenoid} = this.props;

        return (
            <div className="stats">
                <div className="stats__status">
                    <Status status={sse} title="sse"/>
                    <Status status={status} title="selenoid"/>
                </div>
                <div className="stats__quota">
                    <Quota total={selenoid.total} used={selenoid.used} pending={selenoid.pending}/>
                    <Queue queued={selenoid.queued}/>
                </div>
                <Browsers browsers={selenoid.browsers} totalUsed={selenoid.used}/>
            </div>
        );
    }
}
