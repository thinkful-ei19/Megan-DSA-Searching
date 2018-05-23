import React from 'react'

export default function SearchResults (props){
    return(
        <div>
            <h2>Is it there?</h2>
            Linear: {props.linear}
            <br/>
            Binary: {props.binary}  
        </div>
    )
}