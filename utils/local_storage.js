import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setLocal_reminderData(value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('reminder', jsonValue)
    } catch (e) {
        console.log(e);
    }
}


export async function getLocal_reminderData() {
    try {
      const jsonValue = await AsyncStorage.getItem('reminder');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
}
  