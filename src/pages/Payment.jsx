
import React, { useState } from "react";
import Button from '../components/Button';

// Icons
//
// If you experiance all your icons being rendered the same despite being
// diffrent imports like this - you have to go into the <iconname>.svg and
// change ex. <pattern id="mastercard" AND fill="url(#mastercard)" /Tim
import { ReactComponent as VisaIc } from '../components/icons/visa.svg';
import { ReactComponent as MasterIc } from '../components/icons/mastercard.svg';
import { ReactComponent as SwishIc } from '../components/icons/swishlogo.svg';

// Primitives
import { ReactComponent as Ellipse } from '../components/icons/primitives/Ellipse_3.svg';

export default function Payment()
{
  // General input handler
  const [name, setName] = useState("")

  // Specialized input handlers.
  const [phone_fname, phone_setFname] = useState("")
  const [cc_fname, cc_setFname] = useState("")
  const [cc_expDate, cc_setExpDate] = useState("")
  const [cc_CVC, cc_setCVC] = useState("")
  //Swish , abit redundant as I have a phone above;
  const [swish_fname, swish_setFname] = useState("")

  // Only accept letter, you could go even further and
  // make sure it only allows one space between each sequence. 
  // ...
  // PROBLEM : Accepts blank space which could produce an bad input.
const name_handleChange = e => {
    setName(e.target.value.replace(/[^a-z]/gi, ' '));
}
  // Phone
  const phone_handleChange = e => {
  const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    phone_setFname(formatPhoneNumber(formattedPhoneNumber))
}
// Basic
// Editing the field will prodice errors.
const cardExpiry_handleChange = e => {
      // is input a number ? 

    var expiry = e.target.value;
      
    if (expiry.length >= 2)
    {
    expiry = expiry.substr(0, 2) + '/' + (expiry.substr(3) || '')
    }

      cc_setExpDate(expiry.substring(0,5));
}

// Needs validation , just havent looked at it.
const cardCVC_handleChange = e => {

    // is input a number ? 
    const re = /^[0-9\b]+$/;

    // much like the creditcard input we do the same here.
  if (e.target.value === '' || re.test(e.target.value)) {
    
      cc_setCVC(e.target.value.substring(0,3));
  }
  }
  
  // Handle input of CC
  // Stolen from https://stackoverflow.com/questions/36833366/format-credit-card-number :)
  // ...
  // Just wanna raise the idea that cc manfacturer can be learned form card sequence. 
  // mc, starts with - 51 to 55
  // v, starts with - 4
  const cc_handleChange = e => {
      const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
      const onlyNumbers = e.target.value.replace(/[^\d]/g, '')
      const lenght = onlyNumbers.substring(0, 16); // CC minus spaces.
    
      // we could drop an IF here and link it to card typ dropbox 
      // or remove the field entirely and update a icon at the end 
      // of card entry based on this.
    
      cc_setFname(lenght.replace(regex, (regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter(group => !!group).join(' ')
    ));
  }

  // In the swish input I use this method to make sure input is valid.
  const swish_handleChange = e => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    swish_setFname(formatPhoneNumber(formattedPhoneNumber))
  }
  
 // Method - send to Utils
 // Ive gone over a couple of diffrent methods for phone formatting but this is bar none
 // the best. 
 // https://tomduffytech.com/how-to-format-phone-number-in-react/
 // Will put this function in a utils folder later.
 function formatPhoneNumber(value) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

 // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

 // phoneNumberLength is used to know when to apply our formatting for the phone number
 const phoneNumberLength = phoneNumber.length;

 // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
   if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
 // the formatted number
  if (phoneNumberLength < 7) {
     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
   3,
    6
 )}-${phoneNumber.slice(6, 10)}`;
}

  return (
  <div> 
      <div className='go-back-header'>
        {/* <text className='go-back-header-text' >X Gå tillbaka</text> */}
        <Button className="go-back-btn" label='X Gå tillbaka'></Button>
      </div>  
      
      <div className='page-title-zone'>
        <text className='page-title-text'>Betalning</text>
      </div>

      <div className="payment-details">
      <h4>Dina uppgifter</h4>
      <input id="inputfield" placeholder="Name" autocomplete="off" value={name} onChange={name_handleChange} />
      <input id="inputfield" placeholder="Email"autocomplete="off" />
      <input id="inputfield" placeholder="Mobil"autocomplete="off" onChange={(e) => phone_handleChange(e)} value={phone_fname}/>
    
      <div className="creditcard-menu" >
      <h4>Betalsätt</h4>
        
      {/* Region Kort typ - dropdown list ?*/}
      {/* Would be nice if drop down fill the "Kort" with selected choice.*/}
      <div className="card-dropdown-box">
      <div className="visa1Icon"><VisaIc/></div>
      <div className="mastercard2019Logo1Icon"><MasterIc/></div>
          
        {/* I want icons to show up next to the cc-choices */}
        <select className="kortDiv">
          <option value="cc-mastercard">MasterCard</option>
          <option value="cc-visa">Visa</option>
        </select>

      <div className="cc_ellipseIcon"><Ellipse/></div>
      </div>
      {/* RegionEnd */}
      
      {/* Region Card - details box*/}
      <div className="cardentry-box">
      <div className="horizontal-divider" />
      <input className="kortnummer-input" placeholder='Kortnummer' value={cc_fname} onChange={cc_handleChange}></input>
      <input className="mMDiv" placeholder='MM/ÅÅ' value={cc_expDate} onChange={cardExpiry_handleChange}></input>
      <input className="cVCDiv" placeholder='CVC' value={cc_CVC} onChange={cardCVC_handleChange}></input>
      <div className="vertical-divider"></div> {/* lineIcon */}
        </div>
      {/* RegionEnd */}

      {/* Region Swish - details entry ?*/}
      <div className="swish_frameDiv">
      <div className="swish_swishLogo11"><SwishIc/></div>
          <div className="swish_swishInputBox">
            <input className='swishInput' placeholder='Swish' onChange={(e) => swish_handleChange(e)} value={swish_fname}></input>
          </div>
      <div className="swish_ellipseIcon"><Ellipse/></div>
      </div>
      {/* RegionEnd */}
        

        </div>
        
      {/* Exit div of main content div */}
      </div>

      {/* Bottom page comfirmation */}
      <div className='comfirm-group'>
          <div className="comfirm-button">
          <Button label="Bekräfta" />
          </div>
      </div>
  </div>
  )
}