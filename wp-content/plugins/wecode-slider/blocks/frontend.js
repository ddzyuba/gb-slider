( function( $ ) {

	$( document ).ready( function () {

		const wecodeSlider = $( '.wecode-slider__wrapper-inner' );

		if ( wecodeSlider.length !== 0 ) {
			wecodeSlider.slick( {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
				prevArrow: '.wecode-slider__arrow-left',
				nextArrow: '.wecode-slider__arrow-right',
				dots: false,
				responsive: [
					{
						breakpoint: 1400,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 1150,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1
						}
					}
				]
			} );
		}

	} );

}( jQuery ) );