//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView from "react-native-maps";
import { insertData, insertData1, retriveData } from "../Database/database";

import { requestPermissionsAsync } from "expo-location";

var data = [];

export const changeData = value => {
  data = value;
};

const saveLocationDetails = async (title, desc, params) => {
  //console.log(JSON.stringify(params));
  const { latitude, longitude, heading, accuracy } = params;
  const id = title + desc + latitude.toString() + longitude.toString();
  try {
    await insertData1(id, title, desc, latitude, longitude, heading, accuracy);
    await retriveData();
    console.log("saveloca", data);
  } catch (e) {
    console.log("saveError:", e);
  }
};

// create a component
const HomeScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [heading, setHeading] = useState(null);
  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    startWatching();
    findCoordinates();
    //insertData1("1","title","desc","latitude","longitude","accuracy","heading")
    retriveData();
  }, []);

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let location = position.coords;
        //setLocation(location_string);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setAccuracy(location.accuracy);
        setHeading(location.heading);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const onPressSave = () => {
    findCoordinates();
    navigation.navigate("save", {
      params: {
        latitude,
        longitude,
        heading,
        accuracy
      },
      saveFunc: saveLocationDetails
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 1,
          longitudeDelta: 1
        }}
      >
      {!!latitude && !!longitude && (
        <MapView.Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={"Your Location"}
        />
      )}
      </MapView>
      {err ? <Text> Please allow location service </Text> : null}
      <View style={styles.lowerContainer}>
        <View styles={styles.lowerText}>
          <Text>Location</Text>
          <Text>latitude: {latitude}</Text>
          <Text>longitude: {longitude}</Text>
          <Text>accuracy: {accuracy}</Text>
          <Text>heading: {heading}</Text>
        </View>
        <View style={styles.lowerBtn}>
          <Button title="Save this location" onPress={onPressSave} />
          <Button
            title="View all locations"
            onPress={() => {
              navigation.navigate("list", { list: data });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 50
  },
  mapView: {
    flex: 2
  },
  lowerContainer: {
    flex: 1,
    flexDirection: "row"
  },
  lowerText: {
    flex: 0.05
  },
  lowerBtn: {
    flex: 0.5
  }
});

export default HomeScreen;
