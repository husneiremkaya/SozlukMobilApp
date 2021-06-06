import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Alert, Switch, StyleSheet, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { setLocal_reminderData, getLocal_reminderData } from "../utils/local_storage";
import NumericInput from "react-native-numeric-input";


const title = "Ders Zamanı!";
const body = "Uygulamaya gir ve kelimeleri tekrar et 💙";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Reminder = () => {
    const [token, setToken] = useState(null);
    const [hour, setHour] = useState(18)
    const [minute, setMinute] = useState(59)
    const [isEnabled, setIsEnabled] = useState(false);
    const [isDisabledButton, setisDisabledButton] = useState(false);

    useEffect(() => {
        registerForPushNotificationsAsync().then(res => {
            setToken(res);
        });

        setHour(getLocal_reminderData().hour ? getLocal_reminderData().hour : 9);
        setMinute(getLocal_reminderData().minute ? getLocal_reminderData().minute : 0);
    }, []);

    const setReminder = () => {
        //get permission
        registerForPushNotificationsAsync().then(res => {
            setToken(res);
        });

        //set notification
        Notifications.cancelAllScheduledNotificationsAsync();
        scheduleNotification(hour, minute);

        //store data in local storage
        setLocal_reminderData({ hour: hour, minute: minute });
        setisDisabledButton(true);
        Alert.alert(`Hatırlatıcı ${hour}:${minute} şeklinde ayarlandı`);
    }

    const toggleSwitch = () => {

        if (isEnabled) {
            Notifications.cancelAllScheduledNotificationsAsync();
        }
        setIsEnabled(!isEnabled);
    }

    return (
        <View>
            <View style={styles.content}>
                
          <Text style={[{ color: "black", fontSize: 22  }]}> Kelimelerini tekrar et</Text>
                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />

            </View>


            {isEnabled && <View>
                <View style={styles.content}>

                    <NumericInput value={hour}
                        onChange={text => {
                            setHour(text);
                            setisDisabledButton(false)
                        }}
                        minValue={0}
                        maxValue={23}
                        valueType='integer'
                        type='up-down' />
                    <NumericInput value={minute}
                        onChange={text => {
                            setMinute(text)
                            setisDisabledButton(false)
                        }}
                        minValue={0}
                        maxValue={59}
                        valueType='integer'
                        type='up-down'
                    />

                </View>
                
                <Button style={styles.setButton} disabled={isDisabledButton} onPress={setReminder} title="ayarla" />
            </View>
            }

        </View>
    )

}

const scheduleNotification = (hour, minute) => {
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: {
            hour,
            minute,
            repeats: true,
        }
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [250, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}



const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 20,
    },
    setButton: {
        borderRadius: 5,
        margin: 5
    },
    timerText: {
        fontSize: 18,
    }

});
export default Reminder;