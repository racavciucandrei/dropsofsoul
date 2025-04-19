
<?php
if (!defined('ABSPATH')) exit;

function drops_of_soul_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('menus');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'drops-of-soul'),
        'footer' => __('Footer Menu', 'drops-of-soul')
    ));
}
add_action('after_setup_theme', 'drops_of_soul_setup');

function drops_of_soul_enqueue_scripts() {
    // Enqueue styles
    wp_enqueue_style('drops-of-soul-style', get_stylesheet_uri());
    
    // Enqueue React application
    wp_enqueue_script('drops-of-soul-react', 
        get_template_directory_uri() . '/js/wordpress-integration.js',
        array(),
        '1.0.0',
        true
    );
    
    // Pass WordPress data to React
    wp_localize_script('drops-of-soul-react', 'wpData', array(
        'rootUrl' => get_site_url(),
        'apiUrl' => get_rest_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'drops_of_soul_enqueue_scripts');
