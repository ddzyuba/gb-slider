import { Fragment } from 'react';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import './style.scss';
import edit from './edit';
import Items from './components/Items';
import Arrows from './components/Arrows';
import './backendSlider';

export default registerBlockType(
    'wecode-slider-block/slider', {
        title: __( 'Wecode Slider', 'wecode-slider' ),
        description: __( 'Creates a slider', 'wecode-slider' ),
        category: 'common',
        icon: 'businessman',
        keywords: [
            __( 'slider', 'wecode-slider' ),
        ],

        attributes : {
            items          : {
                type     : 'array',
                source   : 'query',
                selector : '.wecode-slider .ws-item',
                default  : [],
                query    : {
                    media_id   : {
                        type      : 'string',
                        source    : 'attribute',
                        selector  : '.ws-item-image',
                        attribute : 'data-media-id'
                    },
                    media_alt  : {
                        type      : 'string',
                        source    : 'attribute',
                        selector  : '.ws-item-image',
                        attribute : 'alt'
                    },
                    media_html : {
                        type      : 'string',
                        source    : 'html',
                        selector  : '.ws-item-img-html'
                    },
                }
            }
        },

        edit: edit, 

        save : ( { attributes } ) => {
            const { items } = attributes;

            return (
                <Items
                    items={ items }
                />
            );
        },
    },
);