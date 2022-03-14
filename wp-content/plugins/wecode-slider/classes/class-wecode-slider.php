<?php
defined( 'ABSPATH' ) || exit;

/**
 * Class Wecode_Slider
 */
class Wecode_Slider {

	/**
	 * Wecode_Slider constructor
	 *
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize plugin hook handlers
	 *
	 */
	public function init() {
		$this->actions();
	}

	/**
	 * Action hooks
	 *
	 */
	protected function actions() {
		// Make sure that Gutenberg is available
		if ( function_exists( 'register_block_type' ) ) {
			add_action( 'init', array( $this, 'register_block' ) );
		}
		add_action( 'enqueue_block_editor_assets', array( $this, 'gutenberg_block_editor_scripts' ) );
		add_action( 'enqueue_block_assets', array( $this, 'gutenberg_block_scripts' ) );
	}

	/**
	 * Enqueue block editor only JavaScript and CSS
	 */
	public function gutenberg_block_editor_scripts() {

		// Make paths variables
		$block_path        = 'assets/js/editor.blocks.js';
		$editor_style_path = 'assets/css/blocks.editor.css';

		// Enqueue the bundled block JS file
		wp_enqueue_script(
			'wecode-slider-block-js',
			WECODE_SLIDER_PLUGIN_URL . $block_path,
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
			filemtime( WECODE_SLIDER_PLUGIN_DIR . $block_path )
		);

		// Enqueue optional editor only styles
		wp_enqueue_style(
			'wecode-slider-block-editor-css',
			WECODE_SLIDER_PLUGIN_URL . $editor_style_path,
			[],
			filemtime( WECODE_SLIDER_PLUGIN_DIR . $editor_style_path )
		);
	}

	/**
	 * Enqueue front end and editor JavaScript and CSS
	 */
	public function gutenberg_block_scripts() {
		// Make paths variables
		$block_path = 'assets/js/frontend.blocks.js';
		$style_path = 'assets/css/blocks.style.css';

		if ( ! is_admin() ) {

			// Enqueue SlickJS library
			wp_enqueue_script(
				'slick-js',
				WECODE_SLIDER_PLUGIN_URL . 'assets/js/slick.min.js',
				[ 'jquery', 'jquery-migrate' ],
				'1.8.0',
				true
			);

			// Enqueue the bundled block JS file
			wp_enqueue_script(
				'wecode-slider-block-frontend',
				WECODE_SLIDER_PLUGIN_URL . $block_path,
				[],
				filemtime( WECODE_SLIDER_PLUGIN_DIR . $block_path )
			);
		}

		// Enqueue SlickJS library
		wp_enqueue_script(
			'slick-js',
			WECODE_SLIDER_PLUGIN_URL . 'assets/js/slick.min.js',
			[ 'jquery', 'jquery-migrate' ],
			'1.8.0',
			true
		);

		// Enqueue frontend and editor block styles
		wp_enqueue_style(
			'wecode-slider-block-frontend-css',
			WECODE_SLIDER_PLUGIN_URL . $style_path,
			[],
			filemtime( WECODE_SLIDER_PLUGIN_DIR . $style_path )
		);
	}

	/**
	 * Hook server side rendering into render callback
	 *
	 */
	public function register_block() {
		register_block_type( 'wecode-slider-block/slider', [
			'style' => 'gutenberg-block-frontend-css'
	    ] );
	}

	
}
