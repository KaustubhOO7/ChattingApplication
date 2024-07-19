import React, { Component } from 'react';

class Counter extends Component {
    
    state = {
        count : 0,
        tags : ["tag1","tag2","tag3"]
    };

    render() { 
        
        return (
            <div>
                <span style={{ fontSize : 20}} className="badge badge-primary m-2">{this.badge()}</span>
                <button className="btn btn-secondary m-2" onClick={this.increment}>Increment</button>
                <button className='btn btn-danger' onClick={this.decrement}>Decrement</button>
            </div>
            
        );
    }

    increment = () =>{
        const {count} = this.state;
        this.setState({count : count+1})
    }

    decrement = () =>{
        const {count} = this.state;
        this.setState({count: count-1})
    }

    badge(){
        const {count} = this.state;
       let badge = this.state.count;
       badge = (badge === 0) ? "Zero" : badge;
       return badge;
    }




    
}
 
export default Counter;