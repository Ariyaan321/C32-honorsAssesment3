import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RandomInfo() {
    const [astName, setAstName] = useState("");
    const [astUrl, setAstUrl] = useState("");
    const [astIsHaz, setAstIsHazard] = useState("");

    useEffect(() => {
        const handleSubmit = async () => {
            const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";
            console.log("URL-->", url);
            try {
                const ans = await axios.get(url);
                const nearEarthObjects = ans.data.near_earth_objects;
                const num = nearEarthObjects.length;
                const randomIndex = Math.floor(Math.random() * num);
                const randomAsteroid = nearEarthObjects[randomIndex];

                setAstName(randomAsteroid.name);
                setAstUrl(randomAsteroid.nasa_jpl_url);
                setAstIsHazard(String(randomAsteroid.is_potentially_hazardous_asteroid));
            } catch (error) {
                console.error("Error fetching asteroid data:", error);
            }
        };
        handleSubmit();
    }, []);

    return (
        <View>
            <Text>Asteroid Name: {astName}</Text>
            <Text>Asteroid URL: {astUrl}</Text>
            <Text>Is Asteroid Hazardous: {astIsHaz}</Text>
        </View>
    );
}
