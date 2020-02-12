//import liraries
import React from 'react';
import { StatusBar, View, Text, StyleSheet, FlatList, Button, Linking,TouchableOpacity } from 'react-native';
import contactData from '../data/emmergencyContanct';


const EmmergencyScreen = ({navigation}) => {
    const onCallPressed =(phoneNumber) =>{ 
        Linking.openURL(`tel:${phoneNumber}`)
    }
    return (
      
        <View style={styles.container}>
          <StatusBar  
                    backgroundColor = "#fff"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                     
                />  
      <FlatList
        style={styles.list}
        data={contactData}
        keyExtractor={item => {
          return item.name;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={post => {
          const item = post.item;
          return (
            <TouchableOpacity
              onPress={() => onCallPressed(item.number)}>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <View style={{flex: 9}}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.desc}>{item.number}</Text>
                    </View>
                    <View style={{flex: 2}}>
                      <Button title="Call" color='#fb5b5a' onPress={()=>onCallPressed(item.number)} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
      },
      list: {
        backgroundColor: '#fff',
      },
      separator: {
        marginTop: 0,
      },
      /******** card **************/
      card: {
        margin: 10,
        height: 125,
        borderRadius:18,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	      height: 8,
            },
          shadowOpacity: 0.01,
          shadowRadius: 30.32,

          elevation: 16,
      },
      cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
        //overlay efect
        flex: 1,
        height: 200,
        width: null,
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
      },
      cardImage: {
        flex: 1,
        height: 150,
        width: null,
      },
      /******** card components **************/
      title: {
        fontSize: 30 ,
        color: '#000',
        marginTop: 10,
        fontWeight: 'bold',
      },
      desc: {
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        
      },
      time: {
        fontSize: 13,
        color: '#000',
        marginTop: 5,
      },
      icon: {
        width: 25,
        height: 25,
      },
});

export default EmmergencyScreen;
