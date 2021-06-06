import React, {useEffect, useState} from 'react';
import { View,Text, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import HeaderComponent from "../components/Header";

export default function Notlar({navigation}) {

  const [data, setData] = useState([])
  const [index, setIndex] = useState(-1)
  const [inputData, setInputData] = useState('')
  const [newData, setNewData] = useState(false)

  const handleSubmit = () => {
    let currData = [...data]
    if (newData){
      currData.push(inputData)
      setData(currData)
      setNewData(!newData)
    }else {
      currData[index] = inputData
      setData(currData)
      setIndex(-1)
    }
    setInputData('')
    setNotes(currData)
  }
  
  const handleRemove = (idx) => {
    let currData = [...data]
    currData.splice(idx, 1)
    setData(currData)
    setNotes(currData)
  }

  const getNotes = async () => {
    const allData = await AsyncStorage.getItem('notes')
    setData(allData ? JSON.parse(allData) : [])
  }

  const setNotes = (currData) => {
    const stringifyData = JSON.stringify(currData)
    AsyncStorage.setItem('notes', stringifyData)
  }

  useEffect(() => {
    getNotes()
  })
  
  return (
    <View style={{flex:1}} >
      <View style={{flex:1,maxHeight: 65, elevation:5}}>
      <HeaderComponent navigation={navigation}/>
      </View>
      <View style={{ padding: 20}}>
        {data ? 
          data.length > 0 ?
            data.map(
              (item, key) => (
                index > -1 && index === key ?
                <TextInput
                  key={key}
                  style={{paddingVertical: 20, paddingHorizontal: 15, backgroundColor: '#eee', borderRadius: 5, marginTop: 5}}
                  onChangeText ={(text) => setInputData(text)}
                  value={inputData}
                  onSubmitEditing={handleSubmit}
                  autoFocus={true}
                />
                :
                (
                  <TouchableOpacity style={{marginBottom:10 , paddingVertical: 20, paddingHorizontal: 15, backgroundColor: '#eee', borderRadius: 5, display:'flex', flexDirection: 'row' , justifyContent:'space-between'}}
                  key={key}
                  onLongPress= {() => {
                    setIndex(key)
                    setInputData(item)
                  }}
                  >
                  <Text>{item}</Text>
                  <Text onPress={() => handleRemove(key)}>SİL</Text>
                  </TouchableOpacity>
                )  
              )
            )
            :null
            :null
        }
        {newData ? (
          <TextInput
          style={{paddingVertical: 20, paddingHorizontal: 15, backgroundColor: '#eee', borderRadius: 5, marginTop: 5}}
          onChangeText ={(text) => setInputData(text)}
          value={inputData}
          onSubmitEditing={handleSubmit}
          autoFocus={true}
          />
        )
          :null
        }
      </View>
      <View>
        <Button title={newData ? 'VAZGEÇ' : 'EKLE'} onPress={() => setNewData(!newaDta)}></Button>
      </View>
    </View>
  )
}
