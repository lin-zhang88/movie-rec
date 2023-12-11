import { Component } from 'react';
import Button from '@mui/material/Button';

export default class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "Home Page",
            genre: null,
            subgenre: null,
            year: null,
            runtime: null,
            language: null
        }
        this.setNewTab = (newTab) => {
            this.setState({
                activeTab: newTab
            });
        }
        render(){
            return{
                <>
                    <nav className="navbar"
                </>
            }
        }
    }
}
