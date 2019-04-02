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
  new Dance(
    "miniJazz",
    "Mini Jazz",
    "My Girls",
    "Light Suntan Capezio Ultra Soft Stirrup",
    "None",
    [],
    "",
    "Sat.",
    "2:10p",
  ),
  new Dance(
    "miniHipHop",
    "Mini Hip Hop",
    "2 Legit 2 Quit",
    "Black Capezio Ultra Soft  Tights + Hammer Pants",
    "Black Pastry Glam Pie Glitter",
    [""],
    "",
    "Sat.",
    "1:05p",
  ),
  new Dance(
    "smallContemporary",
    "Small Group Contemporary",
    "Undertow",
    "None",
    "None",
    [""],
    "",
    "Sat.",
    "2:36p",
  ),
  new Dance(
    "smallGroupTap",
    "Small Group Tap",
    "Celloopa",
    "Body Wrappers Black Fishnet Non Seam Tights over Capezio Ultra Soft Light Suntan Stirrup Tights",
    "Jason Samuel Smith",
    [],
    "",
    "Sat.",
    "3:23p",
  ),
  new Dance(
    "production",
    "Production",
    "On the Dance Floor",
    "Pants + Black Socks",
    "Black Pastry Glam Pie Glitter",
    [
      "Bandana: tie on top of head, right of center part. Ironed + Secured with bobby pins",
      "Wear a seamless black dance brief under the pants. (No colors or thongs)",
      "Steam Jacket to remove wrinkles",
    ],
    "",
    "Sun.",
    "1:14p",
  ),

  new Dance(
    "teen1Lyric",
    "Teen 1 Lyric",
    "Feathery",
    "Capezio Ultra Soft Light Suntan Stirrup Tights",
    "None",
    [],
    "",
    "Sun.",
    "2:09p",
  ),
  new Dance(
    "teen1Jazz",
    "Teen 1 Jazz",
    "It",
    "Capezio Ultra Soft Light Suntan Stirrup Tights",
    "None",
    [],
    "",
    "Sun.",
    "2:47p",
  ),
  new Dance(
    "teen1Tap",
    "Teen 1 Tap",
    "One Foot",
    "Tall Black Socks",
    "Jason Samuel Smith",
    [],
    "",
    "Sun.",
    "3:37p",
  ),
  new Dance(
    "acro",
    "Acro Team",
    "The Derby",
    "Jockeys: Capezio Ultra Soft Black Stirrup Tights.  Others: No Tights",
    "None",
    [
      "Jockeys: Cut the Ribbon so bow will fit your dancer's face.  Tie the bow in center of helmet.  Secure helmet with bobby pins.  Wear Nude camisole under costume.",
      "Derby Dress: Should should come to top of knee + thin black belt that came with it. Fascinators should be on left side with bobby pins.",
    ],
    "",
    "Sun.",
    "4:11p",
  ),
  new Dance(
    "teen1HipHop",
    "Teen 1 Hip Hop",
    "Jump & Drop",
    "Capezio Ultra Soft Light Suntan Stirrup Tights",
    "Blue Pastry Pop Tart Glitter",
    [],
    "",
    "Sun.",
    "4:37p",
  ),

  new Dance("teenBallet", "Teen Ballet", "", "", "", [""], "", "", ""),
];

export { studioDances, Dance };
