<?php
/**
 * Plugin Name: QM Content Area Block
 * Description: Adds the Content Area block to the Gutenberg editor.
 * Version: 1.0.0
 * Author: Noah Grubb
 *
 * @package qm-blocks
 */


/**
 * Load all translations for our plugin from the MO file.
 */
function qm_blocks_content_area_textdomain() {
	load_plugin_textdomain( 'qm-blocks', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'qm_blocks_content_area_textdomain' );


/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function qm_blocks_content_area_register_block() {

    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
    }
    
    // Register our block script with WordPress
    wp_register_script(
        'qm-content-area',
        plugins_url( 'build/block.js', __FILE__ ),
        array('wp-blocks', 'wp-element'),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/block.js' )
    );
  
    // Register our block's base CSS  
    wp_register_style(
        'qm-content-area-style',
        plugins_url( 'build/style.css', __FILE__ ),
        array( ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )
    );

    // Register our block's editor-specific CSS
    wp_register_style(
        'qm-content-area-edit-style',
        plugins_url( 'build/editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )
    );  

    // Enqueue the script in the editor
    register_block_type('qm-blocks/content-area', array(
        'style'         => 'qm-content-area-style',
        'editor_style'  => 'qm-content-area-edit-style',
        'editor_script' => 'qm-content-area',
    ));

    if ( function_exists( 'wp_set_script_translations' ) ) {
        /**
         * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
         * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
         * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
         */
        wp_set_script_translations( 'qm-blocks-content-area', 'qm-blocks' );
    }

}  
add_action('init', 'qm_blocks_content_area_register_block');