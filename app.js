const headContainer = document.querySelector('.head-container')
const mainImg = document.querySelector('.img-box img');
const mainAudio = document.querySelector('.audio-tag');
const audioName = document.querySelector('.audio-name');
const nextBtn = document.querySelector('.right')
const prevBtn = document.querySelector('.left')
const audiosBtn = document.querySelector('.audios-btn')
const container = document.querySelector('.body-container')
const colors = ['#024d16', '#017b80', '#879136', '#440261', '#020a4d', '#de16c0'];

const data = [
    {
        imgSrc:'assets/images/image_1.jpeg',
        audioSrc:'assets/audios/audio_1.mp3',
        audioName:'audio 1'
    },
    {
        imgSrc:'assets/images/image_2.jpeg',
        audioSrc:'assets/audios/audio_2.mp3',
        audioName:'audio 2'
    },
    {
        imgSrc:'assets/images/image_3.webp',
        audioSrc:'assets/audios/audio_3.mp3',
        audioName:'audio 3'
    },
    {
        imgSrc:'assets/images/image_4.jpeg',
        audioSrc:'assets/audios/audio_4.mp3',
        audioName:'audio 4'
    },
    {
        imgSrc:'assets/images/image_5.jpeg',
        audioSrc:'assets/audios/audio_5.mp3',
        audioName:'audio 5'
    },
    {
        imgSrc:'assets/images/image_6.jpeg',
        audioSrc:'assets/audios/audio_6.mp3',
        audioName:'audio 6'
    }
]
let index = 0;


nextBtn.addEventListener('click', ()=>{
    index++;
    index > data.length - 1?index = 0:index;
    getAudio();
    
})

prevBtn.addEventListener('click',()=>{
    index--;
    index < 0?index = data.length -1: index;
    getAudio();
})

function getAudio(){
    mainAudio.pause();
    mainImg.src = data[index].imgSrc;
    mainAudio.src = data[index].audioSrc;
    audioName.textContent= data[index].audioName;
    headContainer.style.backgroundColor = `${colors[index]}`

    container.style.backgroundColor = `${colors.reverse()[index]}`
    
    let playingDiv = container.querySelectorAll('.card');


    if(playingDiv.length){
        playingDiv[index].firstElementChild.lastElementChild.classList.add('is-playing');
        for (let i = 0; i < playingDiv.length; i++) {
            if((i != index) ){
                playingDiv[i].firstElementChild.lastElementChild.classList.remove('is-playing')
            }
            }
    }
    
    setTimeout(()=>{
        mainAudio.play();
    }, 500)
    
}


audiosBtn.addEventListener('click',()=>{
    if(container.innerHTML == ''){
        chooseAudio();
    }else{
        container.innerHTML=''
    }
})


function chooseAudio(){ 
    data.map(el=>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div>
            <div class="card-img">
                <img src="${el.imgSrc}" alt="">
            </div>
    
            <div class="card-audio">
                <audio>
                    <source src="${el.audioSrc}">
                </audio>
                <p class="card-para">${el.audioName}</p>
            </div>
            <div class="playing ">
                <span class="play_1"></span>
                <span class="play_2"></span>
                <span class="play_3"></span>
            </div>
        </div>
        <hr class="line">
    `;
    container.appendChild(card)
    })
    const cards = document.querySelectorAll('.card');
    cards[0].firstElementChild.lastElementChild.classList.add('is-playing')

    
    cards.forEach((item ,indx)=>{
        item.addEventListener('click', (e)=>{
        if(e.target.parentElement.className =='card-img'){
            const targetEl = e.target;
            mainAudio.pause();
            
            mainImg.src = targetEl.src;
            mainAudio.src = targetEl.parentElement.nextElementSibling.firstElementChild.firstElementChild.src;
            audioName.textContent = targetEl.parentElement.nextElementSibling.lastElementChild.textContent;
            headContainer.style.backgroundColor = `${colors[Math.floor(Math.random()*colors.length)]}`
            container.style.backgroundColor = `${colors.reverse()[index]}`

            const lastChild = targetEl.parentElement.nextElementSibling.nextElementSibling.classList.add('is-playing')
            
            setTimeout(()=>{
                mainAudio.play();
            }, 500)
            index = indx;
            
        }else if(e.target.className == 'card-para'){
            
            const targetEl = e.target;
            mainAudio.pause();
            headContainer.style.backgroundColor = `${colors[indx]}`
            container.style.backgroundColor = `${colors.reverse()[index]}`
            
            mainImg.src = targetEl.parentElement.previousElementSibling.firstElementChild.src;
            mainAudio.src = targetEl.previousElementSibling.firstElementChild.src;
            audioName.textContent = targetEl.textContent;
            const lastChild = targetEl.parentElement.nextElementSibling.classList.add('is-playing')

            setTimeout(()=>{
                mainAudio.play();
            }, 500)
            index = indx;

        }else if((e.target.parentElement.className !='card-img') ||(e.target.className != 'card-para')){
            
            mainAudio.pause();
            const firstChild = e.target.firstElementChild;
            const middleChild = e.target.children[1];
            const lastChild = e.target.lastElementChild;

            headContainer.style.backgroundColor = `${colors[indx]}`;
            container.style.backgroundColor = `${colors.reverse()[index]}`
            
            mainImg.src = firstChild.firstElementChild.src;
            mainAudio.src =  middleChild.firstElementChild.firstElementChild.src;
            lastChild.classList.add('is-playing');
            audioName.textContent = middleChild.lastElementChild.textContent;
    
            setTimeout(()=>{
                mainAudio.play();
            }, 500)
            index = indx;
        }
        for (let i = 0; i < cards.length; i++) {
            if(cards[i] != item){
                cards[i].firstElementChild.lastElementChild.classList.remove('is-playing');
            }
        }   
    })
}) 
}
































