const books = document.getElementsByClassName('hero__list')[0];
let site = window.location.url

function addBook(book, url, desc, site) {
    let container = document.createElement('div');
    let container_update = document.createElement('div')
    let container_text = document.createElement('div')
    let entry = document.createElement('li');
    let remove = document.createElement('button');
    let label = document.createElement('label');
    let input_url = document.createElement('input');
    let input_button = document.createElement('button');
    let textarea_desc = document.createElement('div');

    container.className = 'hero__list__container';
    entry.className = 'hero__list__elem';
    remove.className = 'hero__list__elem__remove';

    remove.innerText = 'X'
    remove.addEventListener('click', function(e) {
      // Delete from localstorage
      var result = confirm("Are you sure you want to delete the book?");
      if (result) {
        let data = JSON.parse(localStorage.getItem('books'));
        let index = getIndexOfBook(data, book, url, desc, site);
        data.splice(index, 1);
    
        localStorage.setItem('books', JSON.stringify(data));
        // Delete HTML
        this.parentElement.parentElement.remove();
       }
    });

    input_button.addEventListener('click', function(e) {
        let new_url = input_url.value
        if (new_url != "" || (new_url == "" && url != "")) {
            let data = JSON.parse(localStorage.getItem('books'));
            index = getIndexOfBook(data, book, url, desc, site);
            data.splice(index, 1, [book, new_url, desc, site]);
            localStorage.setItem('books', JSON.stringify(data));
            entry.onclick = function () {openInNewTab(new_url);};
            alert("Url updated!");
        }
    });
    
    label.appendChild(document.createTextNode('Update url:'));
    label.className = 'hero__list__elem__label';
    input_button.textContent = 'Update';
    input_button.className = 'hero__list__elem__update';
    input_url.className = 'hero__list__elem__text';
    container_update.className = 'hero__list__elem__updatecontainer';
    container_text.className = 'hero__list__elem__textcontainer'

    entry.appendChild(document.createTextNode(book));
    if (url != "") {
        entry.onclick = function () {openInNewTab(url);};
        input_url.value = url
    }

    textarea_desc.addEventListener('input', function(e) {
        let data = JSON.parse(localStorage.getItem('books'));
        index = getIndexOfBook(data, book, url, desc, site);
        data.splice(index, 1, [book, url, textarea_desc.innerHTML, site]);
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

    textarea_desc.className = 'hero__list__elem__desc'

    container_update.appendChild(label);                                       
    container_update.appendChild(input_url);
    container_update.appendChild(input_button);
    container_text.appendChild(remove)
    container_text.appendChild(entry)
    container_text.appendChild(textarea_desc)
    container.appendChild(container_text)
    container.appendChild(container_update)
    books.appendChild(container);
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
        data.splice(data.length, 0, [input.value, '', '', site]);
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
}

function create_list() {
    const data = JSON.parse(localStorage.getItem('books'));
    data.forEach(element => {
        if (element[3] == site) {
            addBook(...element)
        }
    });
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


window.addEventListener('load', function(){
    site = window.location.href.split("/").at(-1)
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

/*
const data = [["A Journey of Black and Red","https://www.royalroad.com/fiction/26675/a-journey-of-black-and-red/chapter/398080/13-homeward","I am so uwu omg","webnovel.html"],
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
["Mistborn","","","books.html"],
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