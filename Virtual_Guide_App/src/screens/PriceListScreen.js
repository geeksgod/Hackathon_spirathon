//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import priceData from '../data/priceData';

// create a component
const PriceListScreen = () => {
  return (
    <View style={styles.container}>
     <StatusBar  
                    backgroundColor = "#fff"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                     
                />  
      <FlatList
        style={styles.list}
        data={priceData}
        keyExtractor={item => {
          return item.name;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.mainContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.imgSrc} />
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>Price : {item.price}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 10, marginTop: 20},
  separator: {marginVertical: 10},
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.31,
    shadowRadius: 5.32,

    elevation: 12,
  },
  imageContainer: {flex: 4,},
  descriptionContainer: {
    flex: 6,
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 50,
    borderTopEndRadius: 50,shadowColor: "#000",
    shadowOffset: {
        width: 0,
      height: 8,
        },
      shadowOpacity: 0.41,
      shadowRadius: 10.32,

      elevation: 16,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 15,
    color: '#000',
  },
});

export default PriceListScreen;
