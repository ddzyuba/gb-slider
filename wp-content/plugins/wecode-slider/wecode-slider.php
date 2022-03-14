<?php
/**
 * Plugin Name: Wecode Slider
 * Description: Creates a new custom Gutenberg block with a slider.
 * Text Domain: wecode-slider
 * Author: Dmitriy Dzyuba
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly!
}

// Define Plugin Constants.
define( 'WECODE_SLIDER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WECODE_SLIDER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Include required plugin core files
require_once WECODE_SLIDER_PLUGIN_DIR . 'classes/class-wecode-slider.php';

/**
 * Run all set of Wecode_Slider class.
 *
 * @since    1.0.0
 */
new Wecode_Slider();
