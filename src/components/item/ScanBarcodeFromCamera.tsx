import React, {useEffect, useMemo, useState} from "react";
import {BrowserBarcodeReader, ChecksumException, FormatException, NotFoundException,} from "@zxing/library";

export default function ScanBarcodeFromCamera({
                                                  onSuccess,
                                                  onError,
                                              }: {
    onSuccess: (e: string) => void;
    onError: (e: string) => void;
}) {
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [codeReader] = useState(
        useMemo(() => new BrowserBarcodeReader(10000), [])
    );

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then((videoInputDevices) => {
                if (videoInputDevices.length > 0)
                    setSelectedDeviceId(videoInputDevices[0].deviceId);
                console.log("ZXing code reader initialized");
            })
            .catch((err) => {
                console.error(`${err}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedDeviceId !== "") {
            decodeContinuously(selectedDeviceId);
            console.log(`Started decode from camera with id ${selectedDeviceId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDeviceId]);

    useEffect(() => {
        return () => {
            codeReader.stopContinuousDecode();
            codeReader.reset();
        };
    }, [codeReader]);

    function decodeContinuously(selectedDeviceId: any) {
        codeReader
            .decodeFromInputVideoDeviceContinuously(
                selectedDeviceId,
                "video",
                (result, err) => {
                    if (result) {
                        // properly decoded qr code
                        console.log("Found QR code!", result);
                        onSuccess(result.getText());
                    }

                    if (err) {
                        if (err instanceof NotFoundException) {
                            console.log("No QR code found.");
                        }

                        if (err instanceof ChecksumException) {
                            onError("A code was found, but it's read value was not valid.");
                        }

                        if (err instanceof FormatException) {
                            onError("A code was found, but it was in a invalid format.");
                        }
                    }
                }
            )
            .catch((err) => console.error(`${err}`));
    }

    return (
        <main style={{width: "100%"}} className="wrapper">
            <section
                style={{height: "100%", position: "relative"}}
                className="container"
                id="demo-content"
            >
                <div
                    style={{
                        border: "2px solid red",
                        position: "absolute",
                        top: "15%",
                        left: "10%",
                        width: "80%",
                        height: "70%",
                        display: "inline-block",
                    }}
                ></div>
                <div>
                    <video id="video" style={{width: "100%"}}/>
                </div>
            </section>
        </main>
    );
}
