   	/**The worker sends data to the server  */
   /**
    * @type {function} onmessage
    * called when message event occur.
    * 
	* @param {Object} - e
    */
        onmessage = e => {

   /**
	* @type {object}
	* xmlhttprequest: You can retrieve data from a URL without having to do a full page refresh, so you can update only a part of page.
	*/
	    let xhr = new XMLHttpRequest();

   /**
	* let you create a form programatically and not an html form.
	*/
	    let formData = new FormData();

   /**
	* @type {string} 
	* JSON.stringify( e.data ): in that way we have the data (value) as json string.
	* 
	* append method: add the key and the value
	*/
	    formData.append( "params", JSON.stringify( e.data ) );

   /**
	* overwrite the existing xhr that's it empty.
	* 
	* onreadystatechange is an event that do what the function code said.
	* function @returns data 
	*/
	    xhr.onreadystatechange = function() {

       /**
	    * @property {number}
	    * if xmlhttprequest = 4 and status = 200 means that handle its correct.	
	    */
		    if ( xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 ) {		
				console.log( JSON.parse( xhr.responseText ) );
				
           /**
	        * @returns data from database.
	        * post data back to client (data comes from responseText).
	        */
	  	        postMessage( JSON.parse( xhr.responseText ) );
		    }
	    };

   /**
	* specifies type of request, the method(POST) and the action path (e.data.path).
	*/
	   xhr.open('POST', '/admin/api/web' + e.data.path );

   /**
	* send request to the server.
	*/
	xhr.send( formData );
}; 