let timeStorage = localStorage
let time

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"))
} else {
	time = 300
	timeStorage.setItem("time", time)
}

let answer = [
	["гаррі поттер", "harry potter"],
	["губка боб", "sponge bob"],
	["пірати", "пірати карибського моря"],
	["сімпсони", "the simpsons"],
	["зоряні війни", "star wars"],
	["lion king", "король лев"],
	["frozen", "холодне серце"],
	["shrek", "шрек"],
	["shrek", "шрек"],
	["rocky", "роккі"],
	["індіана джонс", "indiana jones"],
	["один вдома", "home alone"],
	["термінатор", "terminator"],
	["назад у майбутнє", "back to the future"],
	["мисливці за привидами", "ghost busters"]
]


let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 15)
console.log(answer[num - 1])

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

	$(".start").click(function() {
		$(".start").css('display', 'none')
		$(".taskProgress, .timeProgress, .sound, .answer").css('display', 'block')
		startRebus(num)
	})

	$("#btnTask1").click(function(){
		if(answer[num - 1].indexOf($("#inputTask1").val().toLowerCase()) != -1 ) {
			alertify.success("Right answer!")
			$("#inputTask1").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(num)
			console.log(was)
			if (progress < 10) {
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



function startRebus(arg) {
	$("#melody").attr("src", `sound/${arg}.mp3`)
}

