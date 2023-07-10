class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <header>
    
      <div>

      <!-- Logo  -->

      <a href="/">
        <img height="50px" width="50px" src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304021/Nataly/logo_s9ma3x.png" alt="Nataly-logo" />
        </a>


        <!-- Search  -->
        <div>
          <span>
            <img alt="MagnifyingGlass" width="24px" height="24px" src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304387/Nataly/MagnifyingGlass_iiykgb.svg" />
          </span>
          <input type="search" placeholder="search for items and brands" class="search-input" id="search-input" onkeyup="filterList()" />
        </div>

        
        <!-- Google Icons -->
        <div class="icons-bar">
          <div class="dropdown">
            <img alt="Sign in" class="dropbtn"  src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304620/Nataly/person__eoljfg.svg" />
            <div class="dropdown-content">
              <a href="#">My Account</a>
              <a href="#">My Orders</a>
              <a href="#">My Returns</a>
              <a href="#">Returns information</a>
              <a href="#">Contact Preferences</a>
            </div>
          </div>
      
          <img alt="Favorite"  src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304439/Nataly/favorite__e5qqie.svg" />
         
          <div class="chart-container">
          <img  id="shopping-chart" alt="Shopping cart"  src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304298/Nataly/shopping_cart__xukaeu.svg"  />
          <span id="count-items">0<span>
          </div>
         
          <img alt="Flag" id="front"  src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304508/Nataly/England-flag_cftavd.svg" />
        </div>
        <!-- menu -->
        <button id="menu">
          <img alt="menu" height="45px" height="45px" src="https://res.cloudinary.com/dpcxthabw/image/upload/v1688304547/Nataly/menu__o9k5cf.svg" />
        </button>

      </div>
    </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);