import React from 'react';
import { connect } from 'react-redux';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import * as actions from './actions/actions';
import './styles/Dashboard.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather.jsx';
// import Reminders from './components/Reminders.jsx';
// import RemoveFavButton from './components/RemoveFavButton.jsx';
// import FavWeather from './components/FavWeather.jsx';

const mapStateToProps = state => { 
    //redux state
    console.log('state: ', state)
    return {
    // add pertinent state here
    userId: state.main.userId,
    nickname: state.main.nickname,
    city: state.main.city, 
    stateName: state.main.stateName, 
    country: state.main.country,
    currentTemp: state.main.currentTemp, 
    currentAQI: state.main.currentAQI, 
    currentWindSpeed: state.main.currentWindSpeed,
    reminders: [...state.main.reminders],
    // favorites: [...state.main.favorites]
    }
};

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchSearchLocation: (newSearchLocation) => {
      dispatch(actions.searchForLocation(newSearchLocation));
    }, 

    dispatchAddReminder: (newReminder) => { // not used in here tho
      dispatch(actions.addReminder(newReminder));
    }


    // dispatchAddFavorite: (location) => {
    //   dispatch(actions.addFavorite(location));
    // }

});
  
//fetch request to back end for reminder and dispatch -> update date to hold info


const Dashboard = (props) => {
  //displayReminder function
    //fetch

//   const addToFavorites = () => {
//     fetch('/server', {
//         method: 'POST',
//         body: JSON.stringify({
//             userId: props.username_id,
//             city: props.city,
//             state: props.state,
//         })
//     })
//     .then(data => data.json())
//     .then(data => {
//         console.log(data)
//         //invoke dispatch here
//         props.dispatchAddFavorite(data)
//         // apiCall()
//     })
//     .catch(error => console.log('error: ', error))
//   }
//   // iterate through array of favorites from the state
//   const favComponents = [];

//   console.log('favorites.length: ', props.favorites.length);

//   for (let i = 0; i < props.favorites.length; i++) {
//     const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
//     favComponents.push(<FavWeather city={favoritePlace.city} favPlaceIndex={i}/>);
//     favComponents.push(<RemoveFavButton removeId={favoritePlace.id} />);
//     // currentAQI currentTemp currentWindSpeed
//   }

//   console.log('favComponents: ', favComponents);

//   for (let i = 0; i< props.favorites.length; i++) {
//     const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
//     fetch(`http://api.airvisual.com/v2/city?city=${favoritePlace.city}&state=${favoritePlace.state}&country=USA&key=${process.env.API_KEY}`)
//     .then(data => data.json())
//     .then((data) => {
//       console.log('data: ', data);
//       // we need to update state with API fetch results here
//       const dispatchData = {
//         temp: data.data.current.weather.tp,
//         aqi: data.data.current.pollution.aqius,
//         wind: data.data.current.weather.ws,
//         index: i
//       };
//       // append a component to the favComponents
//       // this.props.dispatchUpdateFavorites()
//     })
//     .catch(error => console.log('error with api fetch (favorites): ', error));
//   }
  // make api request with each favorite location -> take the results from that api response
  // drill it down to -> create instances of components displaying weather info for each fav place
  // console.log(`reminders: ${props.reminders[0].message}`)

  

    const onLogout = () => {
      // ideally also delete the cookies but idk how to that yet
      // redirect the client to the /login endpoint
      const navigate = useNavigate();
      const path = '/login';
      navigate(path, { replace: true });
    }




  return (
    <div id='dashboard'>
      <nav>
      <button onClick = {onLogout}>logout</button>
      <Link to={'/edit'}>
        <button>
          Edit your reminders
        </button>
      </Link>
      </nav>
      <h1>Welcome, {props.nickname}!</h1>
      <SearchBar dispatchSearchLocation={props.dispatchSearchLocation}/>
      {/* <Reminders 
        userId={props.userId} 
        reminders={props.reminders} /> */}
      <p>Your Forecast:</p>
      <CurrentWeather 
        username={props.username} 
        city={props.city} 
        state={props.state} 
        country={props.country} 
      currentTemp={props.currentTemp} 
        currentAQI={props.currentAQI} 
        currentWindSpeed={props.currentWindSpeed} />
      {/* <Reminders/> */}


      {/* <button id='setFavorite' onClick={addToFavorites}>Add To Favorites</button> */}
      {/* {reminderList} */}

    </div>
  )}
  ;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

/**

// RULES table
// _id, user_id, variable, condition, value, alert

const dictionary = {
  'wind speed': state.main.currentWindSpeed,
  'other varname': what it actually is here in the front end,
  ...
}

for (let i=0; i < data.length; i++) {
  const currentRule = data[i];

  if (currentRule.condition === 'greater than') {
    if (dictionary[currentRule.variable] > currentRule.value) alertsList.push(<Card message=currentRule.alert />);
  }
  
  if (currentRule.condition === 'less than') {
    if (dictionary[currentRule.variable] < currentRule.value) alertsList.push(<p> message=currentRule.alert </p>);
  }
  
  if (currentRule.condition === 'equal to') {
    if (dictionary[currentRule.variable] === currentRule.value) alertsList.push(<Card message=currentRule.alert />);
  }

*/