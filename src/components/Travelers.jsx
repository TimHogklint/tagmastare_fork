
import PlusMinus from './PlusMins';
function TicketTravelers({ setTravelerArr, travelerArray }) {
  return (
    
    <div className="ticketcontainer">
            <div className="ticketamounts">
              
                <div className='traveler'>
                  Vuxen:
                  <PlusMinus
                    traveler='Vuxen'
                    setTravelerArr={setTravelerArr}
                    travelerArray={travelerArray}
                  />
                </div>
                <div className='traveler'>
                  Barn / Ungdom:
                  <PlusMinus
                    traveler='Barn'
                    setTravelerArr={setTravelerArr}
                    travelerArray={travelerArray}
                  />
                </div>
                <div className='traveler'>
                  Pensionär:
                  <PlusMinus
                    traveler='Pensionär'
                    setTravelerArr={setTravelerArr}
                    travelerArray={travelerArray}
                  />
                </div>
                <div className='traveler'>
                  Student:
                  <PlusMinus
                    traveler='Student'
                    setTravelerArr={setTravelerArr}
                    travelerArray={travelerArray}
                  />
        </div>
      </div>
      </div>
                
             
   
  );
}

export default TicketTravelers;