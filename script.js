const player = document.getElementById("player");
const playBtn = document.querySelector(".fa-play-circle");
const nextBtn = document.querySelector(".fa-step-forward");
const prevBtn = document.querySelector(".fa-step-backward");
const progress = document.querySelector(".progress");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");
const nowPlaying = document.querySelector(".now-playing");
const playlists = document.querySelectorAll(".songplaylist");
let songIndex = 0;
const songs = [
{src:"rangbaaz.mpeg",name:"Rangbaaz"},
{src:"saiyaara.mpeg",name:"Saiyaara"},
{src:"saiya-sewa.mpeg",name:"Saiya Sewa Kare"},
{src:"babuaan.mpeg",name:"Babuaan Se Hila"},
{src:"bani-laka.mpeg",name:"Bani Laka"},
{src:"dhamaka.mpeg",name:"Dhamaka"},

{src:"Har kisse ke dil mai.mpeg",name:"Har Kisse Ke Dil Mai"},
{src:"Odhaniya ae gori.mpeg",name:"Odhaniya Ae Gori"}
];

function loadSong(index){

player.src = songs[index].src;

nowPlaying.innerText = "Playing: " + songs[index].name;

}

loadSong(songIndex);
playlists.forEach((card,index)=>{
card.addEventListener("click",()=>{
songIndex=index;
loadSong(songIndex);
player.play();
playBtn.classList.remove("fa-play-circle");
playBtn.classList.add("fa-pause-circle");
});
});
playBtn.addEventListener("click",()=>{
if(player.paused){
player.play();
playBtn.classList.remove("fa-play-circle");
playBtn.classList.add("fa-pause-circle");
}else{
player.pause();
playBtn.classList.remove("fa-pause-circle");
playBtn.classList.add("fa-play-circle");

}
});
nextBtn.addEventListener("click",()=>{
songIndex++;
if(songIndex>=songs.length){
songIndex=0;
}
loadSong(songIndex);
player.play();
});
prevBtn.addEventListener("click",()=>{
songIndex--;
if(songIndex<0){
songIndex=songs.length-1;
}
loadSong(songIndex);
player.play();
});
function formatTime(time){
let minutes=Math.floor(time/60);
let seconds=Math.floor(time%60);
if(seconds<10){
seconds="0"+seconds;
}
return minutes+":"+seconds;
}
player.addEventListener("loadedmetadata",()=>{
totalTimeEl.innerText=formatTime(player.duration);
});
player.addEventListener("timeupdate",()=>{
currentTimeEl.innerText=formatTime(player.currentTime);
let progressValue=(player.currentTime/player.duration)*100;
progress.value=progressValue;
});
progress.addEventListener("input",()=>{
player.currentTime=(progress.value/100)*player.duration;
});