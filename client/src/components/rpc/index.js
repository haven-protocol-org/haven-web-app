// Library Imports
import React from "react";

class RPC extends React.Component {

    static call_rpc(strMethod, objParams) {

        // Build the request
        var objRequest = {
            id:0,
            jsonrpc:"2.0",
            method:strMethod,
            params:objParams
        };

        console.log("Request = ")
        console.log(objRequest);
        
        // NEAC - make a call to the RPC code
        return window
            .fetch("/rpc", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(objRequest)
            })
            .then(function(response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error("invalid response");
            })
            .then(function(jsonResponse) {
                return JSON.parse(jsonResponse);
            });
    }
    
    render() {
        return "";
    }
}

export default RPC;
