export function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    if (!products || products.length === 0) {
        const p = document.createElement('p');
        p.style.textAlign = 'center';
        p.style.padding = '40px';
        p.textContent = 'No products found';
        productsGrid.appendChild(p);
        return;
    }
    
    products.forEach((product, indx) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-productId', product._id);
        
        const type = window.location.pathname.split('/').filter(Boolean).pop();
        const link = document.createElement('a');
        link.dataset.product = indx;
        link.href = `/device/product?type=${type}&detail=${product._id}`;
        link.className = 'card-link-overlay';
        card.appendChild(link);
        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'product-image-container';
        
        const likeDevice = document.createElement('div');
        likeDevice.className = 'likeDevice';
        
        const badges = document.createElement('div');
        badges.className = 'badges';
        
        if (product.isNew) {
            const badge = document.createElement('div');
            badge.className = 'badge badge-new';
            badge.textContent = 'New';
            badges.appendChild(badge);
        } else {
            const empty = document.createElement('div');
            empty.style.width = '1px';
            badges.appendChild(empty);
        }
        
        const ratingBadge = document.createElement('div');
        ratingBadge.className = 'badge badge-rating';
        ratingBadge.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ${product.rating}`;
        badges.appendChild(ratingBadge);
        
        likeDevice.appendChild(badges);
        
        const favBtn = document.createElement('button');
        favBtn.className = `btn-favorite ${product.favorit ? 'active' : ''}`;
        favBtn.setAttribute('aria-label', 'Add to favorites');
        favBtn.setAttribute('data-id', product._id);
        favBtn.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        likeDevice.appendChild(favBtn);
        
        imgContainer.appendChild(likeDevice);
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'product-image';
        imgContainer.appendChild(img);
        
        card.appendChild(imgContainer);
        
        const brand = document.createElement('div');
        brand.className = 'product-brand';
        brand.textContent = product.brand;
        card.appendChild(brand);
        
        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;
        card.appendChild(title);
        
        const paramsDiv = document.createElement('div');
        paramsDiv.className = 'product-params';
        
        if (product.params && product.params.length > 0) {
            product.params.slice(0, 3).forEach(param => {
                const row = document.createElement('div');
                row.className = 'param-row';
                
                const paramTitle = document.createElement('span');
                paramTitle.className = 'param-title';
                paramTitle.textContent = param.title;
                row.appendChild(paramTitle);
                
                const paramDesc = document.createElement('span');
                paramDesc.className = 'param-desc';
                paramDesc.textContent = param.desc;
                row.appendChild(paramDesc);
                
                paramsDiv.appendChild(row);
            });
        }
        
        card.appendChild(paramsDiv);
        
        const footer = document.createElement('div');
        footer.className = 'product-footer';
        
        const priceRow = document.createElement('div');
        priceRow.className = 'price-row';
        
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `$${Math.ceil(product.price / 362).toLocaleString('en-US')}`;
        priceRow.appendChild(price);
        
        const stock = document.createElement('div');
        if (product.inStock > 5) {
            stock.className = 'stock-status stock-high';
            stock.textContent = `${product.inStock} in stock`;
        } else if (product.inStock > 0) {
            stock.className = 'stock-status stock-low';
            stock.textContent = `${product.inStock} left`;
        } else {
            stock.className = 'stock-status stock-low';
            stock.style.color = '#ef4444';
            stock.style.background = '#fef2f2';
            stock.textContent = 'Out of stock';
        }
        priceRow.appendChild(stock);
        
        footer.appendChild(priceRow);
        
        const cartBtn = document.createElement('button');
        cartBtn.className = 'btn-primary btn-cart';
        cartBtn.setAttribute('data-cart', `${indx + 'cart'}`);
        cartBtn.textContent = 'Add to Cart';
        footer.appendChild(cartBtn);
        
        card.appendChild(footer);
        
        productsGrid.appendChild(card);
    });
}