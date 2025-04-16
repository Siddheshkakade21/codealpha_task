document.addEventListener('DOMContentLoaded', function() {
    const images = [
        { src: 'Babyganesh8.jpg', alt: 'Ganesha1' },
        { src: 'Babyganesh7.jpg', alt: "Ganesha2" },
        { src: 'Babyganesh1jpeg.jpg', alt: 'Ganesha3' },
        {src: 'Babyganesh2.jpg', alt: 'Ganesha4' },
        { src: 'Babyganesh3.jpg', alt: 'Ganesha5' },
        { src: 'Babyganesh4.jpg', alt: 'Ganesha6' },
        { src: 'Babyganesh5.jpg', alt: 'Ganesha7' },
        { src: 'Babyganesh6.jpg', alt: 'Ganesha8' },
    ];

    const gallery = document.querySelector('.gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentImageIndex = 0;

    // Create gallery items
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'gallery-img';
        img.dataset.index = index;
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });

    // Open lightbox when image is clicked
    gallery.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-img')) {
            currentImageIndex = parseInt(e.target.dataset.index);
            updateLightbox();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navigation between images
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            }
        }
    });

    function updateLightbox() {
        lightboxImg.src = images[currentImageIndex].src;
        caption.textContent = images[currentImageIndex].alt;
    }
});