
# Drops of Soul - WordPress Theme

![Drops of Soul Logo](screenshot.png)

A premium WordPress theme for artisanal cocktail ingredients and craft beverage companies.

## Features

- **Modern Design System**: Clean, elegant interface with thoughtful typography and color choices
- **Light/Dark Mode**: Dynamic theme switching with smooth transitions
- **Interactive Elements**: Custom light switch, animations, and interactions
- **Product Showcase**: Beautiful product display layouts for your artisanal offerings
- **Responsive Layout**: Perfect viewing on any device
- **React Integration**: Modern frontend built with React, Tailwind, and shadcn components

## Installation

### Standard WordPress Installation

1. Upload the `drops-of-soul` folder to your `/wp-content/themes/` directory
2. Activate the theme through the WordPress admin panel at Appearance > Themes
3. Configure theme settings in the Customizer

### Developer Installation

If you want to modify the theme:

1. Clone this repository into your WordPress themes directory
2. Install dependencies with `npm install`
3. Run development server with `npm run dev`
4. Build production files with `npm run build`

## Theme Structure

```
drops-of-soul/
├── dist/               # Compiled assets
├── js/                 # JavaScript files
│   └── wordpress-integration.js  # React/WP integration
├── src/                # Source files
│   ├── components/     # UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Full page templates
│   └── utils/          # Utility functions
├── index.php           # Main template file
├── functions.php       # Theme functions
├── header.php          # Header template
├── footer.php          # Footer template
├── page.php            # Page template
├── style.css           # Theme stylesheet
└── screenshot.png      # Theme preview image
```

## Customization

### Theme Options

The theme comes with several customization options available in the WordPress Customizer:

- Logo and branding options
- Color scheme adjustments
- Typography settings
- Layout preferences
- Social media links

### Development

This theme uses a modern frontend stack:

- **React** for component-based UI
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **TypeScript** for type safety

To modify the React application:

1. Make changes to the files in the `src/` directory
2. Run `npm run build` to compile your changes
3. The compiled assets will be placed in the `dist/` directory

## Style Guide

See the [STYLE-GUIDE.md](STYLE-GUIDE.md) file for comprehensive details on:

- Color palette 
- Typography
- Component styling
- Animation specifications
- Design variables

## Credits

- **Design & Development**: Drops of Soul Team
- **Libraries**: React, Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display (via Google Fonts)

## License

This theme is licensed under the GPL v2 or later.

```php
/*
Theme Name: Drops of Soul
Theme URI: https://dropsofsoul.com
Description: A beautiful theme for artisanal cocktail ingredients
Version: 1.0
Author: Drops of Soul
Author URI: https://dropsofsoul.com
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: drops-of-soul
*/
```

## Support

For theme support, please contact:

- Email: support@dropsofsoul.com
- Website: https://dropsofsoul.com/support
