import React from "react";
import BingMapsReact from "bingmaps-react";
import { Button, Modal } from 'react-bootstrap';
const map=(latitude,longitude)=>{
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const pushPin = {
        center: {
          latitude,//: 12.5894,
          longitude,//:37.4442,
        },
        options: {
          title: "User",
        },
      }
      
      const pushPins = [pushPin];





}