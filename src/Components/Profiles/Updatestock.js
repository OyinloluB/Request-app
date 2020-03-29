import React, { Component } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'

class Updatestock extends Component {
    state = {
        input: '',
        prod: ''
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    };
    render() {
        return (
            <div class='ui container' id="container">
                <div id="content-container">
                    <h6 id="updatestocks-header">Update your stock level</h6>
                    <Form onSubmit={this.handleSubmit}>
                        <div id="selectprod">
                            <h6>Select Product</h6>
                            <Input id="prod" list='products' onChange={this.handleChange} placeholder='Select Products...' />
                            <datalist id='products'>
                                <option value='Budweiser' />
                                <option value='Castle Lite' />
                                <option value='Hero' />
                                <option value='Grand Malt' />
                                <option value='Beta Malt' />
                                <option value='Trophy' />
                                <option value='Trophy Stout' />
                                <option value='Eagle Stout' />
                                <option value='Eagle Lager' />
                            </datalist>
                        </div>
                        <div id="stockvalue">
                            <h6>Stock Value</h6>
                            <Input id="input" onChange={this.handleChange} placeholder='Input Value...' />
                        </div>
                        <Button id="button">Submit</Button>
                    </Form>
                </div>
            </div>);
    }
}

export default Updatestock;