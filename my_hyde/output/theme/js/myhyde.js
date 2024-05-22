function toggle(element) {
    element.classList.toggle('hidden');
    var myDiv = document.getElementById("menu-div");
    var maxHeight = window.innerHeight * 0.5;
    if (myDiv.offsetHeight > maxHeight) {
      myDiv.classList.add("scrollable-div");
    }
    var icon = element.previousElementSibling.querySelector('.icon');
    if (icon.style.transform === 'rotate(90deg)') {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(90deg)';
    }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function show(type) {
    const container = document.getElementById('image-container');
    container.innerHTML = ''
    container.innerHTML = type + ":"
    fetch('/theme/js/images.json')
        .then(response => response.json())
        .then(data => {
            var imageUrls;
            var imageUrlsStr = localStorage.getItem(type);
            if(imageUrlsStr == null){
                imageUrls = shuffle(data[type]);
                if(imageUrls.length > 100){
                    imageUrls = imageUrls.slice(0,100)
                }
                localStorage.setItem(type, imageUrls.join('|'));
            }else{
                imageUrls = imageUrlsStr.split('|')
            }
            const container = document.getElementById('image-container');
            imageUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = '';
                container.appendChild(img);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadImages() {
    fetch('/theme/js/images.json')
        .then(response => response.json())
        .then(data => {
            const imageUrls = data['urls'];
            const container = document.getElementById('image-container');
            imageUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = '';
                container.appendChild(img);
            });
        })
        .catch(error => console.error('Error:', error));
}
loadImages()