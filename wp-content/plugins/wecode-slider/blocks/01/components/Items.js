import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
const { __ } = wp.i18n;
import Item from './Item';
import Arrows from './Arrows';

class Items extends Component {
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

	render() {
		const { items, isSelected } = this.props;

		if ( isEmpty( items ) ) {
			return (
				<p>{ __( 'Add slides' ) }</p>
			);
		} else if ( this.state.hasError ) {
			return (
				<p className={ `text-danger` }>{ __( 'Items component error!' ) }</p>
			);
		}

		if ( ! isSelected ) {
			return (
				<div className="wecode-slider">
                    <div className="wecode-slider__wrapper-outer">
                        <div className="wecode-slider__wrapper-inner">
							{
								items.length && items.map( ( item, index ) => {
									return <Item { ...item } index={ index } key={ `item-${ index }` }
									             isSelected={ isSelected }
									             onImageSelect={ this.props.onImageSelect }
									             onDeleteItem={ this.props.onDeleteItem }
									/>;
								} )
							}
						</div>
                        <Arrows />
                    </div>
                </div>
			);
		} else {
			return (
                    <div className="wecode-slider__wrapper-outer">
						<div className="wecode-slider__wrapper-inner">
							{
								items.length && items.map( ( item, index ) => {
									return <Item { ...item } index={ index } key={ `item-${ index }` }
									             isSelected={ isSelected }
									             onImageSelect={ this.props.onImageSelect }
									             onDeleteItem={ this.props.onDeleteItem }
									/>;
								} )
							}
						</div>
					</div>
			);
		}
		
	}
}

Items.propTypes = {
	items          : PropTypes.array.isRequired,
	isSelected     : PropTypes.bool,
	onImageSelect  : PropTypes.func,
	onDeleteItem   : PropTypes.func,
};

Items.defaultProps = {
	isSelected     : false,
	onImageSelect  : ( media, index ) => {
	},
	onDeleteItem   : ( index ) => {
	},
};

export default Items;
