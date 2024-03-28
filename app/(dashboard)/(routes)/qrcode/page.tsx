"use client"
import express, { Request, Response } from 'express';
import qrcode from 'qrcode';
import React, { useState } from 'react';


const Qrcode = () => {
    const [qrImage, setQrImage] = useState<string | null>(null);

    const generateQRCode = async () => {
        try {
            const data = 'Your data here'; // You can replace this with your desired data
            const qrDataURL = await qrcode.toDataURL(data);
            setQrImage(qrDataURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    return (
        <div>
            <h1>QR Code</h1>
            <button onClick={generateQRCode}>Generate QR Code</button>
            {qrImage && <img src={qrImage} alt="QR Code" />}
        </div>
    );
};

export default Qrcode;
