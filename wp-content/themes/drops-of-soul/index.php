
<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php if (is_front_page()): ?>
        <div class="drops-of-soul-react-app" data-component="hero"></div>
        <div class="drops-of-soul-react-app" data-component="featured-products"></div>
        <div class="drops-of-soul-react-app" data-component="about"></div>
    <?php else: ?>
        <?php if (have_posts()): ?>
            <?php while (have_posts()): the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php endif; ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
