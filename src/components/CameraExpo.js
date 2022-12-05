import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Button,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CameraExpo({ getImageFromCamera, offCamera }) {
    const cameraRef = useRef();
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [source, setSource] = useState({});

    const [permission, requestPermission] = Camera.useCameraPermissions();

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const onSnap = async () => {
        if (cameraRef.current) {
            const source = await cameraRef.current.takePictureAsync();
            if (source) {
                setSource(source);
                await cameraRef.current.pausePreview();
                setIsPreview(true);
            }
        }
    };

    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
    };

    const onSaveImage = () => {
        if (source.uri) {
            getImageFromCamera(source);
        }
    };

    const cancelCamera = () => {
        offCamera();
    };

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }
    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.container}
                type={cameraType}
                onCameraReady={onCameraReady}
                useCamera2Api
            />
            {isPreview && (
                <>
                    <TouchableOpacity
                        onPress={cancelPreview}
                        style={styles.closeButton}
                        activeOpacity={0.7}
                    >
                        <AntDesign name="close" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={0.7}
                        onPress={onSaveImage}
                    >
                        <AntDesign name="save" size={32} color="#fff" />
                    </TouchableOpacity>
                </>
            )}
            {!isPreview && (
                <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onPress={switchCamera}
                    >
                        <MaterialIcons
                            name="flip-camera-ios"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onPress={onSnap}
                        style={styles.capture}
                    />
                    <TouchableOpacity
                        onPress={cancelCamera}
                        style={styles.cancelCamera}
                        activeOpacity={0.7}
                    >
                        <AntDesign name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        color: "#fff",
    },
    bottomButtonsContainer: {
        position: "absolute",
        flexDirection: "row",
        bottom: 24,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    capture: {
        backgroundColor: "#5A45FF",
        height: CAPTURE_SIZE,
        width: CAPTURE_SIZE,
        bottom: -10,
        borderRadius: Math.floor(CAPTURE_SIZE / 2),
        marginBottom: 24,
        marginHorizontal: 30,
    },
    closeButton: {
        position: "absolute",
        top: 35,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5A45FF",
        opacity: 0.7,
    },
    saveButton: {
        position: "absolute",
        top: 100,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5A45FF",
        opacity: 0.7,
    },
    cancelCamera: {
        position: "absolute",
        right: CAPTURE_SIZE + 20,
        height: CAPTURE_SIZE - 10,
        width: CAPTURE_SIZE - 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5A45FF",
        opacity: 0.7,
    },
});
