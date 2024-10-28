import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function Info() {
    const { Id: data } = useLocalSearchParams();
    const [astName, setAstName] = useState("");
    const [astUrl, setAstUrl] = useState("");
    const [astIsHaz, setAstIsHazard] = useState("");

    useEffect(() => {
        const handleSubmit = async (id: string) => {
            if (!id) return;
            const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=ag9rqPxmvM9eIepR8Fog6my5ArWb8qtACa3gzlsr`;
            console.log("URL-->", url);
            try {
                const ans = await axios.get(url);
                if (ans.data) {
                    setAstName(ans.data.name);
                    setAstUrl(ans.data.nasa_jpl_url);
                    setAstIsHazard(String(ans.data.is_potentially_hazardous_asteroid));
                }
            } catch (error) {
                console.error("Error fetching asteroid data:", error);
            }
        };
        handleSubmit(data as string);
    }, [data]);

    return (
        <View>
            {astName ? (
                <View>
                    <Text>Asteroid Name: {astName}</Text>
                    <Text>Asteroid URL: {astUrl}</Text>
                    <Text>Is Asteroid Hazardous: {astIsHaz}</Text>
                </View>
            ) : (
                <Text>Not Found! Please Try Again</Text>
            )}
        </View>
    );
}
