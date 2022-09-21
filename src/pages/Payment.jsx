import Button from '../components/Button'

export default function Payment() {

  
  return (
  <div> 
      
      <div className='go-back-header'>
        <h5>X Gå tillbaka</h5>
      </div>

            <div className="payment-details">
      <h1>Betalning</h1>
      <h4>Dina uppgifter</h4>
      <input id="inputfield" type="name" placeholder="Name" />
      <br></br>
      <input id="inputfield" type="email" placeholder="Email" />
      <br></br>
      <input id="inputfield" placeholder="Mobil" />
      <h4>Betalsätt</h4>
      <input id="inputfield-card" placeholder="Kort" />
      

      <div className="cardentry-box">
      <div className="horizontal-divider" />
      <div className="kortnummerDiv">Kortnummer</div>
      <div className="mMDiv">MM/ÅÅ</div>
      <div className="cVCDiv">CVC</div>
      <div className="vertical-divider"></div> {/* lineIcon */}
        </div>
            
      <input id="inputfield" placeholder="Swish" />
            </div>
            
      <div className='comfirm-group'>
        <div id='details'>
            <h4>Bekräfta</h4>
            <Button label="Bekräfta"/>
        </div>
      </div>
      

      
  </div>

  )
}