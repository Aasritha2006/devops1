import React, { Component } from 'react';
import './MenuBar.css';
import { BASEURL, callApi } from './api';

class MenuBar extends Component {
    constructor()
    {
        super();
        this.state = {menulist: []};
        this.loadMenus = this.loadMenus.bind(this);
    }
    componentDidMount()
    {
        callApi("POST", BASEURL + "menus/getmenuitems", "", this.loadMenus);
    }
    loadMenus(response)
    {
        let data = JSON.parse(response);
        this.setState({menulist : data});
    }
    render() {
        const {menulist} = this.state;
        return (
            <div className='menubar'>
                <div className='menuheader'>
                    <img src='/menu.png' alt='' />
                    MENU
                </div>
                <div className='menulist'>
                    <ul>
                        {menulist.map((row)=>(
                            <li><img src={row.micon} alt='' /> {row.mtitle} </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MenuBar;
