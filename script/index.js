// 00 Varaibles 
const GermanFlag = 'https://res.cloudinary.com/dpcxthabw/image/upload/v1688308008/Nataly/Germany-flag_oxo1xg.svg'
const EnglandFlag = 'https://res.cloudinary.com/dpcxthabw/image/upload/v1688304508/Nataly/England-flag_cftavd.svg'
const shrink="https://res.cloudinary.com/dpcxthabw/image/upload/v1688899596/shrink_tmwrw0.svg"
const expand="https://res.cloudinary.com/dpcxthabw/image/upload/v1688899330/expand_s8tk7z.svg"

const accordionTitles = document.querySelectorAll(".accordionTitle");
const CHART_CONTAINER = document.querySelector('.co0 > div')
const searchInput = document.querySelector('#search-input');
const mailInput= document.querySelector('.item3 > input');

let show = false
let imageIndex = 1;
let opened = false;
let appeared = false
let lang = true;


// function useEffect(effect, dependencies) {

//     // Track the previous dependencies

//     let previousDependencies = [];
  
//     // Helper function to check if dependencies have changed
//     function dependenciesChanged() {
//       if (dependencies.length !== previousDependencies.length) {
//         return true;
//       }
  
//       return dependencies.some((dependency, index) => {
//         return dependency !== previousDependencies[index];
//       });
//     }
  
//     // Run the effect and update dependencies
//     function runEffect() {
//       if (effect && typeof effect === 'function') {
//         effect();
//       }
//       previousDependencies = dependencies;
//     }
  
//     // Attach the event listener
//     window.addEventListener('DOMContentLoaded', runEffect);
  
//     // Remove the event listener when dependencies change
//     if (dependenciesChanged()) {
//       window.removeEventListener('DOMContentLoaded', runEffect);
//       runEffect();
//     }
//   }

const SectionHTML = document.querySelectorAll('section')

const FooterHTML = document.querySelectorAll('footer')

const Tags = [SectionHTML, FooterHTML]

// reusable functionalities

const byID = id => {
    var GetbyID = document.getElementById(id);
    return id !== undefined ? GetbyID : null
}

const elementExists = x => { return byID(x) ? true : false }


function onAdd(x, y, z) {
    var e = byID(x)
    var value = e.value
    var result = parseFloat(value * y)
    document.querySelector(`#${z}`).innerText = result.toFixed(2)
    amounter()
}


function loopNumber(id) {

    var iD = event?.target.id;

    var LOCAL_T_DATA = JSON.parse(localStorage.getItem("T_Data"))

    var items = LOCAL_T_DATA.filter(a => iD === a.id)

    items.forEach(({ piece }) => {

        const parent = byID(id)

        for (let i = 1; i <= piece; i++) {


            const opt = document.createElement("option");

            opt.innerHTML = i;

            opt.setAttribute("value", `${i}`);

            parent.appendChild(opt);

        }

    })


}


accordionTitles.forEach((accordionTitle) => {

    accordionTitle.addEventListener("click", () => {

        if (accordionTitle.classList.contains("is-open")) {

            accordionTitle.classList.remove("is-open");
        } else {
            const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");

            accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {

                accordionTitleWithIsOpen.classList.remove("is-open");
            });

            accordionTitle.classList.add("is-open");
        }
    });
});

//  Change Language 

function language() {
    const en = document.querySelectorAll('[lg="en"]');
    const de = document.querySelectorAll('[lg="de"]');
    if (lang === false) {
        de.forEach(d => d.style.display = "flex")
        en.forEach(e => e.style.display = "none")
        searchInput.placeholder="Suche nach Artikeln und Marken"
        mailInput.placeholder="E-Mail-Addresse"
        document.querySelector('.amount > span > b:first-child').innerText ="Summe: "
        byID('close_').innerText="jetzt kaufen"
    }   
    else if (lang === true) {

        de.forEach(d => d.style.display = "none")
        en.forEach(e => e.style.display = "flex")
        searchInput.placeholder="search for items and brands"
        mailInput.placeholder="Email address"
        document.querySelector('.amount > span > b:first-child').innerText ="Amount: "
        byID('close_').innerText="Buy now"
    }
}

