import React from "react";

import "./LoadingIndicator.css";

export default function LoadingIndicator() {
    console.debug('loading indicator');
    return (<div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>)
}