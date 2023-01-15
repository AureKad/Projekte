const bookmarked_books = document.getElementsByClassName('hero__bmlist')[0];
const favorite_books = document.getElementsByClassName('hero__favlist')[0];
const books = document.getElementsByClassName('hero__list')[2];
let site = window.location.url

const title_bm = document.getElementsByClassName('title__bm')[0];
const title_fav = document.getElementsByClassName('title__fav')[0];

function addBook(book, url, desc, site, bm, fav) {
    let container = document.createElement('div');
    let container_update = document.createElement('div')
    let container_text = document.createElement('div')

    container.className = 'hero__list__container';
    container_update.className = 'hero__list__elem__updatecontainer';
    container_text.className = 'hero__list__elem__textcontainer';

    container_bm = addBook_bookmark(book, url, desc, site, bm, fav)
    container_star = addBook_favstar(book, url, desc, site, bm, fav)
    remove = addBook_remove(book, url, desc, site, bm, fav)
    let {input_button, input_url, label} = addBook_update(book, url, desc, site, bm, fav)
    entry = addBook_entry(book, url, input_url)
    textarea_desc = addBook_desc(book, url, desc, site, bm, fav)


    container_update.appendChild(label);                                       
    container_update.appendChild(input_url);
    container_update.appendChild(input_button);
    container_text.appendChild(container_bm)
    container_text.appendChild(container_star)
    container_text.appendChild(remove)
    container_text.appendChild(entry)
    container_text.appendChild(textarea_desc)
    container.appendChild(container_text)
    container.appendChild(container_update)

    bm ? bookmarked_books.appendChild(container) : (fav ? favorite_books.appendChild(container) : books.appendChild(container));
}

function addBook_bookmark(book, url, desc, site, bm, fav) {
    let container_bm = document.createElement('div');
    let outline_bm = document.createElement('span');
    let fill_bm = document.createElement('span');

    container_bm.className = 'icon-wrap'
    outline_bm.className = 'bookmark bi bi-bookmark-star'
    fill_bm.className = 'bookmark bi bi-bookmark-star-fill fill'
    container_bm.title = "Bookmark this!"

    fill_bm.style.opacity = bm ? 1 : 0;
    container_bm.addEventListener('click', function(e) {
        let data = JSON.parse(localStorage.getItem('books'));
        index = getIndexOfBook(data, book, url, desc, site, bm, fav);
        datapoint = data[index]
        datapoint[4] = !datapoint[4]
        data.splice(index, 1, datapoint);
        localStorage.setItem('books', JSON.stringify(data));
        fill_bm.style.opacity = datapoint[4] ? 1 : 0;
        
        delete_list()
        create_list()
    })
    container_bm.appendChild(outline_bm)
    container_bm.appendChild(fill_bm)
    return container_bm
}

function addBook_favstar(book, url, desc, site, bm, fav) {
    let container_star = document.createElement('div');
    let outline_star = document.createElement('span');
    let fill_star = document.createElement('span');

    container_star.className = 'icon-wrap'
    outline_star.className = 'fav-star bi bi-star'
    fill_star.className = 'fav-star bi bi-star-fill fill'
    container_star.title = "Mark as Favorite!"

    fill_star.style.opacity = fav ? 1 : 0;
    container_star.addEventListener('click', function(e) {
        let data = JSON.parse(localStorage.getItem('books'));
        index = getIndexOfBook(data, book, url, desc, site, bm, fav);
        datapoint = data[index]
        datapoint[5] = !datapoint[5]
        data.splice(index, 1, datapoint);
        localStorage.setItem('books', JSON.stringify(data));
        fill_star.style.opacity = datapoint[5] ? 1 : 0;
        
        delete_list()
        create_list()
    })
    container_star.appendChild(outline_star)
    container_star.appendChild(fill_star)
    return container_star
}

