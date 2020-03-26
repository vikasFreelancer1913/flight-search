import React from 'react';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import tabs from '../../data-configs/tabs.json';
import Select from 'react-select';
import airports from '../../data-configs/airports.json';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { onSearchInputEnter } from '../../actions/flight-search-action';
import CountToggle from '../../components/countToggle';
import moment from 'moment';
import FlightResults from '../flight-result';

class Flights extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pathName: '',
            isFieldsEmpty: true,
            airportList: [],
            departAirport: '',
            destinationAirport: '',
            departDate: '',
            departUTCDate: '',
            returnDate: '',
            returnDateUTCDate: '',
            adultCount: 0,
            childCount: 0,
            infantCount: 0,
            showCounterBox: 'close',
            airlineClass: 'economy',
            dataSubmit: false, 
            class: [
                {value: 'economy', label: 'Economy'},
                {value: 'peconomy', label: 'Premium Economy'},
                {value: 'business', label: 'Business'},
                {value: 'fclass', label: 'First Class'}
            ]
        }

        this.formatAirport = this.formatAirport.bind(this);
        this.onDepartDateChange = this.onDepartDateChange.bind(this);
        this.onReturnDateChange = this.onReturnDateChange.bind(this);
        this.selectDepartAirport = this.selectDepartAirport.bind(this);
        this.selectDestinationAirport = this.selectDestinationAirport.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.selectTravelers = this.selectTravelers.bind(this);
        this.getAdultCount = this.getAdultCount.bind(this);
        this.getChildCount = this.getChildCount.bind(this);
        this.getInfantCount = this.getInfantCount.bind(this);
        this.openCounter = this.openCounter.bind(this);
        this.checkFormValidation = this.checkFormValidation.bind(this);
        this.submitFlightDetails = this.submitFlightDetails.bind(this);
        this.toggleResultView = this.toggleResultView.bind(this);
    }

    selectDepartAirport(value) {
        this.setState({ departAirport: value.value }, () => {
            this.checkFormValidation();
        });
    }

    selectDestinationAirport(value) {
        this.setState({ destinationAirport: value.value }, () => {
            this.checkFormValidation();
        });
    }

    selectClass(value) {
        this.setState({ airlineClass: value.value }, () => {
            this.checkFormValidation();
        });
    }

    selectTravelers(value) {
        this.checkFormValidation();
    }

    componentDidMount() {
        const path = window.location.pathname.split('/')[1]
        const airportFormat = this.formatAirport(airports);
        this.setState({ 
            pathName: !path.length ? 'flights' : path,
            airportList: airportFormat
        });
    }

    onDepartDateChange(date) {
        this.setState({ departDate: date, departUTCDate: moment(date).format() }, () => {
            this.checkFormValidation();
        });
    }

    onReturnDateChange(date) {
        this.setState({ returnDate: date, returnDateUTCDate: moment(date).format() }, () => {
            this.checkFormValidation();
        });
    }

    formatAirport(airportList) {
        let data = []
        data = airportList.airports.length && airportList.airports.map((item) => {
                return ({
                    value: item.id,
                    label: `(${item.id}) ${item.airport_name}`
                })
            })
        return data;
    }

    openCounter() {
        this.setState({
            showCounterBox: this.state.showCounterBox === 'close' ? 'open' : 'close'
        });
    }

    getAdultCount(val) {
        this.setState({
            adultCount: val
        }, () => {
            this.checkFormValidation();
        });
    }

    getChildCount(val) {
        this.setState({
            childCount: val
        }, () => {
            this.checkFormValidation();
        });
    }

    getInfantCount(val) {
        this.setState({
            infantCount: val
        }, () => {
            this.checkFormValidation();
        });
    }

    checkFormValidation() {
        if (this.state.departAirport && this.state.destinationAirport && this.state.departUTCDate && (this.state.adultCount || this.state.childCount || this.state.infantCount)) {
            this.setState({
                isFieldsEmpty: false
            });
        } else {
            this.setState({
                isFieldsEmpty: true
            });
        }
    }

    submitFlightDetails() {
        const flightDetails = {
            flightSearchData: {
                departAirport: this.state.departAirport,
                destinationAirport: this.state.destinationAirport,
                departTime: this.state.departUTCDate,
                returnTime: this.state.returnDateUTCDate,
                adult: this.state.adultCount,
                child: this.state.childCount,
                infant: this.state.infantCount,
                class: this.state.airlineClass
            }
        };

        this.props.submitSearchFlight(flightDetails);
        setTimeout(() => {
            this.setState({ dataSubmit: true });
        }, 1);
    }

    toggleResultView() {
        setTimeout(() => {
            this.setState({ dataSubmit: false });
        }, 200)
    }

    render() {
        return (
            <section className="paddingTop50">
                <Header />
                <Navigation menu={tabs} active={this.state.pathName}/>
                <section className="innerWrap">
                    <div className="flightSearchForm">
                        <form>
                            <div className="controlGroup">
                                <label>Departure</label>
                                <Select 
                                    options={this.state.airportList} 
                                    onChange={this.selectDepartAirport}
                                    placeholder={<div>Airport or City</div>}
                                />
                            </div>
                            <div className="controlGroup">
                                <label>Destination</label>
                                <Select 
                                    options={this.state.airportList}
                                    onChange={this.selectDestinationAirport}
                                    placeholder={<div>Airport or City</div>}
                                />
                            </div>
                            <div className="controlGroup flex">
                                <div className="controls">
                                    <label>Depart date</label>
                                    <DatePicker
                                        minDate={moment().toDate()}
                                        maxDate={moment(new Date()).add(90, 'days').toDate()}
                                        onChange={this.onDepartDateChange}
                                        value={this.state.departDate}
                                    />
                                </div>
                                <div className="controls">
                                    <label>Return date</label>
                                    <DatePicker
                                        minDate={moment().toDate()}
                                        onChange={this.onReturnDateChange}
                                        value={this.state.returnDate}
                                        maxDate={moment(new Date()).add(90, 'days').toDate()}
                                    />
                                </div>
                            </div>
                            <div className="controlGroup flex traverlers">
                                <div className="controls">
                                    <label>Travelers</label>
                                    <input type="button" readOnly value={this.state.adultCount + ' Adult, ' + this.state.childCount + ' Child, ' + this.state.infantCount + ' Infant' } placeholder="Total no. of Travelers" onChange={this.selectTravelers} onClick={e => this.openCounter(e)} />
                                    <div className={"personCountWrap " + this.state.showCounterBox}>
                                        <div className="innerPerson">
                                            <span>{this.state.adultCount} Adult</span>
                                            <CountToggle changeCounter={this.getAdultCount} maxVal={5}/>
                                        </div>
                                        <div className="innerPerson">
                                            <span>{this.state.childCount} Child</span>
                                            <CountToggle changeCounter={this.getChildCount} maxVal={5}/>
                                        </div>
                                        <div className="innerPerson">
                                            <span>{this.state.infantCount} Infant</span>
                                            <CountToggle changeCounter={this.getInfantCount} maxVal={5}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="controls forClass">
                                    <label>Class</label>
                                    <Select 
                                        options={this.state.class}
                                        isSearchable={false} 
                                        onChange={this.selectClass}
                                        defaultValue={{ label: "Economy", value: 'economy' }}
                                        placeholder={<div>Airline Class</div>}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="buttonWrap">
                        <button className={`btn primary ${this.state.isFieldsEmpty && 'disabled'}`} onClick={this.submitFlightDetails}>Search Flights</button>
                    </div>
                </section>
                {this.state.dataSubmit && <FlightResults isShowTrue={this.toggleResultView} />}
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitSearchFlight: (value) => {
            dispatch(onSearchInputEnter(value));
        }
    }
}

const mapStateToProps = state => ({
    flightSearchData: state.fligthSearchReducer.searchData
})

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
