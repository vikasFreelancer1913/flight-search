import React from 'react';
import { connect } from 'react-redux';
import flights from '../../data-configs/flights.json';
import FlightCard from '../../components/flightCard';
import Loader from '../../components/loader';
import moment from 'moment';
import InputRange from 'react-input-range';
import { FaRupeeSign } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdCreate, IoIosArrowRoundForward } from "react-icons/io";
import 'react-input-range/lib/css/index.css';

class FlightResults extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showClass: '',
            isLoading: true,
            isSortClicked: false,
            isFilteredClicked: false,
            isRadioChecked: false,
            flightsData: null,
            sortingPattern: '',
            totalEconomy: 0,
            totalBusiness: 0,
            totalFirstClass: 0,
            totalPremEconomy: 0,
            isFilterSelected: false,
            airlineClass: [],
            filterMessage: 'No Flights for this destination!',
            rangeValue: {
                min: 1000,
                max: 5000
            }
        }

        this.backToSearch = this.backToSearch.bind(this);
        this.getFormatedDate = this.getFormatedDate.bind(this);
        this.getPassenger = this.getPassenger.bind(this);
        this.openSortingWindow = this.openSortingWindow.bind(this);
        this.openFilterWindow = this.openFilterWindow.bind(this);
        this.sortPriceLowToHigh = this.sortPriceLowToHigh.bind(this);
        this.sortPriceHighToLow = this.sortPriceHighToLow.bind(this);
        this.sortShortToLongest = this.sortShortToLongest.bind(this);
        this.sortLongestToShortes = this.sortLongestToShortes.bind(this);
        this.sortAlphaAtoZ = this.sortAlphaAtoZ.bind(this);
        this.sortAlphaZtoA = this.sortAlphaZtoA.bind(this);
        this.doSorting = this.doSorting.bind(this);
        this.closeSortBy = this.closeSortBy.bind(this);
        this.closeFilterBy = this.closeFilterBy.bind(this);
        this.getBookingClasses = this.getBookingClasses.bind(this);
        this.changePriceRange = this.changePriceRange.bind(this);
        this.classSelected = this.classSelected.bind(this);
        this.doFilter = this.doFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    changePriceRange(value) {
        this.setState({
            rangeValue: {
                min: value.min,
                max: value.max
            }
        });
    }

    classSelected(event) {
        event.stopPropagation();
        if (event.target.checked) {
            this.state.airlineClass.push(event.currentTarget.id)
        } else {
            let index = this.state.airlineClass.indexOf(event.currentTarget.id);
            if (index !== -1) this.state.airlineClass.splice(index, 1);
        }
    }

    doFilter() {
        let filterecdArray = [];
        if (this.state.rangeValue.min && this.state.rangeValue.max) {
            filterecdArray = flights.flights.map((item) => {
                for (let i = 0; i < item.price.type.length; i++) {
                    if (item.price.type[i].price >= this.state.rangeValue.min && item.price.type[i].price <= this.state.rangeValue.max) {
                        return item
                    }
                }
            });
        }
        
        filterecdArray = filterecdArray.filter(function( element ) {
            return element !== undefined;
        });

        if (this.state.airlineClass.length) {
            filterecdArray = filterecdArray.map((item) => {
                for (let i = 0; i < item.price.type.length; i++) {
                    if (this.state.airlineClass.includes(item.price.type[i].name)) {
                        return item
                    }
                }
            })
        }

        filterecdArray = filterecdArray.filter(function( element ) {
            return element !== undefined;
        });

        this.setState({
            isLoading: true,
            isFilteredClicked: false,
            filterMessage: filterecdArray.length ? this.state.filterMessage : 'No Flights for this filter!',
            flightsData: filterecdArray
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    clearFilter() {
        let checkboxItem = document.getElementsByClassName('classCheckbox');
        for (var i = 0; i < checkboxItem.length; i++) {
            if (checkboxItem[i].type === 'checkbox') {
                checkboxItem[i].checked = false;
            }
        }
        this.setState({
            isLoading: true,
            isFilteredClicked: false,
            flightsData: flights,
            airlineClass: [],
            rangeValue: {
                min: 1000,
                max: 5000
            }
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    backToSearch() {
        this.setState({ showClass: '' }, () => {
            this.props.isShowTrue()
        });
    }

    radioChanged(event) {
        event.stopPropagation();
        this.setState({ isRadioChecked: true, sortingPattern: event.currentTarget.id });
    }

    doSorting() {
        switch(this.state.sortingPattern) {
            case 'lowToHigh':   this.sortPriceLowToHigh();
                                break;
            case 'highToLow':   this.sortPriceLowToHigh();
                                break;
            case 'shortToLong': this.sortShortToLongest();
                                break;
            case 'LongToShort': this.sortLongestToShortes();
                                break;
            case 'aToz':        this.sortAlphaAtoZ();
                                break;
            case 'zToa':        this.sortAlphaZtoA();
                                break;
                    default:    break;
        }
    }

    sortPriceLowToHigh() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
               return a.price.type[0].price - b.price.type[0].price
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    sortPriceHighToLow() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
               return b.price.type[0].price - a.price.type[0].price
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    sortShortToLongest() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
               return (Math.floor(a.times.arrive) - Math.floor(a.times.depart)) - (Math.floor(b.times.arrive) - Math.floor(b.times.depart))
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    sortLongestToShortes() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
               return (Math.floor(b.times.arrive) - Math.floor(b.times.depart)) - (Math.floor(a.times.arrive) - Math.floor(a.times.depart))
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }
    
    sortAlphaAtoZ() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
                if ( a.flight < b.flight ){
                    return -1;
                }
                return 0;
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }
    
    sortAlphaZtoA() {
        let sortedData = [];
        if (flights.flights.length) {
            sortedData = flights.flights.sort((a, b) => {
                if ( b.flight < a.flight ){
                    return -1;
                }
                return 0;
            })
        }

        this.setState({
            isLoading: true,
            isSortClicked: false,
            flightsData: sortedData
        }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000);
        })
    }

    openSortingWindow() {
        this.setState({ isSortClicked: true });
    }
    
    closeSortBy() {
        this.setState({ isSortClicked: false });
    }
    
    openFilterWindow() {
        this.setState({ isFilteredClicked: true });
    }
    
    closeFilterBy() {
        this.setState({ isFilteredClicked: false });
    }

    getPassenger(data) {
        let passenger = '';
        if (data.adult > 0) {
            passenger = data.adult + (data.adult > 1 ? ' Adults' : ' Adult');
        } 
        
        if (data.child > 0) {
            passenger += ' | ' + data.child + (data.child > 1 ? ' Childs' : ' Child');
        } 
        
        if (data.infant > 0) {
            passenger += ' | ' + data.infant + (data.infant > 1 ? ' Infants' : ' Infant');
        }

        return passenger;
    }

    getFormatedDate(from, to) {
        let fromDate = '';
        let toDate = '';
        if (from && from.length) {
            fromDate = moment(from).format('MMM DD');
        }
        if (to && to.length && !to.toLowerCase().includes('invalid')) {
            toDate = ' - ' + moment(to).format('MMM DD');
        }
        return (fromDate + '' + toDate);
    }   

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showClass: 'show', flightsData: flights }, () => {
                this.getBookingClasses(this.state.flightsData)
            });
        }, 100);

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000);
    }

    getBookingClasses(flights) {
        let economy = 0;
        let business = 0;
        let firstClass = 0;
        let premEconomy = 0;
        if(flights && flights.flights.length) {
            flights.flights.forEach((item) => {
                item.price.type.forEach((item2) => {
                    if (item2.name === 'economy') {
                        economy += parseInt(item2.availabelSeats);
                    }

                    if (item2.name === 'business') {
                        business += parseInt(item2.availabelSeats);
                    }

                    if (item2.name === 'premium economy') {
                        premEconomy += parseInt(item2.availabelSeats);
                    }

                    if (item2.name === 'first class') {
                        firstClass += parseInt(item2.availabelSeats);
                    }
                })
            });
        }

        this.setState({ 
            totalEconomy: economy,
            totalBusiness: business,
            totalFirstClass: firstClass,
            totalPremEconomy: premEconomy 
        });
    }

    render() {
        const flightData = this.props.flightSearchData.flightSearchData;
        return (
            <section className={`flightSearchResult ${this.state.showClass}`}>
                <div className="resultHeader">
                    <button className="backBtn" onClick={this.backToSearch}>
                        <IoIosArrowRoundBack />
                    </button>
                    {
                        flightData ?
                        <div className="titleWrap">
                            <p>
                                <span>{flightData.departAirport}</span>
                                <IoIosArrowRoundForward />
                                <span>{flightData.destinationAirport}</span>
                            </p>
                            <div className="datePassengerWrap">
                                {
                                    this.getFormatedDate(flightData.departTime, flightData.returnTime)
                                } | {
                                    this.getPassenger(flightData)
                                }
                            </div>
                        </div>
                        :
                        <p>No data</p>

                    }
                    <button className="editBtn" onClick={this.backToSearch}>
                        <IoMdCreate />
                    </button>
                </div>
                {
                    !this.state.isLoading ? 
                        <div className="flightDetailsWrap">
                            <FlightCard errorMessage={this.state.filterMessage} flights={this.state.flightsData} from={flightData && flightData.departAirport} to={flightData && flightData.destinationAirport} />
                        </div>
                    :
                        <Loader />
                }

                <section className="sortingAndFilter">
                    <div className={`sortingWrap ${this.state.isSortClicked ? 'show' : ''}`}>
                        <div className="resultHeader">
                            <button className="backBtn" onClick={this.closeSortBy}>
                                <IoIosArrowRoundBack />
                            </button>
                            <p>Sort By</p>
                        </div>
                        <ul>
                            <li>
                                <label>
                                    <input type="radio" id="lowToHigh" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Price (Lowest to Highest)
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="radio" id="highToLow" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Price (Highest to Lowest)
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="radio" id="shortToLong" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Duration (Shortest to Longest)
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="radio" id="LongToShort" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Duration (Longest to Shortest)
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="radio" id="aToz" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Airline (A to Z)
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="radio" id="zToa" name="radioSort" onChange={e => this.radioChanged(e)} />
                                    Airline (Z to A)
                                </label>
                            </li>
                        </ul>
                        <button className={`btn primary ${!this.state.isRadioChecked && 'disabled'}`} onClick={this.doSorting}>Done</button>
                    </div>
                    <div className={`sortingWrap ${this.state.isFilteredClicked ? 'show' : ''}`}>
                        <div className="resultHeader">
                            <button className="backBtn" onClick={this.closeFilterBy}>
                                <IoIosArrowRoundBack />
                            </button>
                            <p>Filter By</p>
                            
                        </div>
                        <div className="filterWrap">
                            <div className="priceFilter">
                                <h3>Price range</h3>
                                <div className="inputBox">
                                    <div className="control">
                                        <label>Minimum price</label>
                                        <i>
                                            <FaRupeeSign />
                                        </i>
                                        <input type="text" value={this.state.rangeValue.min} onChange={value => console.log(value)}/>
                                    </div>
                                    <div className="control">
                                        <label>Maximum price</label>
                                        <i>
                                            <FaRupeeSign />
                                        </i>
                                        <input type="text" value={this.state.rangeValue.max} onChange={value => console.log(value)} />
                                    </div>
                                </div>
                                <div className="slider">
                                    <InputRange
                                        draggableTrack
                                        maxValue={10000}
                                        minValue={0}
                                        onChange={value => this.setState({ rangeValue: value })}
                                        onChangeComplete={value => this.changePriceRange(value)}
                                        value={this.state.rangeValue} />
                                </div>
                            </div>

                            <div className="classFilter">
                                <h3>Booking Class</h3>
                                <div className="controlGroup">
                                    <div className="control">
                                        <label>
                                            <input type="checkbox" name="class" id="economy" className="classCheckbox" onChange={e => this.classSelected(e)}/>
                                            <span>Economy</span>
                                        </label>
                                    </div>
                                    <p>{this.state.totalEconomy}</p>
                                </div>
                                <div className="controlGroup">
                                    <div className="control">
                                        <label>
                                            <input type="checkbox" name="class" id="business" className="classCheckbox" onChange={e => this.classSelected(e)} />
                                            <span>Business</span>
                                        </label>
                                    </div>
                                    <p>{this.state.totalBusiness}</p>
                                </div>
                                <div className="controlGroup">
                                    <div className="control">
                                        <label>
                                            <input type="checkbox" name="class" id="first class" className="classCheckbox" onChange={e => this.classSelected(e)} />
                                            <span>First Class</span>
                                        </label>
                                    </div>
                                    <p>{this.state.totalFirstClass}</p>
                                </div>
                                <div className="controlGroup">
                                    <div className="control">
                                        <label>
                                            <input type="checkbox" name="class" id="premium economy" className="classCheckbox" onChange={e => this.classSelected(e)} />
                                            <span>Premium economy</span>
                                        </label>
                                    </div>
                                    <p>{this.state.totalPremEconomy}</p>
                                </div>
                            </div>
                        </div>
                        <div className="action">
                            <button className="btn secondary" onClick={this.clearFilter}>Reset all</button>
                            <button className="btn primary" onClick={this.doFilter}>Apply</button>
                        </div>
                    </div>
                    <div className="sortingFilterWrap">
                        <button onClick={this.openSortingWindow}>Sort by</button>
                        <button onClick={this.openFilterWindow}>Filters</button>
                    </div>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    flightSearchData: state.fligthSearchReducer.searchData
})

export default connect(mapStateToProps, null)(FlightResults);
