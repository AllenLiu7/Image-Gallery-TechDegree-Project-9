import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Searchform from './components/searchform';
import Navigation from './components/nav';
import Gallery from './components/gallery';
import PageNotfound from './components/pagenotfound';
import Apikey from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunrise: [],
      cats: [],
      dogs: [],
      horses: [],
      searchItem: [],
      loading: true,
    };
  }

  // fetch data for three default link.
  defaultSearch = (tag) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          [tag]: response.data.photos.photo,
        });
      })
      .catch((error) => {
        console.log('Error fetching or pharsing data', error);
      });
  };

  //fetch data for searchitem
  search = (tag = 'sunrise') => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          searchItem: response.data.photos.photo,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Error fetching or pharsing data', error);
      });
  };

  //reset loading to true when form submited
  toggleLoading = () => {
    this.setState({
      loading: true,
    });
  };

  //fetch data for four default page when app loads
  componentDidMount() {
    this.search();
    this.defaultSearch('cats');
    this.defaultSearch('dogs');
    this.defaultSearch('horses');
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route
            path='/'
            render={(props) => (
              <Searchform
                {...props}
                onSearch={this.search}
                toggleLoading={this.toggleLoading}
              />
            )}
          />
          <Navigation />
          <Switch>
            <Route
              exact
              path='/'
              render={() =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.searchItem} />
                )
              }
            />
            <Route
              path='/search/:tag'
              render={(props) =>
                this.state.loading ? (
                  <p>loading</p>
                ) : (
                  <Gallery data={this.state.searchItem} />
                )
              }
            />
            <Route
              path='/cat'
              render={(props) => <Gallery data={this.state.cats} />}
            />
            <Route
              path='/dog'
              render={(props) => <Gallery data={this.state.dogs} />}
            />
            <Route
              path='/horse'
              render={(props) => <Gallery data={this.state.horses} />}
            />

            <Route render={(props) => <PageNotfound />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
