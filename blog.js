// Blog JavaScript - Growtez
// Handles fetching and displaying blog posts from Firebase

import { db, blogPostsCollection, getDocs, doc, getDoc, query, where, orderBy, limit } from './firebase-config.js';

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const blogLoading = document.getElementById('blogLoading');
const blogEmpty = document.getElementById('blogEmpty');
const blogError = document.getElementById('blogError');

// Blog Post Detail Elements
const postContent = document.getElementById('postContent');
const postLoading = document.getElementById('postLoading');
const postError = document.getElementById('postError');

// Utility: Format date
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility: Create blog card HTML
function createBlogCard(post) {
    const { id, title, slug, excerpt, coverImage, category, publishedAt, readingTime } = post;

    return `
        <article class="blog-card animate-in">
            <div class="blog-card-image">
                <img src="${coverImage || 'assets/1.jpg'}" alt="${title}" loading="lazy">
                ${category ? `<span class="blog-card-category">${category}</span>` : ''}
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span><i class="far fa-calendar-alt"></i> ${formatDate(publishedAt)}</span>
                    ${readingTime ? `<span><i class="far fa-clock"></i> ${readingTime}</span>` : ''}
                </div>
                <h3>${title}</h3>
                <p class="blog-card-excerpt">${excerpt || ''}</p>
                <a href="blog-post.html?id=${id}" class="blog-card-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

// Fetch all published blog posts
async function fetchBlogPosts() {
    console.log('🚀 fetchBlogPosts() started');
    console.log('📦 blogPostsCollection:', blogPostsCollection);

    try {
        // Show loading state
        if (blogLoading) blogLoading.style.display = 'block';
        if (blogGrid) blogGrid.innerHTML = '';
        if (blogEmpty) blogEmpty.style.display = 'none';
        if (blogError) blogError.style.display = 'none';

        console.log('🔍 Creating query...');
        // Query published posts, ordered by date
        const q = query(
            blogPostsCollection,
            where('isPublished', '==', true),
            orderBy('publishedAt', 'desc')
        );
        console.log('✅ Query created:', q);

        console.log('📡 Fetching from Firestore...');
        const querySnapshot = await getDocs(q);
        console.log('✅ Query completed! Found:', querySnapshot.size, 'posts');

        // Hide loading
        if (blogLoading) blogLoading.style.display = 'none';

        if (querySnapshot.empty) {
            console.log('⚠️ No posts found - showing empty state');
            // Show empty state
            if (blogEmpty) blogEmpty.style.display = 'block';
            return;
        }

        // Render blog cards
        const posts = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('📝 Post found:', doc.id, data.title, 'isPublished:', data.isPublished);
            posts.push({ id: doc.id, ...data });
        });

        console.log('📋 Total posts to render:', posts.length);

        if (blogGrid) {
            blogGrid.innerHTML = posts.map(createBlogCard).join('');
            blogGrid.style.display = 'grid';
            blogGrid.style.opacity = '1';
            blogGrid.style.visibility = 'visible';
            console.log('✅ Blog cards rendered!');
            console.log('📐 blogGrid innerHTML length:', blogGrid.innerHTML.length);
            console.log('🎨 blogGrid display:', getComputedStyle(blogGrid).display);
            // Add featured class if there are multiple posts
            if (posts.length > 2) {
                blogGrid.classList.add('has-featured');
            }
        }

    } catch (error) {
        console.error('❌ Error fetching blog posts:', error);
        console.error('Error details:', error.message, error.code);
        if (blogLoading) blogLoading.style.display = 'none';
        if (blogError) {
            blogError.style.display = 'block';
            blogError.querySelector('p').textContent = 'Error: ' + error.message;
        }
    }
}

// Fetch single blog post by ID
async function fetchBlogPost(postId) {
    try {
        // Show loading
        if (postLoading) postLoading.style.display = 'block';
        if (postContent) postContent.style.display = 'none';
        if (postError) postError.style.display = 'none';

        const docRef = doc(db, 'blog_posts', postId);
        const docSnap = await getDoc(docRef);

        if (postLoading) postLoading.style.display = 'none';

        if (!docSnap.exists()) {
            if (postError) {
                postError.style.display = 'block';
                postError.querySelector('h3').textContent = 'Post Not Found';
                postError.querySelector('p').textContent = 'The blog post you\'re looking for doesn\'t exist.';
            }
            return null;
        }

        const post = { id: docSnap.id, ...docSnap.data() };

        if (postContent) {
            postContent.style.display = 'block';
            renderBlogPost(post);
        }

        return post;

    } catch (error) {
        console.error('Error fetching blog post:', error);
        if (postLoading) postLoading.style.display = 'none';
        if (postError) {
            postError.style.display = 'block';
            postError.querySelector('p').textContent = 'Please check your Firebase configuration.';
        }
        return null;
    }
}

// Render single blog post
function renderBlogPost(post) {
    const { title, content, coverImage, category, author, publishedAt, readingTime, tags } = post;

    // Update page title
    document.title = `${title} | growtez Blog`;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && post.excerpt) {
        metaDesc.setAttribute('content', post.excerpt);
    }

    // Update header elements
    const categoryEl = document.getElementById('postCategory');
    const titleEl = document.getElementById('postTitle');
    const authorImg = document.getElementById('authorAvatar');
    const authorName = document.getElementById('authorName');
    const dateEl = document.getElementById('postDate');
    const readTimeEl = document.getElementById('postReadTime');
    const coverEl = document.getElementById('postCover');
    const bodyEl = document.getElementById('postBody');
    const tagsEl = document.getElementById('postTags');

    if (categoryEl) categoryEl.textContent = category || 'General';
    if (titleEl) titleEl.textContent = title;
    if (authorImg && author?.avatar) authorImg.src = author.avatar;
    if (authorName) authorName.textContent = author?.name || 'Team Growtez';
    if (dateEl) dateEl.textContent = formatDate(publishedAt);
    if (readTimeEl) readTimeEl.textContent = readingTime || '5 min read';
    if (coverEl && coverImage) coverEl.src = coverImage;
    if (bodyEl) bodyEl.innerHTML = content || '';

    // Render tags
    if (tagsEl && tags && tags.length > 0) {
        tagsEl.innerHTML = tags.map(tag =>
            `<span class="blog-post-tag">#${tag}</span>`
        ).join('');
    }

    // Update share links
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    const twitterShare = document.getElementById('shareTwitter');
    const linkedinShare = document.getElementById('shareLinkedin');
    const facebookShare = document.getElementById('shareFacebook');

    if (twitterShare) twitterShare.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (linkedinShare) linkedinShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (facebookShare) facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
}

// Get post ID from URL
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 Blog JS loaded!');
    console.log('📄 blogGrid element:', blogGrid);
    console.log('📄 postContent element:', postContent);

    // Check if we're on the blog listing page
    if (blogGrid) {
        console.log('📰 Blog listing page detected - fetching posts...');
        fetchBlogPosts();
    }

    // Check if we're on a blog post page
    const postId = getPostIdFromUrl();
    console.log('🔗 Post ID from URL:', postId);
    if (postId && postContent) {
        console.log('📖 Blog post page detected - fetching single post...');
        fetchBlogPost(postId);
    }
});

// Fetch latest posts for homepage (if needed)
async function fetchLatestPosts(count = 3) {
    try {
        const q = query(
            blogPostsCollection,
            where('isPublished', '==', true),
            orderBy('publishedAt', 'desc'),
            limit(count)
        );

        const querySnapshot = await getDocs(q);
        const posts = [];

        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        return posts;
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        return [];
    }
}

// Export for use in other scripts
export { fetchBlogPosts, fetchBlogPost, fetchLatestPosts, formatDate, createBlogCard };
