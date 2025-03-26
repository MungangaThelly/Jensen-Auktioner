import './Search.module.css';
import {useRef} from 'react';

//Denna komponent hanterar sökningen och skickar tillbaka ett sökvillkor.
//Props värdet searchProducts är en pekare till en funktion i containern
const Search = ({searchAuctions}) => {

    const textVal = useRef();

    console.log('searchAuctions är en funktion:', typeof searchAuctions === 'function');

    const handleClick = () => {
        //Här anropas funktionen i containern
        searchProducts(textVal.current.value);
    }

    return(<div id='search'>
        <input type="text" ref={textVal} placeholder='sök på en title...'/>
        <button onClick={handleClick}>Sök</button>
    </div>)
}

export default Search;