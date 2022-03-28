import React, { useState, useEffect } from 'react';
import "./HerbsEdit.css";

function App() {
    return (
        <div className={'app'}>
            <div className={'leftSide'}>

            </div>
            <div className={'rightSide'}>
                <span className={'suche'}>Suche</span>
                <span className={'HerbName'}>Name</span>
                <span className={'category'}>Kategorie</span>
                <span className={'herbDescription'}>Beschreibung</span>
                <span className={'category'}>Kategorie</span>
                <span className={'herbApplication'}>Anwendung</span>
                <span className={'category'}>Kategorie</span>
            </div>
        </div>
    );
}

export default App;
