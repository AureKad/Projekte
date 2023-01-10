const books = document.getElementsByClassName('hero__list')[0];

function addBook(book, url) {
    let container = document.createElement('div');
    let entry = document.createElement('li');
    let close = document.createElement('button');
    let container_name = document.createElement('div')
    let container_update = document.createElement('div')
    let label = document.createElement('label');
    let input_url = document.createElement('input');
    let input_button = document.createElement('button');

    container.className = 'hero__list__container';
    entry.className = 'hero__list__elem';
    close.className = 'hero__list__remove';

    close.innerText = 'X'
    close.addEventListener('click', function(e) {
      // Delete from localstorage
      var result = confirm("Are you sure you want to delete the book?");
      if (result) {
        let data = JSON.parse(localStorage.getItem('books'));
        let index = getIndexOfBook(data, book, url);
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
            index = getIndexOfBook(data, book, url);
            data.splice(index, 1, [book, new_url]);
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
    container_update.className = 'hero__list__elem__container';
    container_name.className = 'hero__list__namecontainer'

    entry.appendChild(document.createTextNode(book));
    if (url != "") {
        entry.onclick = function () {openInNewTab(url);};
        input_url.value = url
    }

    container_name.appendChild(close);
    container_name.appendChild(entry);
    container.appendChild(container_name)
    container_update.appendChild(label);
    container_update.appendChild(input_url);
    container_update.appendChild(input_button);
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
    if (input.value!="" && !data.map(d => d[0]).map(book => book.toLowerCase()).includes(input.value.toLowerCase())) {
        addBook(input.value,'');
        data.splice(data.length, 0, [input.value, ""]);
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
        addBook(...element)
    });
}



window.addEventListener('load', function()
{
    const data = JSON.parse(localStorage.getItem('books'));
    data.forEach(element => {
        addBook(...element)
    });
});

/*const data = [["Apocalypse Redux", ""], ["Bastion", ""], ["Chainsawman", "https://www.chainsaw-man-manga.online/manga/chainsaw-man-chapter-112/"], 
        ["Cradle", ""], ["Dawn of the Void", ""], ["Defiance of the Fall", ""], ["Iron Prince", ""], ["Magical Girl Gunslinger", 
        "https://www.royalroad.com/fiction/48402/magical-girl-gunslinger"], ["Mistborn", ""], ["One Punch Man", "https://mangarockteam.com/manga/onepunch-man/chapter-176/"],
        ["Salvos", "https://www.royalroad.com/fiction/37438/hellprinces-salvos-a-monster-evolution-litrpg/chapter/1076288/480-regroup"],
        ["Speedrun the Multiverse", ""], ["Stormlight Archives", ""], ["The Beginning After the End", 
        "https://www.webnovelpub.com/novel/the-beginning-after-the-end-548/chapter-408-05122045"], ["Worm", "https://parahumans.wordpress.com/2011/06/28/gestation-1-6/"]];
*/
