
<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php while (have_posts()): the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php if (is_page('shop')): ?>
                <div class="drops-of-soul-react-app" data-component="shop"></div>
            <?php elseif (is_page('about')): ?>
                <div class="drops-of-soul-react-app" data-component="about"></div>
            <?php else: ?>
                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                </header>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            <?php endif; ?>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
