import React from 'react'

export default function BinaryForm(props){
    return(
        <div className='binary'>
            <h2>Binary Question</h2>
            <form
            onSubmit={ e=>{
                e.preventDefault();
                props.findBGuess(Number(e.target.binaryGuess.value));
                e.target.binaryGuess.value='';
            }
            }
            >
                <input 
                    type='text'
                    name='binaryGuess'
                    className='form binary'
                    placeholder='Enter Binary Guess'
                />
                <input
                    type='submit'
                    id='guessButton'
                    className='button'
                />

            </form>
        </div>
    )
}