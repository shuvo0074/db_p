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
  ToastAndroid
} from 'react-native';
import {Router,Scene,Actions} from 'react-native-router-flux'


type Props = {};
export default class login extends Component<Props> {
  constructor (props){
    super(props)
    this.state = ({
      W: Dimensions.get('window').width,
      uname:'',
      pass: '',
        })
      Dimensions.addEventListener('change', () => {
        this.setState({
        W: Dimensions.get('window').width
      });
      })
      console.log(this.state.uname)

      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM user where username=?', [this.state.uname], (tx, results) => {
            var len = results.rows.length;

            console.log(len)

            if (len>0){
                var rec= results.rows.item(0)
                this.setState({pass: rec.password})
                console.log(this.state.pass)
            
            }
          });
      })

  }

  

  render() {

    return (
      <View style={styles.container}>

    <TextInput
    placeholder= "User Name"
    onChangeText={(txt)=>{
      this.setState({uname: txt})
    }}
    style={styles.input}
    />
    <TextInput
    placeholder= "Email or Mobile no. "
    onChangeText={(txt)=>{
      this.setState({pass: txt})
    }}
    style={styles.input}
    />
    <TouchableOpacity
    style={styles.input}
      onPress={()=> {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user where username=?', [this.state.uname], (tx, results) => {
          var len = results.rows.length;
          if (len>0){
              var rec= results.rows.item(0)
              if(this.state.pass==rec.email || this.state.pass==rec.mobileno)
              {

              db.transaction((tx) => {
                tx.executeSql('DELETE FROM loggedin', [], (tx, results) => {});
              })

              db.transaction((tx) => {
                tx.executeSql('INSERT INTO loggedin ( name ) VALUES ( \'' + this.state.uname +'\' )', [], (tx, results) => {});
                ToastAndroid.show("Login success for " + this.state.uname +" !!" ,ToastAndroid.SHORT)

              })
              Actions.notes()
              }
              else
              {
                this.textInput.clear()
                ToastAndroid.show("Login failed",ToastAndroid.SHORT)}
          
          }
        });
    })
    }}
      >
        
          <Text style={styles.listItemFonts}>Login</Text>
          
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.input}
      onPress={()=> {
        ToastAndroid.show(" Please Register. ",ToastAndroid.SHORT)
        Actions.registration()}}
      >
          <Text style={styles.listItemFonts}>Sign up</Text>
      </TouchableOpacity>

      </View>
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
  input: {
    height:60,
    width: 300,
    borderWidth: 2,
    borderRadius:15,
    margin: 15,
    alignItems: 'center'

  },
  contentStyle: {
    color: '#333333',
    marginBottom: 5,
  },
});
