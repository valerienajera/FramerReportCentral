# Define and set custom device
Framer.Device.customize
	deviceType: Framer.Device.Type.Computer
	screenWidth: 1920
	screenHeight: 1080
	deviceImageWidth:1440
	deviceImageHeight: 900
	
{InputField} = require 'InputField'

dashboard = new Layer
	height: 1080
	image: "images/dashboard2.png"
	width: 1920

dashboard.on Events.Click, (event, layer) -> 
	Utils.delay .3, ->
			searchInput.visible = true
	

searchInput = new InputField
		name: "colorInput"
		type: "text"
		width:  Screen.width
		height: 1080
		y: 0
		color: "#696969"
		backgroundColor: Color.gray(0.9, 0.7)	
		indent:   48
		fontSize: 80
		fontWeight: 600
		fontFamily: "Halvetica Neue, sans-serif"
		placeHolder: "Search"
		placeHolderFocus: " "
		placeHolderColor: "black"
		autoCapitalize: false
		autoComplete: false
		autoCorrect: false
		maxLength: 100
		pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
		match: ["report", "What should I sell", "what should i sell?", "What products should I sell?", "what products to sell?", "what can I sell?", "What are good products that I need to sell"]
		value: ""
		visible: false
		# lineHeight: 30


final_image = new Layer
			height: 1080
			image: "images/final.png"
			width: 1920 
			visible: false
			
searchInput.on Events.Match, (value) -> 
	if searchInput.checkMatch()  
		Utils.delay 1.0, ->
			final_image.visible = true
	
final_image.onClick -> 
	@.visible = false
	searchInput.input.value = ""

textA = new TextLayer
	text: "x"
	fontSize: 64
	fontWeight: 600
	x: Screen.width - 80
	parent: searchInput

textA.onClick ->
	searchInput.visible = false



		










