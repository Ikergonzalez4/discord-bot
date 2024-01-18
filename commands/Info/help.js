const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord-js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show the command list"),
  async execute(interaction) {
    const emojis = {
      math: "🧮",
      youtube: "📺",
      music: "🎵",
      welcome: "👋",
      help: "❓",
    };

    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name || "No command name",
            description: cmd.data.description || "No command description",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder().setDescription("Please choose a category");

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceHolder("Please select a category")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collelctor = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${formatString(directory)} commands`)
        .setDescription(`Here are the commands of this category ${directory}`)
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        );

      interaction.update({ embeds: [categoryEmbed] });
    });
  },
};
