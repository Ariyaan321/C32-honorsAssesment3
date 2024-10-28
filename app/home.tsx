import { StyleSheet, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const Home = () => {
    const router = useRouter();
    const [id, setId] = useState("");

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder="Enter Asteroid"
                    onChangeText={(text) => setId(text)}
                />

                <Button
                    title="Submit"
                    onPress={() => router.push({ pathname: "/info", params: { Id: id } })}
                    disabled={id.length < 1}
                />
                <Button
                    title="Random Asteroid"
                    onPress={() => router.push("/randomInfo")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