byID("front")?.addEventListener("click", () => {
  
    lang = !lang
    byID('front').src = lang ? EnglandFlag : GermanFlag;
    language()
})


// Open and Close menu

byID("menu")?.addEventListener("click", function () {
    appeared = !appeared
    document.getElementsByTagName('aside')[0].style.display = `${appeared  ? "flex" : "none"}`

})

byID("close")?.addEventListener("click", function () {
    appeared = false
    document.getElementsByTagName('aside')[0].style.display = 'none'
})

//shopping chart

byID("shopping-chart")?.addEventListener("click", function () {
    opened = !opened
    CHART_CONTAINER.style.display = `${opened  ? "flex" : "none"}`
    if (opened) {
        Tags.forEach(tag => {
            tag.forEach(element => {
                element.style.opacity = "0.1"

            });
        });

    } else {
        Tags.forEach(tag => {
            tag.forEach(element => {
                element.style.opacity = "1"

            });
        });

    }

})

byID("close_")?.addEventListener("click", function () {
    opened = false
    CHART_CONTAINER.style.display = "none"
    Tags.forEach(tag => {
        tag.forEach(element => {
            element.style.opacity = "1"

        });
    });
})

// Product Data

const callData = async () => {

    try {


        const res = await fetch("data/base.json")
        const data = await res.json();
        const { Tshirts } = data.WomenClothing
        localStorage.setItem("T_Data", JSON.stringify(Tshirts));
        var LOCAL_T_DATA = JSON.parse(localStorage.getItem("T_Data"))
        console.log(Tshirts);
        const appData = byID('list-products');
        for (const ele of LOCAL_T_DATA) {
               const {id, image,name,named} = ele
            appData.insertAdjacentHTML(
                'beforeend',

                `

<!--  -->
<div>
    <a>
        <img id=${id} onclick="exploreProduct()"   width="261.25px" height="337.66px" src=${image} loading="lazy" />
    </a>
    <div class="card-action">
        <button>
            <span class="material-symbols-outlined">
                visibility
            </span>
        </button>
        <button>
            <span id=${id} onclick="addProduct()" class="material-symbols-outlined">
                shopping_cart
            </span>
            <span lg="en">Add to Chart</span>
            <span class="warenkorb"  lg="de">in Warenkorb hinzufügen</span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                favorite
            </span>
        </button>
    </div>
    <p lg="en" >${name}</p>
    <p lg="de" >${named}</p>
</div>

`

            );
        }
        localStorage.removeItem("module_id");
    } catch (error) {
        console.error(error);
    }

}

callData()

// useEffect(callData,[show,imageIndex,opened,lang])

const TogglIt = ()=> { 
    
   show = !show  

   imgToggle = document.querySelector('.expand-container > h3 > span > img');
   imgChild =  document.querySelectorAll('.f-inline > img');
   document.querySelector('.expand').style.display=`${show ? 'block' :'none' }`

   document.querySelector('.f-inline').style.cssText=`
   position:${ show ? 'absolute' :'unset'};
   transform:translateY(${show === true ? "136px" : "0" });`

   imgToggle.src=`${show === true ? expand : shrink }`
   imgToggle.alt=`${show === true ? "Expand" : "Shrink" }`
   imgChild.forEach(img =>img.style.cssText=`
    border-radius:${show === true ? "8px" : "unset"};
    box-shadow:${show === true ? "  0 10px 10px #00000017" : "unset"}; 
    `)


}

const exploreProduct = async () => {

    var eventID = event.target.id

    byID('id01').style.display = 'flex'

    var LOCAL_T_DATA = JSON.parse(localStorage.getItem("T_Data"))

    const productData = byID("explored");

    var items = LOCAL_T_DATA.filter(t => eventID === t.id)

    productData.innerHTML = items.map((item) => {

        const { id,name,named ,price, description,descriptiond ,colors } = item

        return (`
        <div id="c${id}">
        <div class="f1" >
            <div>
            ${colors.map(color => ` <img class="myImages" loading="lazy"  src=${color} />`).join('')}
            </div>
          <div class="f-inline">
                ${colors.map(color => `<img onclick=currentImage(${imageIndex++}) loading="lazy" src=${color} />`).join('')}
          </div>
         </div>
            <div class="expand-container">
            <h3 onclick="TogglIt()">
                <span lg="en" >Product details</span>
                <span lg="de" >Produktdetails</span>
                
               <span>
              <img src=${shrink} alt="Shrink" />
            
              </span>
            </h3>
            <article class="expand">
              <p> 
              <span lg="en" >${name}</span> 
              <span lg="de" >${named}</span> 
              <span>${price}<b>€</b></span> 
              </p>
              
              <p lg="en">${description}</p>
              <p lg="de">${descriptiond}</p>
            </article>
          </div>
           </div>
        
            `)
    }).join('');

    currentImage(1)
    language()
};

