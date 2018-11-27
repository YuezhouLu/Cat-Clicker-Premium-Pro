/* ======= Model ======= */

var model = {
    selectedCat: null,
    admin: false,
    cats: [
        {
            name: 'Oscar',
            imgUrl: 'img/Oscar.jpg',
            clickCount: 0
        },
        {
            name: 'Max',
            imgUrl: 'img/Max.jpg',
            clickCount: 0
        },
        {
            name: 'Tiger',
            imgUrl: 'img/Tiger.jpg',
            clickCount: 0
        },
        {
            name: 'Sam',
            imgUrl: 'img/Sam.jpg',
            clickCount: 0
        },
        {
            name: 'Tom',
            imgUrl: 'img/Tom.jpg',
            clickCount: 0
        },
        {
            name: 'Misty',
            imgUrl: 'img/Misty.jpg',
            clickCount: 0
        },
        {
            name: 'Simba',
            imgUrl: 'img/Simba.jpg',
            clickCount: 0
        },
        {
            name: 'Coco',
            imgUrl: 'img/Coco.jpg',
            clickCount: 0
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {
    init: function() {
        model.selectedCat = model.cats[0];
        catView.init();
        catListView.init();
        adminView.init();
    },

    getSelectedCat: function() {
        return model.selectedCat;
    },

    getCats: function() {
        return model.cats;
    },

    setSelectedCat: function(cat) {
        model.selectedCat = cat;
    },

    incrementClickCount: function() {
        model.selectedCat.clickCount++;
        catView.render();
        adminView.render();
    },

    toggleAdmin: function() {
        if (model.admin === true) {
            model.admin = false;
        } else {
            model.admin = true;
        }
        adminView.render();
    },

    refreshCatList: function(oldName, newName, newImg, newCount) {
        document.getElementById('cat-list').innerHTML = '';
        var allCats = octopus.getCats();
        for (var i = 0; i < allCats.length; i++) {
            var cat = allCats[i];
            if (cat.name === oldName) {
                cat.name = newName;
                cat.imgUrl = newImg;
                cat.clickCount = newCount;
            }
        }
        catListView.render();
    }
};


/* ======= View ======= */

var catView = {
    init: function() {
        this.catNameElem = document.getElementById('cat-name');
        this.catImgElem = document.getElementById('cat-img');
        this.clickCountElem = document.getElementById('click-count');

        this.catImgElem.addEventListener('click', function() {
            octopus.incrementClickCount();
            this.cat_name_span = document.getElementById('cat-cap');
            this.cat_name_span.style.color = "red";
        });

        this.render();
    },

    render: function() {
        var currentCat = octopus.getSelectedCat();

        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.imgUrl;
        this.catImgElem.alt = `${currentCat.name}`;
        this.clickCountElem.innerHTML = `You have clicked <span id='cat-cap'>${currentCat.name}</span> ${currentCat.clickCount} times.`;
    }
};

var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        var allCats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for (var i = 0; i < allCats.length; i++) {
            var cat = allCats[i];
            var cat_li = document.createElement('li');
            cat_li.textContent = cat.name;
            cat_li.style.cssText = "font-size: 18px; margin-bottom: 1em; cursor: pointer";
            cat_li.addEventListener('click', function(catObject) {
                return function() {
                    octopus.setSelectedCat(catObject);
                    catView.render();
                    adminView.render();
                };
            }(cat));

            this.catListElem.appendChild(cat_li);
        }
    }
};

var adminView = {
    init: function() {
        this.adminButton = document.getElementById('admin-button');
        this.catAdminArea = document.getElementById('admin-area');
        this.catRenameElem = document.getElementById('cat-rename');
        this.catRephotoElem = document.getElementById('cat-rephoto');
        this.catReclickElem = document.getElementById('cat-reclick');
        this.cancelButton = document.getElementById('cancel-button');
        this.saveButton = document.getElementById('save-button');

        this.adminButton.addEventListener('click', function() {
            octopus.toggleAdmin();
        });
        this.cancelButton.addEventListener('click', function() {
            octopus.toggleAdmin();
        });
        
        // We used an IIFE (Immediately-Invoked Function Expression) here to save spaces (otherwise, creating 3 more repetitve elements again and using 3 this.xxx).
        this.saveButton.addEventListener('click', function(form) {
            return function() {
                var currentCat = octopus.getSelectedCat();
                var oldName = currentCat.name;
                var newName = form.catRenameElem.value;
                var newImg = form.catRephotoElem.value;
                var newCount = form.catReclickElem.value;
                model.selectedCat = {
                    name: newName,
                    imgUrl: newImg,
                    clickCount: newCount
                };
                catView.render();

                octopus.refreshCatList(oldName, newName, newImg, newCount);
                octopus.toggleAdmin();
            };
        }(adminView), false);

        this.render();
    },
    
    render: function() {
        if (model.admin === true) {
            this.catAdminArea.style.display = "block";

            var currentCat = octopus.getSelectedCat();
            this.catRenameElem.value = currentCat.name;
            this.catRephotoElem.value = `img/${currentCat.name}.jpg`;
            this.catReclickElem.value = currentCat.clickCount;
        } else {
            this.catAdminArea.style.display = "none";
        }
    }
};


/* ======= Launch ======= */

octopus.init();