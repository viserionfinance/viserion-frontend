import React from 'react';
import Countdown from 'react-countdown';

const CountdownComponent = ({epochTime, duration}: { epochTime?: number, duration?: number }) => {
    const date = !!epochTime ? epochTime : (Date.now() + (duration || 0));
    const renderer = ({days, seconds, hours, minutes, completed}) => {
        if (completed) {
            return new Date(epochTime).toUTCString()
        } else {
            return <span className="text-light">
                  {(hours + days * 24) < 10 ? " 0" + (hours + days * 24) : hours + days * 24}
                : {minutes < 10 ? "0" + minutes + " " : minutes}
                : {seconds < 10 ? "0" + seconds + " " : seconds}
                </span>
        }
    };

    return <Countdown date={date} renderer={renderer}/>;
};

export default CountdownComponent