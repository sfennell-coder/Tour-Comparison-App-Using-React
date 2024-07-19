import React, { useState, useEffect } from 'react'; // import from react step 2 requirement

const apiURL = 'https://course-api.com/react-tours-project'; // api url given from canvas assignment

export default function Gallery(){
    const [load, setLoad] = useState(true); // load with useState step 2 requirement
    const [tourLists, setTourList] = useState([]); // store data in useState component step 2 requirement
    const getTours = async()=>{
        setLoad(true);
        try{
            let response = await fetch(apiURL), // fetching data from api
            tourLists = await response.json();
            setLoad(false);
            setTourList(tourLists);
        }catch(error){ // error handling step 2 requirement
            setLoad(false);
            console.log('Error fetching tours from api: '+ error);
            alert('Unforunately, the system was unable to fetch the tour data from the api. Please, contact IS Support.');
        }
    }

    useEffect(()=>{// react component step 2 requirement
        getTours();
    },[])

    // hide tour from display and read less/read more function for button in return step 2 requirements
    let hideTour = (id)=>{
        const manageTour = tourLists.filter((tourList)=>tourList.id !== id);
        setTourList(manageTour);
    },
    readMoreLess = (id)=>{
        const manageTour = tourLists.map((tourList)=>
            tourList.id === id ? {... tourList, showDetails: !tourList.showDetails} : tourList
        );
        setTourList(manageTour);
    };

    return( // tour list display. Including:id,name,image,price, and special effect info. 2 required buttons for step 2 requirement
        <div className='tourList'>
            {tourLists.map((tourList)=>(
                <div key={tourList.id}>
                    <h3>{tourList.name}</h3>
                    <img src={tourList.image}
                    alt={tourList.name}/>
                    {`$${tourList.price}`}
                    <div>
                        {tourList.showDetails ? tour.info : tourList.substring(0,50)+'...'} 
                        <button onClick={()=> readMoreLess(tourList.id)}>
                            {tourList.showDetails ? 'Read Less' : 'Read More'}
                        </button>
                        <button onClick={()=>hideTour(tourList.id)}>
                            Not Interested
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
};