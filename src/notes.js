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
export default class notes extends Component<Props> {
  constructor (props){
    super(props)
    this.state = ({
      W: Dimensions.get('window').width,
      uname:'',
      note: [],
      dates: [],
        })
      Dimensions.addEventListener('change', () => {
        this.setState({
        W: Dimensions.get('window').width
      });
      })
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM loggedin', [], (tx, results) => {
            var len = results.rows.length;
            if (len>0){
                var rec= results.rows.item(0)
                this.setState({uname: rec.name})

            }
          });
      })
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM notes where name=?', [this.state.uname], (tx, results) => {
            var len = results.rows.length;
            console.log("notes array len "+ len)
            if (len>0){
              for (x=0;x<len;x++){
                var rec= results.rows.item(x)
                var arr=this.state.note
                var arr2=this.state.dates
                arr.push(rec.note)
                arr2.push(rec.date)
                this.setState({note: arr})
                this.setState({dates: arr2})
              }
            }
          });
      })
      
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Notes for {this.state.uname}  :
          </Text>
          {
            this.state.note.map((x,index)=>{
              return(
                <Text>
                  {x} , {this.state.dates[index]}
                </Text>
              )
            }
            )
          }
          

      <TouchableOpacity
      style={styles.input}
      onPress={()=> {
        db.transaction((tx) => {
                tx.executeSql('DELETE FROM loggedin', [], (tx, results) => {});
              })
        Actions.login()
      }}
      >
          <Text style={styles.listItemFonts}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.input}
      onPress={()=> {Actions.addnote()}}
      >
          <Text style={styles.listItemFonts}>Add note</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
