import React, { Fragment } from 'react';

const Arrows = () => {
	return (
		<Fragment>
            <a href={`#`} className={`wecode-slider__arrow wecode-slider__arrow-left`}>
                <span className={`wecode-slider__arrow-icon wecode-slider__arrow-icon-left`}></span>
            </a>
            <a href={`#`} className={`wecode-slider__arrow wecode-slider__arrow-right`}>
                <span className={`wecode-slider__arrow-icon wecode-slider__arrow-icon-right`}></span>
            </a>
        </Fragment>
	);
};

export default Arrows;