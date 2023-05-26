import React, {useEffect, useMemo, useState} from "react";
import {BrowserBarcodeReader, ChecksumException, FormatException, NotFoundException} from "@zxing/library";

export default function ScanBarcodeFromCamera({onSuccess, onError}: {
    onSuccess: (e: string) => void,
    onError: (e: string) => void
}) {
    const [selectedDeviceId, setSelectedDeviceId] = useState("");

    const codeReader = useMemo(() => new BrowserBarcodeReader(500), [])

    console.log("ZXing code reader initialized");

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then(videoInputDevices => {
                if (videoInputDevices.length > 0) setSelectedDeviceId(videoInputDevices[0].deviceId)
            })
            .catch(err => {
                console.error(`${err}`);
            });
    }, [codeReader]);

    function decodeContinuously(selectedDeviceId: any) {
        codeReader.decodeFromInputVideoDeviceContinuously(
            selectedDeviceId,
            "video",
            (result, err) => {
                if (result) {
                    // properly decoded qr code
                    console.log("Found QR code!", result);
                    onSuccess(result.getText());
                }

                if (err) {
                    // As long as this error belongs into one of the following categories
                    // the code reader is going to continue as excepted. Any other error
                    // will stop the decoding loop.
                    //
                    // Excepted Exceptions:
                    //
                    //  - NotFoundException
                    //  - ChecksumException
                    //  - FormatException

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
        ).catch(err => console.error(`${err}`));
    }

    useEffect(() => {
        decodeContinuously(selectedDeviceId);
        console.log(`Started decode from camera with id ${selectedDeviceId}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDeviceId]);

    useEffect(() => {
        return () => {
            codeReader.stopContinuousDecode()
            codeReader.reset()
        }
    }, [codeReader])

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div>
                    <video id="video" style={{width: "80%"}}/>
                </div>
            </section>
        </main>
    );
}