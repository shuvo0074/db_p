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
export default class addnote extends Component<Props> {
  constructor (props){
    super(props)
    this.state = ({
      W: Dimensions.get('window').width,
      uname: '',
      note: '',
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
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          add note for {this.state.uname}
        </Text>
    <TextInput
    onChangeText={(txt)=>{
      this.setState({note: txt})
    }}
    style={styles.input}
    />
    <Text>
      {this.state.note}
      </Text>
    <TouchableOpacity
    style={styles.input}
      onPress={()=> {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO notes ( name , note ) VALUES ( \'' + this.state.uname +'\' , \''+ this.state,note+'\' )', [], (tx, results) => {});
        })
        ToastAndroid.show("Note saved successfully",ToastAndroid.SHORT)
        Actions.notes()
    }}
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
