import React from 'react'

export const Header = (props) => {
    return (
        <div className="header">
            <h1>Chat App</h1>
            {props.children}
        </div>
    )
}
