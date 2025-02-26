import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");  // Track login errors

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage("");  // Reset error before attempting login
        try {
            const success = await login(email, password);
            console.log("success", success);
            if (!success) {
                setErrorMessage("Invalid email or password"); // Show error if login fails
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Try again!");
        }
        setLoading(false);
    };

    return (
        <ImageBackground style={styles.background}>
            <View style={styles.overlay}>
                <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.card}>
                    <Text style={styles.title}>Welcome Back</Text>

                    <Animatable.View animation="fadeIn" delay={500} style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#bbb"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeIn" delay={700} style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#bbb"
                        />
                    </Animatable.View>

                    {/* Show error message if login fails */}
                    {errorMessage ? (
                        <Animatable.Text animation="shake" style={styles.errorText}>
                            {errorMessage}
                        </Animatable.Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                        disabled={loading} // Disable button when loading
                    >
                        <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradientButton}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signupTextContainer}>
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>

                    {/* Reset Password Link */}
                    <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Reset Password?</Text>
                    </TouchableOpacity>

                </Animatable.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5,
    },
    input: {
        height: 45,
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        paddingHorizontal: 15,
        color: "#333",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    gradientButton: {
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signupTextContainer: {
        marginTop: 15,
        alignItems: "center",
    },
    signupText: {
        color: "#2575fc",
        fontWeight: "bold",
    },
    forgotPasswordContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    forgotPasswordText: {
        color: "#ff3b30", // Red color for emphasis
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
