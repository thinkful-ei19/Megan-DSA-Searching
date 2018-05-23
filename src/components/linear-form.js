import React from 'react'

export default function LinearForm(props){
    return(
        <div className='linear'>
            <h2>Linear Question</h2>
            <form
            onSubmit={ e=>{
                e.preventDefault();
                props.findGuess(Number(e.target.linearGuess.value));
                e.target.linearGuess.value='';
            }
            }
            >
                <input 
                    type='text'
                    name='linearGuess'
                    className='form linear'
                    placeholder='Enter Linear Guess'
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