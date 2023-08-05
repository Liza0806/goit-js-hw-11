import axios from "axios"; 
import SimpleLightbox from "simplelightbox"; 
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css"; 
 
 
const myPixabayKey = "38602994-963aa75bc12682ba48659a817"; 
const baseUrl = "https://pixabay.com/api/"; 
const bodyJs = document.querySelector("body"); 
const gallery = document.querySelector(".gallery");
const inputJs = document.querySelector(".search-form input");
const searchBtn = document.querySelector(".search-form button"); 
const loadMoreBtn = document.querySelector(".load-more");
const form = document.querySelector(".search-form");

let pageCount = 1;
let perPageCount = 40;
let keyWord = "";
const divForForm = document.createElement("div")
divForForm.className = "forForm";

bodyJs.prepend(divForForm)
divForForm.appendChild(form)

 
async function getArrOfPhotos(keyWord) { 
    try { 
      const response = await axios.get(`${baseUrl}?key=38602994-963aa75bc12682ba48659a817&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageCount}&per_page=${perPageCount}`); 
      const arrOfPhotos = response.data.hits;  
       if(arrOfPhotos.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        gallery.innerHTML =" ";
        loadMoreBtn.style.display = "none"
        return;
       } else 
      {//console.log(response); 
      //console.log(arrOfPhotos); 
return arrOfPhotos; 
       }
    } catch (error) { 
      Notiflix.Notify.failure("Error"); 
    } 
  }

 
 
 
  function renderPhotos(arrOfPhotos) { 
    let photoPageLi = "";  
    if (arrOfPhotos === undefined) {
      return; 
   }else{
    arrOfPhotos.forEach(photo => { 
      const onePhoto = `<li class="gallery__item"> 
        <a class="gallery__link" href="${photo.largeImageURL}"  onclick="return false"> 
          <img class="gallery__image" 
          src="${photo.webformatURL}"  
            data-source ="${photo.largeImageURL}" 
            alt="${photo.tags}"  
            loading="lazy"    
          />  
        </a> 
        <div class="info"> 
          <p class="info-item"> 
            <b>Likes:<br>${photo.likes}</b> 
          </p> 
          <p class="info-item"> 
            <b>Views:<br>${photo.views}</b> 
          </p> 
          <p class="info-item"> 
            <b>Comments:<br>${photo.comments}</b> 
          </p> 
          <p class="info-item"> 
            <b>Downloads:<br>${photo.comments}</b> 
          </p> 
        </div> 
      </li>`; 
      photoPageLi += onePhoto; 
    }); 
       
   
    //console.log(photoPageLi); 
   
    const photoPage = "<ul>" + photoPageLi + "</ul>"; 
    return photoPage; 
  } 
   }
  const lightbox = new SimpleLightbox('.gallery a') 
   
  searchBtn.addEventListener("click", findPhoto) 
 
  function findPhoto(e){ 
    e.preventDefault(); 
     keyWord = inputJs.value; 
     //console.log(keyWord) 
     pageCount = 1;
      getArrOfPhotos(keyWord) 
      .then(arrOfPhotos => renderPhotos (arrOfPhotos)) 
          .then(photoPage => { if (photoPage === undefined){
            gallery.innerHTML = ""
          } else 
             { gallery.innerHTML = photoPage ;
              const lightbox = new SimpleLightbox('.gallery a') 
              loadMoreBtn.style.display = "block";
               
          }}).catch( gallery.innerHTML = ""
          ).finally(inputJs.value = "")}
  loadMoreBtn.addEventListener("click", getMorePhotos)

  function getMorePhotos (e){
pageCount +=1;
e.preventDefault(); 
//console.log(keyWord) 
 getArrOfPhotos(keyWord) 
 .then(arrOfPhotos => renderPhotos (arrOfPhotos)) 
     .then(photoPage => { 
           
         gallery.innerHTML += photoPage ;
         const lightbox = new SimpleLightbox('.gallery a') 
     }).catch(err =>
      Notiflix.Notify.failure("не можем догрузить"))}
