import { GoogleLogout } from 'react-google-login';
import React from 'react';
import './css/Logout.css';  
import { Button } from 'react-bootstrap';
import getClientID from './getClientID';

function Logout() {

    const onSuccess = () => {
        console.log("Log out successful");
    }

    return (
        <div id="logoutButtonContainer">
            <GoogleLogout
                clientId={getClientID}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                render={renderProps => (
                    <Button 
                        variant="outline-danger" 
                        size="lg" 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        style={{ width: '200px' }} // You can adjust the button width here
                    >
                        Logout
                    </Button>
                )}
            />
        </div>
    );
}

export default Logout;