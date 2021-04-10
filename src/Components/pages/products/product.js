import React from 'react'

const product = () => {
    return (
        <>          
            <div className="owl-item active" style={{width: '186px', marginRight: '20px'}}>
                <div className="item_version_2">
                    <Link to="/listing_research">
                    <figure>
                        <span>34</span>
                        <img src="img/milano.jpg" data-src = "img/milano.jpg" alt="" className="owl-lazy" width={350} height={450} style={{opacity: 1}} />
                        <div className="info">
                            <small>Piatti</small>
                            <h3>Milanesi</h3>
                        </div>
                    </figure>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default product
