import React from "react";
import {Text,StyleSheet,Image,View,TouchableOpacity,StatusBar} from "react-native";
import {Header,Body} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const HeaderComponent = ({navigation}) => {

    return(
        <Header style={{backgroundColor:"#870573",alignItems:"center"}} >   
			<StatusBar barStyle="light-content" backgroundColor="black"/>
			<TouchableOpacity style={styles.icons} onPress={()=> navigation.openDrawer()}>
				<Ionicons name="md-menu" size={28} color="white" />
			</TouchableOpacity>
			<Body style ={{alignItems:"center",paddingLeft:25}}>
				<View style={{flexDirection:"row"}}>
					<Text style ={styles.headerText}>Sözlük</Text>
				</View>           
			</Body>
        </Header>
    );
}

const styles = StyleSheet.create({
	headerText:{
		color:"#fff",
        fontSize:25,
        alignItems:"center",
		fontWeight:"bold",
		marginTop:10,
		marginRight:50
	},
	logo:{
		width:40,
		height:40,
		marginTop:7,
		marginRight:10
		
	}

});
export default HeaderComponent;