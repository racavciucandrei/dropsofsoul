
# Drops of Soul - WordPress Integration Guide

This document explains how to integrate the Drops of Soul React application into WordPress.

## Method 1: Using a React Block Plugin

1. **Create a WordPress Block Plugin**:
   - Use the [Create Block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) tool
   - Copy the React build files into the plugin

2. **Build the React Application**:
   ```
   npm run build
   ```

3. **Place Build Files in WordPress Plugin**:
   - Copy the `dist` folder contents to your WordPress plugin
   - Register scripts and styles in PHP

## Method 2: Using React as a WordPress Theme

1. **Create a WordPress Theme with React Integration**:
   - Set up a standard WordPress theme
   - Add React loading script to the theme

2. **Enqueue React in WordPress**:
   ```php
   function enqueue_drops_of_soul_scripts() {
     wp_enqueue_script(
       'drops-of-soul-react',
       get_template_directory_uri() . '/js/wordpress-integration.js',
       array(),
       '1.0.0',
       true
     );
   }
   add_action('wp_enqueue_scripts', 'enqueue_drops_of_soul_scripts');
   ```

3. **Create Mount Points in Templates**:
   ```php
   <div class="drops-of-soul-react-app" data-component="hero"></div>
   ```

## Method 3: Using WordPress as a Headless CMS

1. **Use WordPress REST API**:
   - Set up WordPress as a headless CMS
   - Use the REST API to fetch content into your React app
   - Deploy React app separately from WordPress

2. **Authentication**:
   - Set up JWT authentication for the WordPress REST API
   - Connect your React app to the WordPress API

## Dependencies

- For Block Plugin: [WordPress Block Editor API](https://developer.wordpress.org/block-editor/)
- For REST API: [WordPress REST API](https://developer.wordpress.org/rest-api/)
