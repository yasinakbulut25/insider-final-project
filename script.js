(() => {
  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  };

  if (typeof window.jQuery === "undefined") {
    loadScript("https://code.jquery.com/jquery-3.7.1.min.js", main);
  } else {
    main();
  }

  function main() {
    const API_URL =
      "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
    const PRODUCTS_LOCALSTORAGE_KEY = "suggested__products";
    const FAVORITES_LOCALSTORAGE_KEY = "favorites__products";
    const OVERFLOW_STEP = 230;
    let currentPosition = 0;
    let carouselWrapper;

    const emptyHeartIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none">
        <path fill="#fff" fill-rule="evenodd" stroke="#B6B7B9"
          d="M19.97 6.449c-.277-3.041-2.429-5.247-5.123-5.247-1.794 0-3.437.965-4.362 2.513C9.57 2.147 7.993 1.2 6.228 1.2c-2.694 0-4.846 2.206-5.122 5.247-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z"
          clip-rule="evenodd"></path>
      </svg>`;

    const filledHeartIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none">
        <path fill="#193DB0" fill-rule="evenodd"
          d="M18.97 5.449C18.693 2.408 16.54.202 13.847.202c-1.794 0-3.437.965-4.362 2.513C8.57 1.147 6.993.2 5.228.2 2.534.201.382 2.407.106 5.448c-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z"
          clip-rule="evenodd"></path>
      </svg>`;

    const carouselArrowIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px"
        d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
      </svg>`;

    const init = () => {
      loadProducts();
    };

    const loadProducts = async () => {
      let products = [];
      const stored = localStorage.getItem(PRODUCTS_LOCALSTORAGE_KEY);
      if (stored) {
        products = JSON.parse(stored);
      } else {
        try {
          const res = await fetch(API_URL);
          products = await res.json();
          localStorage.setItem(
            PRODUCTS_LOCALSTORAGE_KEY,
            JSON.stringify(products)
          );
        } catch (err) {
          console.error("Veri alınamadı", err);
          return;
        }
      }

      buildHTML(products);
      buildCSS();
      setEvents();
    };

    const buildHTML = (products) => {
      const favorites =
        JSON.parse(localStorage.getItem(FAVORITES_LOCALSTORAGE_KEY)) || [];

      const itemsHTML = products
        .map((product) => {
          const isFaved = favorites.includes(product.id);
          return `
            <div class="carousel__item">
              <a href="${product.url}" target="_blank" class="product__link">
                <img
                  class="product__image"
                  src="${product.img}"
                  alt="${product.name}"
                />
              </a>
              <div class="product__info">
                <a href="${product.url}" target="_blank" class="product__link">
                  <p class="product__name">${product.name}</p>
                </a>
                <div class="product__price">
                  ${product.price.toFixed(2).replace(".", ",")} TL
                </div>
                <button class="add__cart__btn">Sepete Ekle</button>
              </div>
              <div class="heart__icon" data-id="${product.id}">
                ${isFaved ? filledHeartIcon : emptyHeartIcon}
              </div>
            </div>
          `;
        })
        .join("");

      const wrapper = `
        <div class="suggestion__carousel">
          <div class="suggestion__container">
            <h2 class="carousel__title">Bunları da Beğenebilirsiniz</h2>
            <div class="carousel__container">
              <div class="carousel__horizontal">
                <div class="carousel__wrapper">${itemsHTML}</div>
              </div>
              <button class="carousel__nav prev">${carouselArrowIcon}</button>
              <button class="carousel__nav next">${carouselArrowIcon}</button>
            </div>
          </div>
        </div>
      `;

      $(".product-detail").after(wrapper);
      carouselWrapper = document.querySelector(".carousel__wrapper");
    };

    const buildCSS = () => {
      const css = `
        .suggestion__carousel {
          background: #f4f5f7;
          display: flex;
          justify-content: center;
          padding-bottom: 32px;
        }
        .suggestion__container {
          width: 80%;
          display: block;
          margin: 0 auto;
        }
        .carousel__title {
          font-size: 32px;
          color: #29323b;
          line-height: 43px;
          font-weight: lighter;
          padding: 15px 0;
          margin: 0 !important;
        }
        .carousel__container {
          position: relative;
        }
        .carousel__horizontal {
          overflow: hidden;
        }
        .carousel__wrapper {
          display: flex;
          gap: 10px;
          transition: transform 0.4s ease-in-out;
        }
        .carousel__item {
          position: relative;
          background: #fff;
          width: 220px;
          flex: 0 0 auto;
        }
        .product__link {
          text-decoration: none;
          display: block;
        }
        .product__link:hover {
          text-decoration: none;
        }
        .product__image {
          width: 100%;
          height: 100%;
        }
        .product__info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 5px 10px 0; 
        }
        .product__name {
          font-size: 14px;
          color: #302e2b;
          min-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: initial;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .product__link:hover .product__name {
          color: #302e2b;
        }
        .product__price {
          display: flex;
          align-items: flex-end;
          color: #193db0;
          font-size: 18px;
          height: 50px;
          line-height: 22px;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .add__cart__btn {
          width: 100%;
          min-height: 36px;
          font-size: 14px;
          font-weight: bold;
          display: none;
          align-items: center;
          justify-content: center;
          background-color: #1f49b6;
          color: #fff;
          border-radius: 3px;
          border: none;
          padding: 8px 28.1px 9px 28.5px;
          margin-top: 4px;
          text-transform: uppercase;
          cursor: pointer;
        }
        .heart__icon {
          position: absolute;
          top: 18px;
          right: 14px;
          width: 21px;
          height: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .heart__icon svg {
          display: block;
        }
        .carousel__nav {
          position: absolute;
          width: 24px;
          height: 24px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background-color: transparent;
          outline: none;
          cursor: pointer;
          user-select: none;
        }
        .carousel__nav.prev {
          left: -35px;
        }
        .carousel__nav.next {
          right: -35px;
          transform: rotate(180deg);
        }

        @media (max-width: 992px) {
          .suggestion__container {
            width: 100%;
            padding: 0 15px;
          }
          .carousel__nav {
            display: none;
          }
          .carousel__horizontal {
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .carousel__horizontal::-webkit-scrollbar {
            display: none;
          }
          .carousel__wrapper {
            transform: none;
            gap: 30px;
          }
          .carousel__title {
            font-size: 24px;
            line-height: 33px;
          }
          .carousel__item {
            scroll-snap-align: start;
            width: 280px;
          }
          .heart__icon {
            top: 20px;
            right: 26px;
          }
          .add__cart__btn {
            display: flex;
          }
        }
        @media (max-width: 768px) {
          .carousel__wrapper {
            gap: 27.5px;
          }
        }
      `;
      $("<style>").html(css).appendTo("head");
    };

    const setEvents = () => {
      $(document).on("click", ".heart__icon", function () {
        const id = $(this).data("id");
        let favs =
          JSON.parse(localStorage.getItem(FAVORITES_LOCALSTORAGE_KEY)) || [];
        const isFaved = favs.includes(id);

        if (isFaved) {
          favs = favs.filter((f) => f !== id);
          $(this).html(emptyHeartIcon);
        } else {
          favs.push(id);
          $(this).html(filledHeartIcon);
        }

        localStorage.setItem(FAVORITES_LOCALSTORAGE_KEY, JSON.stringify(favs));
      });

      $(document).on("click", ".carousel__nav.next", () => {
        const wrapperWidth = carouselWrapper.clientWidth;
        const scrollWidth = carouselWrapper.scrollWidth;
        const remainingScroll = scrollWidth + currentPosition - wrapperWidth;

        const moveX =
          remainingScroll <= OVERFLOW_STEP ? remainingScroll : OVERFLOW_STEP;

        if (moveX > 0) {
          currentPosition -= moveX;
          carouselWrapper.style.transform = `translateX(${currentPosition}px)`;
        }
      });

      $(document).on("click", ".carousel__nav.prev", () => {
        const moveX = Math.min(OVERFLOW_STEP, Math.abs(currentPosition));
        if (moveX > 0) {
          currentPosition += moveX;
          carouselWrapper.style.transform = `translateX(${currentPosition}px)`;
        }
      });
    };

    init();
  }
})();
