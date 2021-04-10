import React from 'react'
import { Link } from 'react-router-dom'

const ThankyouPage = () => {
    return (
        <main className="blunk_order_page">
            <div className="container margin_60_20">
                <div className="row justify-content-center">
                    <div className="row"> 
                        <img src="img/thank-you.jpg"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="row  margin_60_20">
                    <span> back to <Link to="/partner"><bold>Home page</bold></Link></span>
                </div> 
                </div> 
            </div> 
        </main>
    )
}

export default ThankyouPage
