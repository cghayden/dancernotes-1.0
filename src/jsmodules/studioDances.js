function Dance(id, name, song, tights, shoes, notes, num, day, time) {
	this.id = id;
	this.name = name;
	this.song = song;
	this.tights = tights;
	this.shoes = shoes;
	this.notes = notes;
	this.num = num || "";
	this.day = day || "";
this.time = time || "";
}

const studioDances = [
	new Dance (
	"teen1Hiphop", 
	"Teen 1 Hip Hop",
	"Instruction",
	"Light Suntan Capezio Ultra Soft (+ Black Pants)",
	"Pastry White Pop Tart Glitter",
	[ 
		"Pants: Should fit like leggings with no bunched bottoms", "Jacket: Hem sleeves, take in at waist if needed",
		"Return jackets for stoning",
		"Jacket: Zip up to bottom of sports bra",
		"Hair = Low Pony Tail, Center Part"
	],
	"",
	"",
	""
	),
	new Dance (
		"teen1Jazz",
		"Teen 1 Jazz",
		"Outlaw Pete",
		"Light Suntan Capezio Ultra Soft Stirrup (+ Black Pants)",
		"None",
		[
			"Flannel Shirt: Button only the 2nd and 3rd buttons down from the top",
			"Black Bandana"
		],
		"",
		"",
		""
	),
	new Dance (
		"teen1Lyric",
		"Teen 1 Lyric",
		"What the World Needs Now",
		"Light Suntan Capezio Ultra Soft Stirrup",
		"None",
		["Dress should fall 3 inches below the back crease of the knee"],
		"",
		"",
		""
		),
	new Dance(
		"teen1Tap",
		"Teen 1 Tap",
		"Ricochet",
		"Black Opaque Trouser Socks (+ Black Pants)",
		"Bloch Respect Oxford S0361 - Black",
		["Coat: Do not roll sleeves, hem if needed"],
		"",
		"",
		""
		),
	new Dance(
		"acro",
		"Acro Team",
		"Egypt",
		"Light Suntan Capezio Ultra Soft Stirrup",
		"None",
		[""],
		"",
		"",
		""
		),
		new Dance (
			"production",
			"Production",
			"Vegas",
			"Black Semless Fishnet Tights OVER Light Suntan Capezio",
			"Black Glittered Jazz Boots",
			[""],
			"",
			"",
			""
		),
		new Dance (
			"smallGroupTap",
			"Small Group Tap",
			"In the Mood",
			"Black Fishnet Tights (Body Wrappers Seamless) OVER Light Suntan Capezio",
			"Bloch Respect Oxford S0361 - Black",
			["Gloves: Plain Red, (NOT the sequined ones)", "Tank top should fall below the hips"],
			"",
			"",
			""
		),
		new Dance (
			"juniorContemporary",
			"Junior Contemporary",
			"Sound of Silence",
			"Light Suntan Capezio Ultra Soft Stirrup",
			"None",
			[""],
			"",
			"",
			""
		),
		new Dance (
			"miniLyric",
			"Mini Lyric",
			"The Children Will Listen",
			"Light Suntan Capezio Ultra Soft Stirrup",
			"None",
			[""],
			"",
			"",
			""
		),
		new Dance (
			"miniJazz",
			"Mini Jazz",
			"Candy Girl",
			"Light Suntan Capezio Ultra Soft Stirrup",
			"None",
			[""],
			"",
			"",
			""
		),
		new Dance (
			"juniorBallet",
			"Junior Ballet",
			"Guests From the Orient (Snow White)",
			"Body Wrappers mesh seamed tights in Ballet Pink",
			"Danshuz Pro Soft Canvas Ballet Slippers",
			["Remove top two layers from the tutu","Hair piece above bun in center"],
			"",
			"",
			""
		),
		new Dance (
			"teenBallet",
			"Teen Ballet",
			"The Flower Garden (Alice in Wonderland)",
			"Body Wrappers mesh seamed tights in Ballet Pink",
			"Danshuz Pro Soft Canvas Ballet Slippers",
			[""],
			"",
			"",
			""
		)
];

export {studioDances, Dance};