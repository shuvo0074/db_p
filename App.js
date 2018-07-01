/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router,Scene,Actions} from 'react-native-router-flux'
var SQLite = require('react-native-sqlite-storage')
var db= SQLite.openDatabase({name: 'testDB',createFromLocation: '~project.db'})
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Registration from './src/registration'
import Login from './src/login'
import Notes from './src/notes'
import AddNote from './src/addnote'

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      
      <Router navigationBarStyle={styles.navBar}>
      <Scene key="root" hideNavBar={false}  >
      
      <Scene
      key="registration"
      component={Registration}
      title="Register user"
      />

      <Scene
      key="login"
      component={Login}
      title="Log in"
      initial
      />

      <Scene
      key="notes"
      component={Notes}
      title="My notes"
      />

      <Scene
      key="addnote"
      component={AddNote}
      title="Add notes"
      />

      </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
