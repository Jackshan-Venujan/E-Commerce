import { useState } from 'react';
import {useNavigate} from 'react-router-dom'


export default function Search (){

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate('/');
        }
    }
    return(
        <form onSubmit={searchHandler}>
            <div className="input-group">
                
                <input
                type="text"
                id="search_field"
                className="form-control"
                placeholder="Enter Product Name ..."
                onChange={(e)=> {setKeyword(e.target.value)} }              // call back function
                value={keyword}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div> 
        </div>
    </form>
    )
}

// Not finished this option