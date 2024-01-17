const Canvas = require("canvas"); //Importar canvas
const { AttachmentBuilder } = require("discord.js"); //Importar discord.js

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    Canvas.registerFont('./fonts/font.otf', { family: 'Headlines' });    
    const canal = client.channels.cache.get("1196617110714069032");
    const canvas = Canvas.createCanvas(922, 450);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/1195415190120976448/1196615269964066907/4fde84ee18150f12848cb6edf140b1c4.jpg?ex=65b845d0&is=65a5d0d0&hm=e65033a97884d2c7d4e1b355779232d377736310e74d8adbd09a98190215abcc&"
    );
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ extension: "png" }))

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    // Draw the avatar of the user 
    ctx.save();
    ctx.beginPath();
    ctx.arc(461, 154, 116, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 345, 38, 232, 232);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 12;
    ctx.stroke(); 
    ctx.restore();


    // Draw the greeting text
    ctx.font = "50px Headlines";
    ctx.fillStyle = "#fc1d1d";
    ctx.textAlign = "center";
    ctx.fillText(`Welcome to the server,`, 461, 324);

    // User Tag
    ctx.font = "30px Headlines";
    ctx.fillStyle = "#fc1d1d";
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.tag.toUpperCase()}`, 461, 380);

    const image = new AttachmentBuilder(canvas.toBuffer(),{name: "welcome-image.jpg"});

    canal.send( { content: `Bienvenido al servidor, ${member}!`, files: [image] });


  });
};
