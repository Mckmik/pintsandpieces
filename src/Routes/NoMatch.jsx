import { Link } from "react-router-dom";

function NoMatch() {

  return(
    <>
    <div>
    <h2 className='mochiy-pop-one-regular'>Oops!</h2>
    <p className='mochiy-pop-one-regular'>This page doesn't exist!</p>
    <Link  className='mochiy-pop-one-regular' to="/">Home</Link>
    </div>
    
    </>
  )
}
export default NoMatch;