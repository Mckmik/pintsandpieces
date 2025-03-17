import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import XMLParser from 'react-xml-parser'
import Boardgame from '../Components/Boardgame'

function AllGames(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://boardgamegeek.com/xmlapi/collection/keeve9?own=1');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const xml = await response.text();
            const parser = new XMLParser();
            const xmlData = parser.parseFromString(xml);
            setData(xmlData);
            setFilteredData(xmlData.children);
            setLoading(false);
          } catch (e) {
            setError(e);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      const handleChange = e => {
        const searchString = e.target.value;
        setFilteredData(data.children.filter(
          game => {
            return (
              game.children[0]
              .value

              .toLowerCase()
              .includes(searchString.toLowerCase())
            )
          }
        ))
      };


    //   const getGameDetails = (gameid)=>{

    //     const fetchDetails = async () => {
    //         try {
    //           const response = await fetch(`https://boardgamegeek.com/xmlapi/boardgame/${gameid}`);
    //           if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //           }
    //           const xml = await response.text();
    //           const parser = new XMLParser();
    //           const xmlData = parser.parseFromString(xml);
    //           return xmlData;
    //         } catch (e) {
    //           setError(e);
    //           setLoading(false);
    //           return {};
    //         }
    //     };
    //     fetchDetails();

    //   }

    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }


    return(
        <>
            <h2 className='mochiy-pop-one-regular'>All Games</h2>
            <Link className='mochiy-pop-one-regular' to="/">Home</Link>
            <div>
            <input 
              // className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              type = "search" 
              placeholder = "Search" 
              onChange = {handleChange}
            />
            </div>
            <div>{filteredData.map(item => <Boardgame key={item.attributes.collid} {...{...item.children,...{"objectId":item.attributes.objectid}}}/>)}</div>
            <div><Link className='mochiy-pop-one-regular' to="/">Home</Link></div>
        </>
        
    )
}
export default AllGames