function addBook_remove(book, url, desc, site, bm, fav) {
    let remove = document.createElement('button');
    remove.className = 'hero__list__elem__remove';

    remove.innerText = 'X'
    remove.addEventListener('click', function(e) {
      // Delete from localstorage
      var result = confirm("Are you sure you want to delete the book?");
      if (result) {
        let data = JSON.parse(localStorage.getItem('books'));
        let index = getIndexOfBook(data, book, url, desc, site, bm, fav);
        data.splice(index, 1);
    
        localStorage.setItem('books', JSON.stringify(data));
        // Delete HTML
        this.parentElement.parentElement.remove();
       }
    });
    return remove
}

function addBook_update(book, url, desc, site, bm, fav) {
    let label = document.createElement('label');
    let input_url = document.createElement('input');
    let input_button = document.createElement('button');

    input_button.addEventListener('click', function(e) {
        let new_url = input_url.value
        if (new_url != "" || (new_url == "" && url != "")) {
            let data = JSON.parse(localStorage.getItem('books'));
            index = getIndexOfBook(data, book, url, desc, site, bm, fav);
            data.splice(index, 1, [book, new_url, desc, site, bm, fav]);
            localStorage.setItem('books', JSON.stringify(data));
            entry.onclick = function () {openInNewTab(new_url);};
            url = new_url
            alert("Url updated!");
        }
    });
    
    label.appendChild(document.createTextNode('Update url:'));
    label.className = 'hero__list__elem__label';
    input_button.textContent = 'Update';
    input_button.className = 'hero__list__elem__update';
    input_url.className = 'hero__list__elem__text';
    return {input_button, input_url, label}
}

function addBook_entry(book, url, input_url) {
    let entry = document.createElement('li');
    entry.className = 'hero__list__elem';
    entry.appendChild(document.createTextNode(book));
    if (url != "") {
        entry.onclick = function () {openInNewTab(url);};
        input_url.value = url
    }
    return entry
}

