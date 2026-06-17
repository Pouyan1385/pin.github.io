const library={
'Artist 1':[
{title:'Song 1',cover:'covers/cover1.jpg',audio:'music/song1.mp3'},
{title:'Song 2',cover:'covers/cover2.jpg',audio:'music/song2.mp3'}],
'Artist 2':[
{title:'Song 3',cover:'covers/cover3.jpg',audio:'music/song3.mp3'}]
};

const audio=new Audio();
let currentArtist='',songs=[],index=0;

const artistList=document.getElementById('artistList');
Object.keys(library).forEach(a=>{
let d=document.createElement('div');
d.className='artist'; d.textContent=a;
d.onclick=()=>openArtist(a);
artistList.appendChild(d);
});

document.getElementById('search').oninput=e=>{
const q=e.target.value.toLowerCase();
[...artistList.children].forEach(x=>x.style.display=x.textContent.toLowerCase().includes(q)?'block':'none');
};

function openArtist(a){
currentArtist=a;songs=library[a];
artistTitle.textContent=a;
songList.innerHTML='';
songs.forEach((s,i)=>{
let d=document.createElement('div');
d.className='song'; d.textContent=s.title;
d.onclick=()=>playSong(i);
songList.appendChild(d);
});
searchPage.classList.add('hidden');
songsPage.classList.remove('hidden');
}

function showArtists(){
songsPage.classList.add('hidden');
playerPage.classList.add('hidden');
searchPage.classList.remove('hidden');
}

function playSong(i){
index=i;
const s=songs[i];
audio.src=s.audio;
cover.src=s.cover;
title.textContent=s.title;
artist.textContent=currentArtist;
bg.style.backgroundImage=`url(${s.cover})`;
audio.play();
songsPage.classList.add('hidden');
playerPage.classList.remove('hidden');
}

function togglePlay(){audio.paused?audio.play():audio.pause();}
function nextSong(){playSong((index+1)%songs.length);}
function prevSong(){playSong((index-1+songs.length)%songs.length);}

audio.ontimeupdate=()=>{
progress.max=audio.duration||0;
progress.value=audio.currentTime||0;
};
progress.oninput=()=>audio.currentTime=progress.value;
