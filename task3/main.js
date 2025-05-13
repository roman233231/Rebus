let timeStorage = localStorage
let time

if(timeStorage.getItem("time") != null){
	time = parseInt(timeStorage.getItem("time"))
}else{
	time = 300
	timeStorage.setItem("time", time)
}

let firstCart= null
let secondCard = null

let cards = [
    {
        name:"one",
        img: "https://cdn.pixabay.com/photo/2022/04/07/04/48/calligraphy-7116788_1280.png",
        id: 1,
    },
    {
        name:"two",
        img: "https://cdn.pixabay.com/photo/2023/09/14/10/27/face-logo-8252748_1280.png",
        id: 2,
    },
    {
        name:"three",
        img: "https://media.istockphoto.com/id/2149834306/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/dog-with-sunglasses.jpg?s=1024x1024&w=is&k=20&c=rq9VWPkz7h06a_t8jHDI3jFrxg-OnOzEdSOiuqkIn_w=",
        id: 3
    },
    {
        name:"four",
        img: "https://cdn.pixabay.com/photo/2022/08/28/03/42/sea-7415664_1280.png",
        id: 4
    },
    {
        name:"five",
        img: "https://cdn.pixabay.com/photo/2023/10/16/15/49/guy-fawkes-8319511_960_720.png",
        id: 5
    },
    {
        name:"six",
        img: "https://cdn.pixabay.com/photo/2024/01/25/06/56/ai-generated-8531104_1280.png",
        id: 6
    },
    {
        name:"seven",
        img: "https://cdn.pixabay.com/photo/2017/05/31/16/39/windows-2360920_1280.png",
        id: 7
    },
    {
        name:"eight",
        img: "https://cdn.pixabay.com/photo/2015/10/20/21/05/mcdonald-998495_1280.png",
        id: 8
    },
    {
        name:"nine",
        img: "https://cdn.pixabay.com/photo/2022/08/24/23/12/apple-7408883_1280.png",
        id: 9
    },
    {
        name:"ten",
        img: "https://cdn.pixabay.com/photo/2024/01/25/06/56/ai-generated-8531087_1280.png",
        id: 10
    },
    {
        name:"eleven",
        img: "https://cdn.pixabay.com/photo/2022/07/28/13/53/logo-7349896_1280.png",
        id: 11
    },
    {
        name:"twelve",
        img: "https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png",
        id: 12
    }
]

function shuffle(array) {
	var m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}




function fillboard(){
    let board = [...cards, ...cards]; 
    shuffle(board);
    board.forEach(card => {
        $(".gameBoard").append(`
            <div class="card " data-id="${card.id}">
                <div class="front">ROBOCODE</div>
                <div class="back">
                    <img src="${card.img}" alt="${card.name}"  height="200px" width="100%">
                </div>
            </div>
        `);
    });
}


let progress = 0


$(document).ready(function() {
	$(".progress").knob({
		"min": 0,
		"max": 10,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true
	})

	$(".time").knob({
		"min": 0,
		"max": 300,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true
	})

$(".start").click(function(){
	$(".start").css('display', 'none')
	$(".taskProgress, .timeProgress, .sound, .answer").css('display', 'block')
    $(".gameBoard").css('display', 'grid')
    startTime()
    fillboard()
    $(".card").on("click", cardClicked)
startTime()
})

	
	$("#btnTask1").click(function(){
		if(answer[num - 1].indexOf($("#inputTask1").val().toLowerCase() != -1 ) )
{
			alertify.success("Right answer!")
			$("#inputTask1").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(num)
			console.log(was)
			if (progress < 12) {
				do {
					num = Math.floor(1 + Math.random() * 15)
				} while (was.includes(num))
				console.log(answer[num - 1])
				startRebus(num)
			} else {
				$(".img, .answer, .taskProgress").css({
					'display': 'none'
				})

				$("#nextTask").css({
					'display': 'flex'
				})
			}
		} else {
			alertify.error("Wrong answer. Try again!")
		}
	})
})

function  cardClicked(event){
    console.log(event)
    if(secondCard || $(this).hasClass('matched')){
        return
    }

    if(!firstCart){
        firstCart = $(this)
        firstCart.addClass("flip")
        return
    }


if(firstCart) {
    secondCard = $(this)
    secondCard.addClass("flip")
    if(firstCart.attr("data-id") == secondCard.attr("data-id")){
        firstCart.addClass("matched")
        secondCard.addClass("matched")
        firstCart = null
        secondCard = null
        progress++
        $(".progress").val(progress).trigger('time')
        if(progress == 12){
            alertify.error("win!")
        }
        return
    }else{
        setTimeout(function(){
            firstCart.removeClass("flip")
            secondCard.removeClass("flip")
            firstCart = null
            secondCard = null
        }, 600)
    }
}
}

function startTime(){
	setInterval(function(){
    time = parseInt(localStorage.getItem("time")) - 1
	$(".time").val(time).trigger('time')
	if (time == 0){
		alertify.error("Time is out!")
		setTimeout(()=>window.open("../task1/index.html", "_self", false), 2000)
		localStorage.removeItem("time")
	}else if(time > 0){
		localStorage.setItem("time", time)
	}

	}, 1000)
}