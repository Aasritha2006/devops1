import React, { Component } from 'react';
import './Dashboard.css';
import { BASEURL, callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';

class Dashboard extends Component {
    constructor()
    {
        super();
        this.state = {fullname: ""};
        this.fullnameResponse = this.fullnameResponse.bind(this);
    }
    componentDidMount()
    {
        let CSR = getSession("csrid");
        if(CSR === "")
            this.logout();

        let data = JSON.stringify({
            csrid : CSR
        });
        callApi("POST", BASEURL + "users/fullname", data, this.fullnameResponse);
    }
    fullnameResponse(response)
    {
        let data = response.split("::");
        if(data[0] === "200")
            this.setState({fullname: data[1]});
        else
            this.logout();
    }
    logout()
    {
        setSession("csrid", "", -1);
        window.location.replace("/");
    }
    render() {
        const {fullname} = this.state;
        return (
            <div className='dashboard'>
                <div className='header'>
                    <img src='/logo.png' alt='' className='logo' />
                    <div className='logoText'>Job <span>Portal</span></div>
                    <img src='/logout.png' alt='' className='logout' onClick={()=>this.logout()} />
                    <label className='fullname'>{fullname}</label>
                </div>
                <div className='menu'>
                    <MenuBar/>
                </div>
                <div className='outlet'>OUTLET</div>
            </div>
        );
    }
}

export default Dashboard;
