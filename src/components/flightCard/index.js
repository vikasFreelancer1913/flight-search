import React from 'react';
import moment from 'moment';
import { FaRupeeSign } from "react-icons/fa";

function formatedTime(time) {
    return moment(time, ["HH.mm"]).format("hh:mm a");
}

function returnStopDot(count) {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(<span key={i} className="countDot"></span>);
    }
    return result;
}

function getTimeDifference(x, y) {
    return (Math.floor(y) - Math.floor(x));
}

function FlightCard({ flights = null, from='', to='', errorMessage = 'No Flights for this destination!' }) {
    return (
        flights && ((flights.flights && flights.flights.length) || flights.length) ? 
            (flights.flights || flights).map((item) => {
                return (
                    <div className="flightCard" key={item.id}>
                        <p className="flightName">
                            <i>
                                <img src={item.logo} alt="logo" />
                            </i>
                            <span>
                                {item.flight}
                            </span>
                        </p>
                        <div className="timeWrap">
                            <p>
                                {formatedTime(item.times.depart)}
                                <span>{from}</span>
                            </p>
                            <div className="route">
                                {
                                    item.stop && item.stop !== 'N'
                                    ?
                                        <p>
                                            <span className="overallTime">{getTimeDifference(item.times.depart, item.times.arrive)} {getTimeDifference(item.times.depart, item.times.arrive) > 1 ? 'hrs' : 'hr'}</span>
                                            <span className="path">
                                                {returnStopDot(item.stop.count)}
                                            </span>
                                            <span className="stopTiming">{item.stop.count} {item.stop.count > 1 ? 'Stops' : 'Stop'}({item.stop.time})</span>                                        
                                        </p>
                                    :
                                        <p className="nonStop">
                                            <span className="overallTime">{getTimeDifference(item.times.depart, item.times.arrive)} {getTimeDifference(item.times.depart, item.times.arrive) > 1 ? 'hrs' : 'hr'}</span>
                                            <span className="path"></span>
                                            <span>Non-stop</span>
                                        </p>

                                }
                            </div>
                            <p>
                                {formatedTime(item.times.arrive)}
                                <span className="destination">{to}</span>
                            </p>
                        </div>
                        <div className="priceClassWrap">
                            <ul>
                                {
                                    item.price.type.length && item.price.type.map((ele, index) => {
                                        return (
                                            <li className="priceBox" key={index}>
                                                <span className="price">
                                                    <i><FaRupeeSign /></i>
                                                    {ele.price}
                                                </span>
                                                <span className="name">
                                                    {
                                                        ele.name
                                                    }
                                                </span>
                                                {
                                                    ele.availabelSeats < 6 && <span className="seatsLeft"> {ele.availabelSeats} {ele.availabelSeats > 1 ? 'seats' : 'seat'} left </span>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            })
        :
            <p className="noFlights">{errorMessage}</p>
    )
}

export default FlightCard;