import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
const { __ } = wp.i18n;
import isUndefined from 'lodash/isUndefined';
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { RawHTML } = wp.element;

class Item extends Component {
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

	onImageSelect = ( media ) => {
		const { index } = this.props;
		this.props.onImageSelect( media, index );
	};

	onDeleteItem = ( e ) => {
		const { index } = this.props;
		this.props.onDeleteItem();
	};

	_parseImgHtml = ( media_id, media_html, media_alt, isEditor = false ) => {
		const parser = new DOMParser();
		const html = parser.parseFromString( media_html, 'text/html' );
		const img = html.getElementsByTagName( 'img' )[0];
		if ( isUndefined( img ) ) {
			return null;
		}
		img.classList.add( 'ws-item-image' );
		img.setAttribute( 'alt', media_alt );
		img.dataset.mediaId = media_id;

		return img.outerHTML.replace(/>$(?!\/)/, ' />');
	};

	mediaRender = ( { open } ) => {
		const { media_id, media_html, media_alt, index } = this.props;

		if ( parseInt( media_id ) ) {
			return (
				<div className={ `row` }>
					<div>
						<a onClick={ open } href={ `#` } title={ __( 'Replace image' ) }>
							<RawHTML className={`ws-item-img-html`}>{ this._parseImgHtml( media_id, media_html, media_alt, true ) }</RawHTML>
						</a>
					</div>
					<div>
						<a
							onClick={ this.onDeleteItem } href={ `#` } title={ __( 'Delete item' ) }
							className={ `btn btn-sm btn-danger` }
						>
							{ __( 'Delete' ) }
						</a>
					</div>
				</div>
			);
		} else {
			return (
				<button onClick={ open } className={`btn btn-sm btn-secondary`}>
					{ __( 'Select/upload Image' ) }
				</button>
			);
		}
	};

	render() {
		if ( this.state.hasError ) {
			return (
				<p className={ `text-danger` }>{ __( 'Item component error!' ) }</p>
			);
		}

		const { media_id, media_html, media_alt, isSelected, index} = this.props;

		return (
			<div
				id={ `item-${ index }` }
				className={ `ws-item${ isSelected ? '-edit' : '' }` }
			>
				{ ( () => {
					if ( isSelected ) {
						return (
							<Fragment>
								<div className={ `form-group` }>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ this.onImageSelect }
											allowedTypes={ ['image'] }
											value={ media_id }
											render={ this.mediaRender }
										/>
									</MediaUploadCheck>
								</div>
							</Fragment>
						);
					} else {
						return (
							<Fragment>
								<RawHTML className={`ws-item-img-html`}>{ this._parseImgHtml(
									media_id,
									media_html,
									media_alt
								) }</RawHTML>
							</Fragment>
						);
					}
				} )() }
			</div>
		);
	}
}

Item.propTypes = {
	media_id      : PropTypes.string,
	media_html    : PropTypes.string,
	media_alt     : PropTypes.string,
	index         : PropTypes.number,
	isSelected    : PropTypes.bool,
	onChangeImage : PropTypes.func,
	onImageSelect : PropTypes.func,
	onDeleteItem  : PropTypes.func,
};

Item.defaultProps = {
	media_id      : '0',
	media_html    : '',
	media_alt     : '',
	index         : 4,
	isSelected    : false,
	onImageSelect : ( media, index ) => {
	},
	onDeleteItem  : ( index ) => {
	},
};

export default Item;
