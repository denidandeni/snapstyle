document.addEventListener('DOMContentLoaded', () => {
    const serviceGrid = document.querySelector('#gridView main');
    const gridView = document.getElementById('gridView');
    const detailView = document.getElementById('detailView');
    const detailContent = document.getElementById('detailContent');
    const backButton = document.getElementById('backButton');
    
    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (gridView) gridView.classList.remove('hidden');
            if (detailView) detailView.classList.add('hidden');
            window.scrollTo(0, 0);
        });
    }

    // Service data
    const services = [
        {
            id: 'photo-profile',
            title: 'SnapChitect',
            price: 'Rp5.000',
            category: 'Chatgpt Image Generate',
            images: [
                'https://dbgiizmiykolitzonybe.supabase.co/storage/v1/object/public/logo/Isometric%20Place/Instagram%20post%20-%201%20low.png',
                'https://dbgiizmiykolitzonybe.supabase.co/storage/v1/object/public/logo/Isometric%20Place/ChatGPT%20Image%20Jun%204%202025%20(1).png'
            ],
            isNew: true,
            description: 'Ubah landmark ikonik dunia jadi ilustrasi 3D bergaya miniatur.\n\nSnapChitect adalah agent otomatis dari Snapstyle yang bisa menghasilkan gambar landmark terkenal dalam bentuk ilustrasi 3D yang lucu, rapi, dan estetik—cukup dengan mengetik nama atau mengunggah gambar referensi.\n\n🔹 Cocok untuk konten edukasi, travel, media sosial, hingga koleksi pribadi\n🔹 Gaya visual clean dan minimal, seperti diorama mainan premium\n🔹 Proses otomatis, tanpa perlu skill desain'
        },
        {
            id: 'icon-design',
            title: 'Icon Design',
            originalPrice: 'Rp20.000',
            price: 'Rp15.000',
            category: 'Chatgpt Image Generate',
            images: [
                'https://placehold.co/300x300/000000/FFFFFF?text=🎨',
                'https://placehold.co/300x300/333333/FFFFFF?text=Vector',
                'https://placehold.co/300x300/666666/FFFFFF?text=App+Icon'
            ],
            description: 'Desain ikon kustom yang menarik dan fungsional untuk aplikasi, situs web, atau branding Anda. Kami menciptakan ikon yang mudah dikenali dan sesuai dengan identitas merek Anda.'
        }
    ];

    // Function to create a service card element
    function createServiceCard(service, index) {
        const card = document.createElement('div');
        card.className = `
            service-card
            bg-pure-white
            border-4 border-brutal-black rounded-none overflow-hidden
            box-shadow-brutal box-shadow-brutal-hover
            box-shadow-brutal-active
            p-4 flex flex-col cursor-pointer
            animate-staggered-entrance
            relative
        `;
        card.style.animationDelay = `${index * 0.1}s`;

        let priceHtml = `<p class="text-base font-bold text-coral-red mb-2">${service.price}</p>`;
        if (service.originalPrice) {
            priceHtml = `
                <p class="text-sm text-gray-500 line-through mr-2">${service.originalPrice}</p>
                <p class="text-base font-bold text-coral-red mb-2">${service.price}</p>
            `;
        }

        // Function to get random labels for each service
        function getRandomLabels() {
            const allLabels = [
                { text: 'ChatGPT Agent', bg: 'bg-red-500' }
            ];
            return Math.random() > 0.5 ? allLabels : [];
        }
        
        const randomLabels = getRandomLabels();
        
        card.innerHTML = `
            ${service.isNew ? `
                <span class="absolute top-2 right-2 bg-coral-red text-white text-xs font-bold py-1 px-2 rounded-md z-10" style="font-size: 1.5rem; padding: 0.5rem 1rem;">
                    BARU!
                </span>
            ` : ''}
            <div class="carousel-container mb-3">
                ${service.images.map((imgSrc, imgIdx) => `
                    <img src="${imgSrc}" alt="${service.title} image ${imgIdx + 1}" class="carousel-image ${imgIdx === 0 ? 'active' : ''}">
                `).join('')}
                <div class="carousel-dots">
                    ${service.images.map((_, dotIdx) => `
                        <span class="carousel-dot ${dotIdx === 0 ? 'active' : ''}" data-index="${dotIdx}"></span>
                    `).join('')}
                </div>
                <div class="carousel-arrow left" data-direction="-1">
                    <i class="fas fa-chevron-left"></i>
                </div>
                <div class="carousel-arrow right" data-direction="1">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <div class="flex flex-wrap gap-1 mb-1">
                <span class="text-category-tag bg-pure-black text-pure-white uppercase px-2 py-1 rounded-md">
                    ${service.category}
                </span>
                ${randomLabels.map(label => `
                    <span class="text-category-tag ${label.bg} text-pure-white uppercase px-2 py-1 rounded-md">
                        ${label.text}
                    </span>
                `).join('')}
            </div>
            <h3 class="text-base font-bold tracking-tight mb-1 text-pure-black">
                ${service.title}
            </h3>
            <div class="flex items-baseline">
                ${priceHtml}
            </div>
        `;

        // Carousel functionality
        const images = card.querySelectorAll('.carousel-image');
        const dots = card.querySelectorAll('.carousel-dot');
        const leftArrow = card.querySelector('.carousel-arrow.left');
        const rightArrow = card.querySelector('.carousel-arrow.right');
        let currentImageIndex = 0;

        function showImage(indexToShow) {
            images.forEach((img, idx) => {
                img.classList.toggle('active', idx === indexToShow);
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === indexToShow);
            });
        }

        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(currentImageIndex);
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            });
        }

        // Dot navigation
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImageIndex = idx;
                showImage(currentImageIndex);
            });
        });

        // Add click handler for the card
        card.addEventListener('click', () => {
            showServiceDetailPage(service);
        });

        return card;
    }

    // Function to show service detail page
    function showServiceDetailPage(service) {
        if (!detailView || !detailContent) return;
        
        if (gridView) gridView.classList.add('hidden');
        detailView.classList.remove('hidden');
        
        detailContent.innerHTML = `
            <div class="carousel-container mb-6">
                ${service.images.map((img, idx) => `
                    <img src="${img}" alt="${service.title} ${idx + 1}" class="carousel-image ${idx === 0 ? 'active' : ''}">
                `).join('')}
                ${service.images.length > 1 ? `
                    <div class="carousel-arrows">
                        <div class="carousel-arrow left">&lt;</div>
                        <div class="carousel-arrow right">&gt;</div>
                    </div>
                    <div class="carousel-dots">
                        ${service.images.map((_, idx) => `
                            <div class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-2xl font-bold text-pure-black">${service.title}</h2>
                    ${service.isNew ? '<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Baru</span>' : ''}
                </div>
                <div class="flex items-center mb-4">
                    <span class="text-2xl font-bold text-pure-black">${service.price}</span>
                    ${service.originalPrice ? `
                        <span class="ml-2 text-sm text-gray-500 line-through">${service.originalPrice}</span>
                    ` : ''}
                </div>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                        ${service.category}
                    </span>
                </div>
                <div class="prose max-w-none mb-6">
                    <p class="text-gray-700">${service.description || 'Tidak ada deskripsi tersedia.'}</p>
                </div>
                <a href="${service.id === 'photo-profile' ? 'https://denidandeni.myr.id/pl/snapchitect' : '#'}" 
                   class="w-full bg-pure-black text-white py-3 px-4 font-bold hover:bg-gray-800 transition-colors rounded-none text-center block"
                   ${service.id === 'photo-profile' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    Pesan Sekarang
                </a>
        </div>
    `;
    
    // Initialize carousel if there are multiple images
    if (service.images.length > 1) {
        initializeCarousel(detailView);
        }
    }

    // Initialize carousel function
    function initializeCarousel(container) {
        const carousel = container.querySelector('.carousel-container');
        if (!carousel) return;
        
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.left');
        const nextBtn = carousel.querySelector('.carousel-arrow.right');
        
        let currentIndex = 0;
        
        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
            }
            
            images[index].classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentIndex = index;
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showImage(index));
        });
        
        showImage(0);
    }

    // Initialize the service grid
    function initializeServiceGrid() {
        if (!serviceGrid) {
            console.error('Service grid element not found!');
            return;
        }

        // Clear any existing content
        serviceGrid.innerHTML = '';

        services.forEach((service, index) => {
            if (!service.description) {
                service.description = `Deskripsi default untuk layanan ${service.title}.`;
            }
            serviceGrid.appendChild(createServiceCard(service, index));
        });

        // Add click handler for the message button
        const messageButton = document.querySelector('a[href^="https://www.instagram.com/"]');
        if (messageButton) {
            messageButton.addEventListener('click', (e) => {
                e.currentTarget.classList.add('animate-scale-feedback');
                e.currentTarget.addEventListener('animationend', () => {
                    e.currentTarget.classList.remove('animate-scale-feedback');
                }, { once: true });
            });
        }
    }

    // Start the application
    initializeServiceGrid();
});
