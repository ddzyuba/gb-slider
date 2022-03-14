import React, { Component } from 'react';
import PropTypes from 'prop-types';
const { __ } = wp.i18n;

class AddItem extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			hasError : false,
		};
	}

	static getDerivedStateFromError( error ) {
		// Update state so the next render will show the fallback UI.
		return { hasError : true, error };
	}

	componentDidCatch( error, info ) {
		console.log( error );
		console.log( info );
	}

	onBtnClick = ( e ) => {
		this.props.onBtnClick( e );
	};

	render() {
		return (
			<p>
				<button
					className={ `btn btn-sm btn-primary add-item` }
					type={ `button` }
					onClick={ this.onBtnClick }
				>{ __( 'Add Slide' ) }</button>
			</p>
		);
	}
}

AddItem.propTypes = {
	onBtnClick : PropTypes.func.isRequired
};

AddItem.defaultProps = {};

export default AddItem;
