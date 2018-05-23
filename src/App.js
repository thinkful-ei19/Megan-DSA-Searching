import React, { Component } from 'react';
import Count from './components/count'
import SearchResults from './components/search-results'
import BinaryForm from './components/binary-form'
import LinearForm from './components/linear-form'
import './App.css';



class App extends Component {
  constructor(){
    super();

    this.state={
      linear:'',
      binary:'',
      count:0
    }
  }
  findGuessLinear(val, arr){
    let tOrF='Not Here';
    let counter=0;

    for(let i=0; i<arr.length; i++){
      if(arr[i]===val){
        tOrF='It is here!';
        break;
      }
      counter++
    }
    this.setState({
      linear:tOrF,
      count:counter
    })
  }

  findGuessBinary(val, sortedArr, count=0, start=0, end=sortedArr.length-1){
    console.log(sortedArr)
    let index=Math.floor((start+end)/2);
    let item=sortedArr[index];
    if(start>end){
      return this.setState({
        binary:'Not Here',
        count:count
      })
    }
    if(item===val){
      return this.setState({
        binary:'It is here!',
        count:count
      })
    }
    if(item<val){
      return this.findGuessBinary(val, sortedArr, count+1, index+1, end);
    }
    if(item>val){
      return this.findGuessBinary(val, sortedArr, count+1, start, index-1);
    }

  }


  render() {
    const arr=[89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
    const sortedArr=arr.sort(function(a,b){return a-b;});
    return (
      <div className="App">
        <h1>Linear or Binary Inquiries</h1>
        <LinearForm findGuess={val=>this.findGuessLinear(val, arr)}/>
        <BinaryForm findBGuess={val=>this.findGuessBinary(val, sortedArr)}/>
        <SearchResults linear={this.state.linear} binary={this.state.binary}/>
        <Count count={this.state.count}/>
      </div>
    );
  }
}

export default App;
