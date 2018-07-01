/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage')
var db= SQLite.openDatabase({name: 'testDB',createFromLocation: '~project.db'})
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
  constructor (props){
    super(props)
    this.state = ({
      W: Dimensions.get('window').width,
      uname:'',
      fname:'',
      email:'',
      mobileno:'',
      pass:'',
        })
      Dimensions.addEventListener('change', () => {
        this.setState({
        W: Dimensions.get('window').width
      });
      })

      
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <View 
      style={{height:50}}
      />
    <TextInput
    placeholder= "User Name"
    onChangeText={(txt)=>{
      this.setState({uname: txt})
    }}
    style={styles.input}
    />
    <TextInput
    placeholder= "Full Name"
    onChangeText={(txt)=>{
      this.setState({fname: txt})
    }}
    style={styles.input}
    />
    <TextInput
    placeholder= "Email"
    onChangeText={(txt)=>{
      this.setState({email: txt})
    }}
    style={styles.input}
    />
    <TextInput
    placeholder= "Mobile number"
    onChangeText={(txt)=>{
      this.setState({mobileno: txt})
    }}
    style={styles.input}
    />
    <TextInput
    placeholder= "Password"
    onChangeText={(txt)=>{
      this.setState({pass: txt})
    }}
    style={styles.input}
    />
    <TouchableOpacity
    style={styles.input}
      onPress={()=> {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO user (`username`,`fullname`, `email`,`mobileno`,`password`  ) VALUES (?)', [this.state.uname,this.state.fname,this.state.email,this.state.mobileno,this.state.password], (tx, results) => {
          var len = results.rows.length;
          Actions.notes()
        });
    })
    }}
      >
        
          <Text style={styles.listItemFonts}>Register</Text>
          
      </TouchableOpacity>

      <View 
      style={{height:100}}
      />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height:60,
    width: 300,
    borderWidth: 2,
    borderRadius:15,
    margin: 15,
    alignItems: 'center'

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