function addBook_desc(book, url, desc, site, bm, fav) {
    let textarea_desc = document.createElement('div');
    textarea_desc.className = 'hero__list__elem__desc'

    textarea_desc.addEventListener('input', function(e) {
        let data = JSON.parse(localStorage.getItem('books'));
        index = getIndexOfBook(data, book, url, desc, site, bm, fav);
        data.splice(index, 1, [book, url, textarea_desc.innerHTML, site, bm, fav]);
        localStorage.setItem('books', JSON.stringify(data));
    })
    textarea_desc.addEventListener('focusout', function(e) {
        if (textarea_desc.innerHTML=="") {
            textarea_desc.innerHTML = 'Write something here!'
        }
    })
    textarea_desc.contentEditable = true

    if (desc == "") {
        textarea_desc.innerHTML = 'Write something here!'
    } else {
        textarea_desc.innerHTML = desc
    }
    return textarea_desc
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

function getIndexOfBook(data, book, url) {
    for (let i=0; i < data.length; i++) {
        if (data[i][0]==book && data[i][1] == url) {
            return i
        }
    }
}

function addBook_help() {
    input = document.getElementById('addbook_input')
    let data = JSON.parse(localStorage.getItem('books'));
    let new_data = []
    data.forEach(element => {
        if (element[3] == site) {
            new_data.push(element)
        }
    });
    if (input.value!="" && (!new_data.map(d => d[0]).map(book => book.toLowerCase()).includes(input.value.toLowerCase()))) {
        addBook(input.value,'','', site);
        data.splice(data.length, 0, [input.value, '', '', site, false, false]);
        localStorage.setItem('books', JSON.stringify(data));
        input.value = "";
    }
}

function sort_books() {
    let data = JSON.parse(localStorage.getItem('books'));
    data.sort((a, b) => a[0].localeCompare(b[0]));
    localStorage.setItem('books', JSON.stringify(data));
    delete_list()
    create_list()
}

function delete_list() {
    books.innerHTML = ''
    bookmarked_books.innerHTML = ''
    favorite_books.innerHTML = ''
}

function create_list() {
    const data = JSON.parse(localStorage.getItem('books'));
    data.forEach(element => {
        if (element[3] == site && element[4] && element[5]) {
            addBook(...element)
        }
    });
    data.forEach(element => {
        if (element[3] == site && element[4] && !element[5]) {
            addBook(...element)
        }
    });
    data.forEach(element => {
        if (element[3] == site && !element[4] && element[5]) {
            addBook(...element)
        }
    });
    data.forEach(element => {
        if (element[3] == site && !element[4] && !element[5]) {
            addBook(...element)
        }
    });
    manageTitles()
}

function search() {
    input = document.getElementById('search_input').value.toLowerCase();
    if (input != "") {
        const data = JSON.parse(localStorage.getItem('books'));
        let showBooks = []
        data.forEach(element => {
            if (element[0].toLowerCase().includes(input)) {
                showBooks.push(element)
            }
        });
        delete_list()
        showBooks.forEach(element => {
            if (element[3]==site) {
                addBook(...element)
            }
        })
        manageTitles()
    } else {
        delete_list()
        create_list()
    }
}

function reset() {
    delete_list()
    create_list()
    input = document.getElementById('search_input');
    input.value = ""
    input = document.getElementById('addbook_input');
    input.value = ""
}

function manageTitles() {
    console.log(bookmarked_books.childNodes.length)
    if (bookmarked_books.childNodes.length==0) {
        title_fav.style.marginTop = '1rem';
        title_bm.style.display = 'none';
    } else {
        title_fav.style.marginTop = '0rem';
        title_bm.style.display = 'block';
    }

    if (favorite_books.childNodes.length==0) {
        title_fav.style.display = 'none';
    } else {
        title_fav.style.display = 'block';
    }
}


window.addEventListener('load', function(){
    site = window.location.href.split("/").at(-1)
    if (site=="") {
        site = 'index.html'
    }
    create_list()
});

function save_file() {
    const data = JSON.parse(localStorage.getItem('books'));
    let content = JSON.stringify(data).split('],').join("],\n")

    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([content], { type: 'text/plain' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "appdata.txt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
}
const data = JSON.parse(localStorage.getItem('books'));
data.forEach(e => {
})
/*
const data = [["A Journey of Black and Red","https://www.royalroad.com/fiction/26675/a-journey-of-black-and-red/chapter/398080/13-homeward","I am so uwu omg","webnovels.html"],
["Apocalypse Redux","","Write","webnovels.html"],
["Azarinth Healer","","","webnovels.html"],
["Bastion","","","index.html"],
["Chainsawman","https://www.chainsaw-man-manga.online/manga/chainsaw-man-chapter-112/","","mangas.html"],
["Cradle","","","index.html"],
["Dawn of the Void","","","webnovels.html"],
["Defiance of the Fall","","","index.html"],
["Iron Prince","","","index.html"],
["Lord of the Mysteries","https://boxnovel.com/novel/lord-of-the-mysteries-boxnovel/chapter-27/","","webnovels.html"],
["Magical Girl Gunslinger","https://www.royalroad.com/fiction/48402/magical-girl-gunslinger","","webnovels.html"],
["Mistborn","","","index.html"],
["One Punch Man","https://mangarockteam.com/manga/onepunch-man/chapter-176/","","manga.html"],
["Salvos","https://www.royalroad.com/fiction/37438/hellprince…ster-evolution-litrpg/chapter/1076288/480-regroup","","webnovels.html"],
["Speedrun the Multiverse","","","webnovels.html"],
["Stormlight Archives","","","index.html"],
["The Beginning After the End","https://www.webnovelpub.com/novel/the-beginning-after-the-end-548/chapter-408-05122045","","webnovels.html"],
["Worm","https://parahumans.wordpress.com/2011/06/28/gestation-1-6/","","webnovels.html"],
["Kumo desu ga, Nani ka?","","","mangas.html"],
["Chainsawman","","","animes.html"]]
localStorage.setItem('books', JSON.stringify(data));
*/