document.getElementsByClassName('close_box')[0].addEventListener('click',function() {
    byID('id01').style.display='none'
    byID("explored").innerHTML = '';
})

const addProduct = () => {

    var iD = event?.target.id;

    var child_ID = elementExists(`c${iD}`)

    const productData = byID("child_product");

    var LOCAL_T_DATA = JSON.parse(localStorage.getItem("T_Data"))

    var items = LOCAL_T_DATA.filter(a => iD === a.id)

    for (const item of items) {

        const { id, price, image, name, named} = item

        if (child_ID === false) {

            productData.insertAdjacentHTML('beforeend', `

                <div id="c${id}">

                  <img src=${image} />

                  <div>
                      <p lg="en">${name}</p>
                      <p lg="de">${named}</p>
                      <div class="count-container">
                      <p >
                         <span id="s-${id}" >${price}</span>
                         <b>€</b>
                      </p>
                          <select id="opt-${id}") onchange="onAdd('opt-${id}', ${price},'s-${id}')">
                           
                        
                          </select>
                        
                          <span onclick=removeProduct("c${item.id}") class="material-symbols-outlined">delete</span>
                      </div>
                 
                  </div>
                  </div>
              
                  ` );
            loopNumber(`opt-${iD}`)


        } else {
            return null
        }

    }

    byID("count-items").innerText = productData.children.length
    byID("count-items").style.visibility = "visible"

    amounter()
    language()
};
const removeProduct = id => {
    const productData = byID("child_product");
    var elem = byID(id);
    elem.parentElement.removeChild(elem);
    byID("count-items").innerText = productData.children.length
    if (productData.children.length === 0) {
        opened = false;
        byID("count-items").style.visibility = "hidden"
        document.querySelector('.amount > span > strong').innerText = 0
      CHART_CONTAINER.style.display = "none"

        Tags.forEach(tag => {
            tag.forEach(element => {
                element.style.opacity = "1"

            });
        });
    }
    amounter()
}
const amounter = () => {

    let finial = []

    const p = document.querySelectorAll(`#child_product > div > div > div > p`)

    p.forEach(p => finial.push(parseFloat([...p.innerText].slice(0, -1).join(''))));

    var sum = finial.length !== 0 ? finial?.reduce((a, b) => { return a + b }) : 0

    document.querySelector('.amount > span > strong').innerText = sum.toFixed(2)


}
function currentImage(n) { showImages(imageIndex = n); }

function showImages() {

    let images = document.getElementsByClassName("myImages");

    for (let i = 0; i < images.length; i++) {
        images[i].style.display = i === imageIndex - 1 ? "block" : "none";

    }
}

function filterList() {
    var input = byID("search-input");
    var menu = document.getElementsByTagName('aside')[0];
    var body = document.body.offsetWidth;
    console.log(body);
    var filter = input.value.toUpperCase();

    var div = byID("list-products");

    var p = div.getElementsByTagName("p");

    for (let i = 0; i < p.length; i++) {
        a = p[i];

        var txtValue = a.textContent || a.innerText;
        //-1[0,1,2]
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(txtValue.toUpperCase().indexOf(filter))
            p[i].parentElement.style.display = "flex";

        } else {
            p[i].parentElement.style.display = "none";
        }
    }

    window.scroll(0, 625);
    if (filter === "") {
        window.scroll(0, 0);

    }
    if (menu.style.display = 'flex' && body < 700) {
        menu.style.display = 'none'
        // byID('list-products').style.cssText="justify-content: center ! important";
        window.scroll(0, 425);
    }
    else if (body < 700 && (filter === null || "" || 0)) {
        //    return  byID('list-products').style.cssText=" justify-content: flex-start ! important";
    }

}

