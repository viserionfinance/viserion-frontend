import React from 'react';
import Countdown from 'react-countdown';

const CountdownStart = ({epochTime, dataIdo, duration}: { epochTime?: number, dataIdo: any, duration?: number }) => {
    const date = !!epochTime ? epochTime : (Date.now() + (duration || 0));
    const renderer = ({days, seconds, hours, minutes, completed}) => {
        if (completed) {
            return dataIdo.startTime ? new Date(dataIdo.startTime).toUTCString() : "Loading..."
        } else {
            return <>
                <span>
                  {(hours + days * 24) < 10 ? " 0" + (hours + days * 24) : hours + days * 24}
                    : {minutes < 10 ? "0" + minutes + " " : minutes}
                    : {seconds < 10 ? "0" + seconds + " " : seconds}
                </span>
            </>
        }
    };

    return <Countdown date={date} renderer={renderer}/>;
};

export default CountdownStart