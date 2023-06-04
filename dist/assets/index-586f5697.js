import{v4 as c}from"https://jspm.dev/uuid";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const f=[{handle:"@TrollBot66756542 💎",profilePic:"images/troll.jpg",likes:27,retweets:10,tweetText:`Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,replies:[],isLiked:!1,isRetweeted:!1,uuid:"4b161eee-c0f5-4545-9c4b-8562944223ee"},{handle:"@Elon ✅",profilePic:"images/musk.png",likes:6500,retweets:234,tweetText:"I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀",replies:[{handle:"@TomCruise ✅",profilePic:"images/tcruise.png",tweetText:"Yes! Sign me up! 😎🛩"},{handle:"@ChuckNorris ✅",profilePic:"images/chucknorris.jpeg",tweetText:"I went last year😴"}],isLiked:!1,isRetweeted:!1,uuid:"3c23454ee-c0f5-9g9g-9c4b-77835tgs2"},{handle:"@NoobCoder12",profilePic:"images/flower.png",likes:10,retweets:3,tweetText:"Are you a coder if you only know HTML?",replies:[{handle:"@StackOverflower ☣️",profilePic:"images/overflow.png",tweetText:"No. Obviosuly not. Go get a job in McDonald's."},{handle:"@YummyCoder64",profilePic:"images/love.png",tweetText:"You are wonderful just as you are! ❤️"}],isLiked:!1,isRetweeted:!1,uuid:"8hy671sff-c0f5-4545-9c4b-1237gyys45"}];document.addEventListener("click",function(e){e.target.dataset.like?u(e.target.dataset.like):e.target.dataset.retweet?p(e.target.dataset.retweet):e.target.dataset.reply?g(e.target.dataset.reply):e.target.id==="tweet-btn"?m():e.target.dataset.delete&&w(e.target.dataset.delete)});function u(e){const i=r.filter(function(t){return t.uuid===e})[0];i.isLiked?i.likes--:i.likes++,i.isLiked=!i.isLiked,d()}function p(e){const i=r.filter(function(t){return t.uuid===e})[0];i.isRetweeted?i.retweets--:i.retweets++,i.isRetweeted=!i.isRetweeted,d()}function g(e){document.getElementById(`replies-${e}`).classList.toggle("hidden")}function m(){const e=document.getElementById("tweet-input");e.value&&(r.unshift({handle:"@Scrimba",profilePic:"images/scrimbalogo.png",likes:0,retweets:0,tweetText:e.value,replies:[],isLiked:!1,isRetweeted:!1,uuid:c()}),d(),e.value="")}localStorage.setItem("data",JSON.stringify(f));function w(e){r.forEach((i,t)=>{i.uuid===e&&r.splice(t,1)}),document.getElementById("feed").innerHTML=o(r)}function o(e){let i="";return e.forEach(function(t){let n="";t.isLiked&&(n="liked");let s="";t.isRetweeted&&(s="retweeted");let l="";t.replies.length>0&&t.replies.forEach(function(a){l+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${a.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${a.handle}</p>
                <p class="tweet-text">${a.tweetText}</p>
            </div>
        </div>
</div>
`}),i+=`
<div class="tweet">
    <div class="tweet-inner">
        <img src="${t.profilePic}" class="profile-pic">

        <div>
        <div class="tweet-headers">
            <p class="handle">${t.handle}</p>
            <i class="fa-solid fa-trash delete" data-delete="${t.uuid}"></i>
        </div>
            <p class="tweet-text">${t.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${t.uuid}"
                    ></i>
                    ${t.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${n}"
                    data-like="${t.uuid}"
                    ></i>
                    ${t.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${s}"
                    data-retweet="${t.uuid}"
                    ></i>
                    ${t.retweets}
                </span>
            </div>
        </div>
    </div>
    <div class="hidden" id="replies-${t.uuid}">
        ${l}
    </div>
</div>
`}),i}const r=JSON.parse(localStorage.getItem("data"));function d(){document.getElementById("feed").innerHTML=o(r)}d();
