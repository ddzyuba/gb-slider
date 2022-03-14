import { Component, Fragment } from 'react';
const { __ } = wp.i18n;
import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
const { registerBlockType } = wp.blocks;
import Items from './components/Items';
import AddItem from './components/AddItem';

class WecodeSlider extends Component {
    constructor( props ) {
        super( props );
    }

    handleAddItemBtnClick = ( e ) => {
        const { attributes : { items } } = this.props;
        const updated = update( items || [], {
            $push : [{ image : '' }]
        } );

        this.props.setAttributes( { items : updated } );
    };

    handleImageChange = ( media, index ) => {
        const { attributes : { items } } = this.props;
        const item = items[index];
        const mediaHtml = `<img src="${media.sizes.large.url}" width="${media.sizes.large.width}" height="${media.sizes.large.height}">`;

        const updated = update( items, {
            [index] : {
                $set : {
                    ...item,
                    media_id  : `${ media.id }`,
                    media_html : mediaHtml,
                    media_alt : media.alt
                }
            }
        } );

        this.props.setAttributes( { items : updated } );
    };

    handleItemDelete = ( index ) => {
        const { attributes } = this.props;
        const { items } = attributes;

        const updated = update( items, {
            $splice : [[index, 1]]
        } );

        this.props.setAttributes( { items : updated } );
    };

	render() {
		const { className, attributes, setAttributes, isSelected } = this.props;
		const { items } = attributes;

		return [
            <div className={ `container` }>
                <Items
                    items={ items } 
                    isSelected={ isSelected }
                    onChangeInput={ this.handleChangeInput } 
                    onImageSelect={ this.handleImageChange }
                    onDeleteItem={ this.handleItemDelete }
                />
                { isSelected && <AddItem onBtnClick={ this.handleAddItemBtnClick } /> }
            </div>
        ];
	}
}

export default WecodeSlider;