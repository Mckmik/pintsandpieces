import { useState,useEffect } from "react";
import DOMPurify from "dompurify";
function Boardgame(game) {

    const [bg, setBg] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        createGameObj();
        
    }, []);

    const createGameObj = ()=>{
        let obj ={};
        const getObj= () => {for(let i = 0; i < 4; i++){
                obj = {...obj,[game[i].name]: DOMPurify.sanitize(game[i].value)};
                }
            return {...obj,...game[4].attributes,...{"bgg":"https://boardgamegeek.com/boardgame/"+game.objectId}};
            }
        setBg(getObj())
        setLoading(false);
    }
    
    
    // console.log(game);
    // console.log(bg)
    // console.log(bg.name);

    return loading ? (<p>Loading...</p>): (
        <div className="card">
            <a href={bg.bgg} target="_blank">
                <img src={bg.image} style={{ 
                        margin: 'auto',
                        height: '200px',
                        width: '200px'
                    }}/>
            </a>
            <h3 dangerouslySetInnerHTML={ {__html: bg.name}}></h3>
            <p>{bg.minplayers == bg.maxplayers ? bg.maxplayers : bg.minplayers +' - '+bg.maxplayers} players | {bg.minplaytime == bg.maxplaytime? bg.maxplaytime : bg.minplaytime +' - '+bg.maxplaytime} minutes</p>
        </div>
    )
}
export default Boardgame