/**
*	Represents a company
*	@constructor
*	@param {integer} [id] - company id
*	@param {string} identifier - identifying string
*	@param {string} name - name of company
*	@param {companyStatusReference} status - indicates status of the company
*	@param {companyTypeReference} type - indecates type of the company
*	@param {string} addressLine1 - address line 1
*	@param {string} [addressLine2] - address line 2
*	@param {string} [city] - city
*	@param {string} [state] - state
*	@param {string} [zip] - zip code
*	@param {countryReference} [country] - country
*	@param {string} [phoneNumber] - company phone number
*	@param {string} [faxNumber] - company fax number
*	@param {string} [website] - company website
*	@param {integer} [territoryId] - territorial id of the company
*	@param {integer} [marketId] - market id
*	@param {string} [accountNumber] - number of the account
*	@param {contactReference} [defaultContact] - the default company contact
*	@param {string} [dateAquired]
*	@param {sicCodeReference} [sicCode]
*	@param {companyReference} [parentCompany]
*	@param {integer} [annualRevenue]
*	@param {integer} [numberOfEmployees]
*	@param {ownerShipTypeReference} [ownershipType]
*	@param {timeZoneReference} [timeZone]
*	@param {string} [leadSource]
*	@param {boolean} [leadFlag]
*	@param {boolean} [unsubscribeFlag] - opt out of marketing communications
*	@param {integer} [calendarId]
*	@param {boolean} [deletedFlag]
*	@param {string} [dateDeleted]
*	@param {stirng} [deletedBy]
*	@param {guid} [mobileGuid]
*	@param {currencyReference} [currency]
*	@param {metadata} [_info]
*	@param {array[customFieldValue]} [customFields]
**/
function company(options){
	this.prototype =  options.prototype;
	return this;
}
