import CountdownComponent from "../../Ido/countdown/Countdown";

export default function CountDown() {
    return <div className="count-down-farm">
        <div className="title">Start in</div>
        <CountdownComponent epochTime={1637053200000}/>
    </div>
}