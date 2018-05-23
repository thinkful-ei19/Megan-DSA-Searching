'use strict';

//using dewey decimal system and a binary search, we would sort the objects in the
//based on their dewey number(if they aren't already in order)
//then cut the data in half and compare the dewey numbers
//if the dewey number is higher than the halfway mark, take the higher half of the set
//if it's lower, take the lower set
//then loop over each remaining object and compare the title to the title of the
//book we want to find

const library = [
  { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
  { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
  { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
  { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
  { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
  { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
  { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
  { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
  { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
  { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
];

class BinarySearchTree {
  constructor (key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  
  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
  
    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  
  find(key) {
    //if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  
  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
  
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function main(){
  const tree= new BinarySearchTree;
  tree.insert(25,25);
  tree.insert(15,15);
  tree.insert(50,50);
  tree.insert(10,10);
  tree.insert(24,24);
  tree.insert(35,35);
  tree.insert(70,70);
  tree.insert(4,4);
  tree.insert(12,12);
  tree.insert(18,18);
  tree.insert(31,31);
  tree.insert(44,44);
  tree.insert(66,66);
  tree.insert(90,90);
  tree.insert(22,22);    
  return tree;
}
// console.log(main());

function preOrder(tree){
  console.log(tree.key);
  if(tree.left){
    preOrder(tree.left);
  }
  if(tree.right){
    preOrder(tree.right);
  }
}
// preOrder(main()); 

function inOrder(tree){
  if(tree.left){
    inOrder(tree.left);
  }
  console.log(tree.key);
  if(tree.right){
    inOrder(tree.right);
  }
}
// inOrder(main());

function postOrder(tree){
  if(tree.left){
    postOrder(tree.left);
  }
  if(tree.right){
    postOrder(tree.right);
  }
  console.log(tree.key);
}
// postOrder(main());


function maxProfit(arr){
  let index=0;
  let lowest=arr[0];

  for(let i=0; i<arr.length; i++){
    if(arr[i]<lowest){
      lowest= arr[i];
      index=i;
    }
  }
  
  let highest=arr[index];

  for(let j=index; j<arr.length; j++){
    if(highest<arr[j]){
      highest=arr[j];
    }
  }
  return highest-lowest;

}
const arr=[128, 97, 121, 123, 98, 97, 105];

console.log(maxProfit(arr));