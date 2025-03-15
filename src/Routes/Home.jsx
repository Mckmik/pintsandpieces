import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import XMLParser from 'react-xml-parser'
import Boardgame from '../Components/Boardgame'

function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstSunday, setFirstSunday] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://boardgamegeek.com/xmlapi/collection/keeve9?wanttoplay=1');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const xml = await response.text();
            const parser = new XMLParser();
            const xmlData = parser.parseFromString(xml);
            setData(xmlData);
            setLoading(false);
          } catch (e) {
            setError(e);
            setLoading(false);
          }
        };
        
        findNextFirstSunday(new Date().toDateString());
        fetchData();
      }, []);


    const  findNextSunday = (dateString) =>{
        let date = new Date(dateString)
        let diffDay = 7 - date.getDay() 
        let sundayDate = new Date(dateString);
        sundayDate.setHours(sundayDate.getHours() + (diffDay == 7 ? 0 : diffDay)*24)
        return sundayDate
     }

    const findNextFirstSunday = (dateString) =>{
        let date = new Date(dateString)
        let nextSunday = findNextSunday(date)
        if (nextSunday.getDate() >7){
            let dateOneWeekAfter = new Date(dateString)
            dateOneWeekAfter.setHours(dateOneWeekAfter.getHours() + 24 * 7)
            return findNextFirstSunday(dateOneWeekAfter)
        } else {
            setFirstSunday(nextSunday);
        }

    }
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }

    return(
        <>
        <div>
            <h2 className='mochiy-pop-one-regular'>Home</h2>
            <p className='mochiy-pop-one-regular'>{firstSunday.toLocaleDateString()}</p>
            <p className='mochiy-pop-one-regular'>1PM - 5PM</p>
            <p className='mochiy-pop-one-regular'><a href="https://drinkmeadhall.com/">Mead Hall</a></p>
            <div className='info'><p>Join me for some strategy games and delicious mead, beer, and cocktails! We will split into smaller groups if needed. Link to all my games at the bottom, text me if there's something you want to play!</p>
            </div>
        </div>
        <div>
        <p> Games I'm bringing:</p>
            <div>{data.children.map(item => <Boardgame key={item.attributes.collid} {...{...item.children,...{"objectId":item.attributes.objectid}}}/>)}</div>
            <Link  className='mochiy-pop-one-regular' to="/allgames">All Games</Link>
        </div>
        </>

    )
}

export default Home;