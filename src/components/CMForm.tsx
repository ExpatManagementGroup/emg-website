'use client'
import Script from 'next/script';
import { useState, useEffect } from 'react';


export default function CMForm(props: any) {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

  setIsClient(true);

  }, []);

  if (!isClient) return null;

  const classNamesArray = ['js-cm-form', props.className].join(' ');
  const classNames = classNamesArray.trim();
  return (
    <>
      <form 
        className={classNames} 
        id="subForm" 
        action="https://www.createsend.com/t/subscribeerror?description=" 
        method="post"
        data-id="191722FC90141D02184CB1B62AB3DC264CE0754AD87FC5521825C27A7F2248F48FEAFE7081FAED20D1BA43C741E5464256CC01F6718F9B64F2BEDC9D57C1E7D3"
      >
        <input 
          aria-label="Name" 
          id="fieldName" 
          maxLength={200} 
          name="cm-name" 
          type='text'
          required 
          placeholder='Name'
        />
        <input 
          autoComplete="Email" 
          aria-label="Email" 
          className="js-cm-email-input qa-input-email" 
          id="fieldEmail" 
          maxLength={200} 
          name="cm-tlydpr-tlydpr" 
          required 
          type="email" 
          placeholder="Email"
        />
        <div className='country_signup'>
          <span className="selectspan">
            <select 
              aria-label="Country" 
              id="fieldjkjtdkl" 
              name="cm-fo-jkjtdkl" 
              defaultValue=""
            >
            <option disabled value="">Select Country</option><option value="1763248">Afghanistan</option><option value="1763249">Albania</option><option value="1763250">Algeria</option><option value="1763251">American Samoa</option><option value="1763252">Andorra</option><option value="1763253">Angola</option><option value="1763493">Anguilla</option><option value="1763494">Antigua &amp; Barbuda</option><option value="1763495">Argentina</option><option value="1763496">Armenia</option><option value="1763497">Aruba</option><option value="1763498">Australia</option><option value="1763487">Austria</option><option value="1763488">Azerbaijan</option><option value="1763489">Azores</option><option value="1763490">Bahamas</option><option value="1763491">Bahrain</option><option value="1763492">Bangladesh</option><option value="1763481">Barbados</option><option value="1763482">Belarus</option><option value="1763483">Belgium</option><option value="1763484">Belize</option><option value="1763485">Benin</option><option value="1763486">Bermuda</option><option value="1763475">Bhutan</option><option value="1763476">Bolivia</option><option value="1763477">Bonaire</option><option value="1763478">Bosnia &amp; Herzegovina</option><option value="1763479">Botswana</option><option value="1763480">Brazil</option><option value="1763469">British Indian Ocean Ter</option><option value="1763470">Brunei</option><option value="1763471">Bulgaria</option><option value="1763472">Burkina Faso</option><option value="1763473">Burundi</option><option value="1763474">Cambodia</option><option value="1763463">Cameroon</option><option value="1763464">Canada</option><option value="1763465">Canary Islands</option><option value="1763466">Cape Verde</option><option value="1763467">Cayman Islands</option><option value="1763468">Central African Republic</option><option value="1763457">Chad</option><option value="1763458">Channel Islands</option><option value="1763459">Chile</option><option value="1763460">China</option><option value="1763461">Christmas Island</option><option value="1763462">Cocos Island</option><option value="1763451">Colombia</option><option value="1763452">Comoros</option><option value="1763453">Congo</option><option value="1763454">Congo Democratic Rep</option><option value="1763455">Cook Islands</option><option value="1763456">Costa Rica</option><option value="1763445">Cote D$apos;Ivoire</option><option value="1763446">Croatia</option><option value="1763447">Cuba</option><option value="1763448">Curacao</option><option value="1763449">Cyprus</option><option value="1763450">Czech Republic</option><option value="1763439">Denmark</option><option value="1763440">Djibouti</option><option value="1763441">Dominica</option><option value="1763442">Dominican Republic</option><option value="1763443">East Timor</option><option value="1763444">Ecuador</option><option value="1763433">Egypt</option><option value="1763434">El Salvador</option><option value="1763435">Equatorial Guinea</option><option value="1763436">Eritrea</option><option value="1763437">Estonia</option><option value="1763438">Ethiopia</option><option value="1763427">Falkland Islands</option><option value="1763428">Faroe Islands</option><option value="1763429">Fiji</option><option value="1763430">Finland</option><option value="1763431">France</option><option value="1763432">French Guiana</option><option value="1763421">French Polynesia</option><option value="1763422">French Southern Ter</option><option value="1763423">Gabon</option><option value="1763424">Gambia</option><option value="1763425">Georgia</option><option value="1763426">Germany</option><option value="1763415">Ghana</option><option value="1763416">Gibraltar</option><option value="1763417">Great Britain</option><option value="1763418">Greece</option><option value="1763419">Greenland</option><option value="1763420">Grenada</option><option value="1763409">Guadeloupe</option><option value="1763410">Guam</option><option value="1763411">Guatemala</option><option value="1763412">Guernsey</option><option value="1763413">Guinea</option><option value="1763414">Guinea-Bissau</option><option value="1763403">Guyana</option><option value="1763404">Haiti</option><option value="1763405">Honduras</option><option value="1763406">Hong Kong</option><option value="1763407">Hungary</option><option value="1763408">Iceland</option><option value="1763397">India</option><option value="1763398">Indonesia</option><option value="1763399">Iran</option><option value="1763400">Iraq</option><option value="1763401">Ireland</option><option value="1763402">Isle of Man</option><option value="1763391">Israel</option><option value="1763392">Italy</option><option value="1763393">Jamaica</option><option value="1763394">Japan</option><option value="1763395">Jersey</option><option value="1763396">Jordan</option><option value="1763385">Kazakhstan</option><option value="1763386">Kenya</option><option value="1763387">Kiribati</option><option value="1763388">Korea North</option><option value="1763389">Korea South</option><option value="1763390">Kuwait</option><option value="1763379">Kyrgyzstan</option><option value="1763380">Laos</option><option value="1763381">Latvia</option><option value="1763382">Lebanon</option><option value="1763383">Lesotho</option><option value="1763384">Liberia</option><option value="1763373">Libya</option><option value="1763374">Liechtenstein</option><option value="1763375">Lithuania</option><option value="1763376">Luxembourg</option><option value="1763377">Macau</option><option value="1763378">Macedonia</option><option value="1763367">Madagascar</option><option value="1763368">Malawi</option><option value="1763369">Malaysia</option><option value="1763370">Maldives</option><option value="1763371">Mali</option><option value="1763372">Malta</option><option value="1763361">Marshall Islands</option><option value="1763362">Martinique</option><option value="1763363">Mauritania</option><option value="1763364">Mauritius</option><option value="1763365">Mayotte</option><option value="1763366">Mexico</option><option value="1763355">Midway Islands</option><option value="1763356">Moldova</option><option value="1763357">Monaco</option><option value="1763358">Mongolia</option><option value="1763359">Montenegro</option><option value="1763360">Montserrat</option><option value="1763349">Morocco</option><option value="1763350">Mozambique</option><option value="1763351">Myanmar</option><option value="1763352">Namibia</option><option value="1763353">Nauru</option><option value="1763354">Nepal</option><option value="1763343">Netherland Antilles</option><option value="1763344">Netherlands</option><option value="1763345">Nevis</option><option value="1763346">New Caledonia</option><option value="1763347">New Zealand</option><option value="1763348">Nicaragua</option><option value="1763337">Niger</option><option value="1763338">Nigeria</option><option value="1763339">Niue</option><option value="1763340">Norfolk Island</option><option value="1763341">Norway</option><option value="1763342">Oman</option><option value="1763331">Pakistan</option><option value="1763332">Palau Island</option><option value="1763333">Palestine</option><option value="1763334">Panama</option><option value="1763335">Papua New Guinea</option><option value="1763336">Paraguay</option><option value="1763325">Peru</option><option value="1763326">Philippines</option><option value="1763327">Pitcairn Island</option><option value="1763328">Poland</option><option value="1763329">Portugal</option><option value="1763330">Puerto Rico</option><option value="1763319">Qatar</option><option value="1763320">Reunion</option><option value="1763321">Romania</option><option value="1763322">Russia</option><option value="1763323">Rwanda</option><option value="1763324">Saipan</option><option value="1763313">Samoa</option><option value="1763314">Samoa American</option><option value="1763315">San Marino</option><option value="1763316">Sao Tome &amp; Principe</option><option value="1763317">Saudi Arabia</option><option value="1763318">Senegal</option><option value="1763307">Serbia</option><option value="1763308">Serbia &amp; Montenegro</option><option value="1763309">Seychelles</option><option value="1763310">Sierra Leone</option><option value="1763311">Singapore</option><option value="1763312">Slovakia</option><option value="1763301">Slovenia</option><option value="1763302">Solomon Islands</option><option value="1763303">Somalia</option><option value="1763304">South Africa</option><option value="1763305">South Sudan</option><option value="1763306">Spain</option><option value="1763295">Sri Lanka</option><option value="1763296">St Barthelemy</option><option value="1763297">St Eustatius</option><option value="1763298">St Helena</option><option value="1763299">St Kitts-Nevis</option><option value="1763300">St Lucia</option><option value="1763289">St Maarten</option><option value="1763290">St Pierre &amp; Miquelon</option><option value="1763291">St Vincent &amp; Grenadines</option><option value="1763292">Sudan</option><option value="1763293">Suriname</option><option value="1763294">Swaziland</option><option value="1763283">Sweden</option><option value="1763284">Switzerland</option><option value="1763285">Syria</option><option value="1763286">Tahiti</option><option value="1763287">Taiwan</option><option value="1763288">Tajikistan</option><option value="1763277">Tanzania</option><option value="1763278">Thailand</option><option value="1763279">Togo</option><option value="1763280">Tokelau</option><option value="1763281">Tonga</option><option value="1763282">Trinidad &amp; Tobago</option><option value="1763271">Tunisia</option><option value="1763272">Turkey</option><option value="1763273">Turkmenistan</option><option value="1763274">Turks &amp; Caicos Is</option><option value="1763275">Tuvalu</option><option value="1763276">Uganda</option><option value="1763265">Ukraine</option><option value="1763266">United Arab Emirates</option><option value="1763267">United Kingdom</option><option value="1763268">United States of America</option><option value="1763269">Uruguay</option><option value="1763270">Uzbekistan</option><option value="1763259">Vanuatu</option><option value="1763260">Vatican City State</option><option value="1763261">Venezuela</option><option value="1763262">Vietnam</option><option value="1763263">Virgin Islands (Brit)</option><option value="1763264">Virgin Islands (USA)</option><option value="1763254">Wake Island</option><option value="1763255">Wallis &amp; Futana Is</option><option value="1763256">Yemen</option><option value="1763257">Zambia</option><option value="1763258">Zimbabwe</option></select>
          </span>
          <button className='button' type="submit">Sign up</button>
        </div>
      </form>
      <Script src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js" strategy="lazyOnload" />
    </>
    )
  }