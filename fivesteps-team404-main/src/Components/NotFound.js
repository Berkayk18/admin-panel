import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
	return(
		<div>
			<h2>Oeps!</h2>
			<p>Deze pagina bestaat niet!</p>
			<p>Terug naar de <b><Link to="/">home</Link></b> pagina.</p>
		</div>		
	);
}