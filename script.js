let seconds = 0;
let interval = null;
let currentSlot = "";

let sessions = [];

try{

sessions =

JSON.parse(
localStorage.getItem(
"sessions"
)

)

|| [];

}

catch{

sessions=[];

}



let celebrated =

JSON.parse(

localStorage.getItem(
"celebrated"
)

)

|| false;



function save(){

localStorage.setItem(

"sessions",

JSON.stringify(
sessions
)

);



localStorage.setItem(

"celebrated",

JSON.stringify(
celebrated
)

);

}



function formatClock(total){

let h =

String(
Math.floor(
total/3600
)

).padStart(
2,
"0"
);



let m =

String(
Math.floor(
(total%3600)/60
)

).padStart(
2,
"0"
);



let s =

String(
total%60
)

.padStart(
2,
"0"
);



return `${h}:${m}:${s}`;

}



function formatTime(total){

let h =
Math.floor(
total/3600
);

let m =
Math.floor(
(total%3600)/60
);

let s =
total%60;



return `${h}h ${m}m ${s}s`;

}



function calculateTotal(){

return sessions.reduce(

(a,b)=>

a+

(
b.seconds

||

0

),

0

);

}



function drawProgress(total){

let percent =

Math.min(

total/20,

1

);



todayTotal.textContent =

`${formatTime(
total
)} / 10h`;



fill.style.width =

`${percent*100}%`;



const circle =

document.querySelector(
".circle"
);



if(circle){

circle.style.setProperty(

"--progress",

`${percent*360}deg`

);

}

}



function updateTimer(){

seconds++;



timer.textContent =

formatClock(
seconds
);



drawProgress(

calculateTotal()

+

seconds

);

}



function startTimer(){

if(interval)
return;



currentSlot =

slotName.value

.trim();



if(!currentSlot){

alert(
"Enter slot name"
);

return;

}



interval =

setInterval(
updateTimer,
1000
);

}



function pauseTimer(){

clearInterval(
interval
);

interval =
null;

}



function renderSessions(){

slots.innerHTML =
"";



sessions.forEach(

session=>{

slots.innerHTML +=

`

<p>

${session.name}

—

${session.time}

</p>

`;

}

);

}



function updateTotal(){

let total =

calculateTotal();



drawProgress(
total
);



if(
total>=36000
&&
!celebrated
){

celebration.textContent =

"🎉 GOAL ACHIEVED";

celebrated =
true;

}



save();

}



function endTimer(){

if(
seconds===0
&&
!interval
){

return;

}



pauseTimer();



sessions.push({

name:
currentSlot,

time:
formatTime(
seconds),

seconds:
seconds

});



renderSessions();



seconds=0;

timer.textContent=
"00:00:00";



slotName.value=
"";



updateTotal();

}



function deleteLast(){

if(
sessions.length===0
){

alert(
"No sessions"
);

return;

}



sessions.pop();



renderSessions();

updateTotal();

}



renderSessions();

updateTotal();