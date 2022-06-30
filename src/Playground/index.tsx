import React, { useState, useRef, useEffect } from 'react';

import ReactNumberFormat from './ReactNumberFormat';
import MuiTextField from './MuiTextField';



function Playground() {
    return (
        <>
            <div>playground</div>
            <ReactNumberFormat />
            <MuiTextField />
        </>
    );

}

export { Playground as default }