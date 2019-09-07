body {
	text-align: center;
}

ul {
	height: 70px;
	margin-top: 50px;
	font-size: 25px;
	display: flex;
	justify-content: center;
	flex-direction: row;
	background-color: antiquewhite;
}

li {
	display: block;
	padding: 20px;
	font-weight: 900;
}

/*Date*/

#birthDate {
	background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50%
		no-repeat;
}

#birthDate::-webkit-inner-spin-button {
	display: none;
}

#birthDate::-webkit-calendar-picker-indicator {
	opacity: 0;
}

input {
	text-transform: uppercase;
	border: 1px solid #c4c4c4;
	border-radius: 5px;
	background-color: #fff;
	padding: 3px 5px;
	box-shadow: inset 0 3px 6px #0000001a;
	width: 190px;
	font-size: 20px;
}

#displayButton {
	cursor: pointer;
	margin: auto;
	width: 100px;
	margin-top: 50px;
	padding: 10px;
	background-color: aquamarine;
	user-select: none;
	border: 2px solid #c4c4c4;
}

#displayButton:active {
	border: 1px solid #c4c4c4;
}
