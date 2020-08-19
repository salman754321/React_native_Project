import React, { Component ,useState} from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Modal,ScrollView, Alert } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';
import {  Notifications } from 'expo';
import * as Permissions from "expo-permissions"
class Reservation extends Component {
   
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
            isDatePickerVisible:false
        }
    }
    
 showDatePicker = () => {
    this.setState({isDatePickerVisible:true})
  };

   hideDatePicker = () => {
    this.setState({isDatePickerVisible:false})
  };

   handleConfirm = (date) => {
       console.log(date)
       date=date.toString();
   this.setState({date:date})
    hideDatePicker();
  };

    static navigationOptions = {
        title: 'Reserve Table',
    };
    
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    confirmReservation(){
      
        this.resetForm();
    }
    handleReservation() {
        
        const { date, guests, smoking } = this.state;

        Alert.alert(
            'Your Reservation OK ?',
            `Number of Guests: ${guests}\n Smoking? :${smoking ? "Yes" : "No"}\n + Date and Time:+${date} `,
            [
                {
                    text:"Cancel",
                    style:"cancel",
                    onPress:()=>this.confirmReservation()
                },
                {
                    text:"Ok",
                    onPress:()=>{
                        this.presentLocalNotification(this.state.date)
                        this.resetForm()}
                }
                 
            ],
            { cancelable: false }
        );
        
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000}>
            <ScrollView>
                 
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <Button title="Show Date Picker" onPress={this.showDatePicker} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
              
               
            </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;